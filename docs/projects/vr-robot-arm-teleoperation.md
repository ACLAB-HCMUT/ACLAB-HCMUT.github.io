---
slug: /projects/vr-robot-arm-teleoperation
title: VR Teleoperation of a Denso VS-6577 Robot Arm
description: A ROS 2 + MoveIt 2 control stack and a standalone Meta Quest 3 VR app for teleoperating a 6-DOF Denso VS-6577 industrial robot arm with a synchronized Digital Twin.
tags: [ROS 2, MoveIt 2, VR, Digital Twin, Robot Arm]
---

# VR Teleoperation of a Denso VS-6577 Robot Arm with ROS 2

> **Status:** Completed (2026) · **Area:** Intelligent Robotics
> **Author:** Trần Ngọc Cát · **Supervisor:** Dr. Lê Trọng Nhân (HOD, ACLAB)

## Overview

This project upgrades the way a human operates an industrial robot arm — from 2D
software, mouse and keyboard to an immersive **Virtual Reality (VR)** interface running on a
**Meta Quest 3** headset. The controlled device is a 6-axis **Denso VS-6577** industrial arm,
driven through its legacy **RC5** controller. On top sits a standard **ROS 2** control stack
(`ros2_control` + **MoveIt 2**), and the VR app renders a **Digital Twin** kept in sync with
the real arm in real time.

The goal is effective **Human-Robot Collaboration (HRC)**: intuitive, low-latency, stable
remote control that lowers the operator's cognitive load compared with traditional 2D tools.

## System architecture

The system has three main blocks connected as **Devices → PC Controller → VR app**:

| Block | Components | Role |
| --- | --- | --- |
| **Devices** | Denso VS-6577, RC5 controller, Gripper-A (+ Driver-Hat-A), 2× USB cameras | The physical arm, gripper and visual feedback, driven by ROS 2 |
| **PC Controller** | ROS 2 Humble (Ubuntu 22.04), `ros2_control`, MoveIt 2, rosbridge | The control brain — bridges external devices and the RC5 + arm |
| **VR app** | Meta Quest 3, Unity 6, Meta XR SDK, ROS# (ROS-Sharp) | The operator interface — control modes + Digital Twin |

Communication: the arm/gripper talk to the PC over **UART**; cameras over **USB**; the VR
headset talks to ROS 2 over **WebSocket** via ROS# / rosbridge.

## Hardware

- **Denso VS-6577** — 6-axis articulated arm, 770 mm reach (R ≈ 934 mm to the end-effector),
  7 kg payload, ±0.03 mm repeatability, absolute encoders.
- **RC5 controller (RC5-VSE6B)** — directly drives the arm's servo axes; programmed in
  Denso's proprietary **PAC** language; the only external link is **UART**.
- **Gripper-A** — a parallel-jaw gripper (single servo, 5°–85° travel) driven by
  **Driver-Hat-A** over UART using a JSON command protocol.
- **Meta Quest 3** — standalone VR/MR headset (Snapdragon XR2 Gen 2, 8 GB RAM), runs the
  control app without a tethered PC.
- **2× USB cameras** — one on the end-effector, one overviewing the workspace.

## Software — RC5 program

Because the RC5 is a legacy controller, the heavy logic lives in ROS 2; the RC5 only receives
commands and drives the axes reliably. The PAC program is split into concurrent tasks:

- `TASK0` (10 ms) — read UART command into a buffer.
- `TASK1CRC` (15 ms) — validate and decode the string command, push to a **ring buffer**.
- `TASK3` (35 ms) — pop the ring buffer and rotate the axes (smooth, gap-free motion).
- `GET_JOINT` (100 ms) — report the 6 joint angles back over UART.

A simple **length-based CRC** (`J1,…,J6#LEN_PAYLOAD`) detects corrupted strings; combined
with the ring buffer it keeps the arm running smoothly and recovers from packet errors
without halting (~2 bad commands per 1000 at 115200 bps).

## Software — ROS 2 control stack

The PC-side software follows the standard **`ros2_control`** architecture (written in C++),
layered for modularity and reuse:

1. **Driver** — `MotorDriver` (arm, via RC5) and `ServoDriver` (gripper, via Driver-Hat-A),
   each over a dedicated `UartProtocol` instance.
2. **Hardware Interface** — `DensoInterface` (arm) and `DensoHandInterface` (gripper) expose
   `state_interfaces` / `command_interfaces` through the read–update–write cycle. A
   **Trend Learning** mechanism filters out "snap-back" commands caused by mechanical lag.
3. **Controllers** — `JointTrajectoryController` (arm), `GripperActionController` (gripper),
   and `JointStateBroadcaster`, running at a 10 Hz control cycle.
4. **MoveIt 2** — planning (CHOMP) and execution, plus **MoveIt Servo** for continuous
   jogging; integrates tightly with `ros2_control`.

The **robot description** (URDF/Xacro) is exported from the manufacturer's SolidWorks model
with the gripper attached. **Gazebo (Ignition)** can replace the Hardware Interface for safe,
fast simulation.

### Application layer

- **Denso MoveIt Servo** (Service Provider) — wraps MoveIt Servo for per-joint / Cartesian
  jogging; publishes `JointTrajectory` straight to the controller every 300 ms.
- **Denso Remote Control** (Action Server) — custom `MoveToPose` action to plan + execute to
  a target (joint values or XYZ pose), with feedback (`planning` → `executing` → `completed`).
- **V4L2 camera nodes** — publish raw + compressed image topics.
- **rosbridge server** (port 9090) — exposes topics/services/actions to the VR app over
  WebSocket.

## VR application (Unity + Meta Quest 3)

Built in **Unity 6** with the **Meta XR SDK** and **ROS#**, the app imports the robot's URDF
as a Digital Twin and connects to ROS 2 by IP/port. It offers three control modes plus
feedback:

- **MoveIt Servo panel** — jog each joint (or XYZ) with +/- buttons; open/close the gripper
  via a `GripperCommand` action client.
- **Joint Rotate (sliders)** — pose a "future" twin with sliders, then **Execute** a
  `MoveToPose` goal.
- **Robot Grab Rotate** — grab and rotate individual joints of the 3D model directly in VR
  (Articulation Bodies, min/max limited), then **Execute**.
- **Dual camera feeds** and a **Digital Twin** synchronized via `/joint_states`.

## Results

- **RC5 control** — stable long-running operation; packet errors no longer halt the system.
- **Execution latency** — with Velocity scaling 0.4 / Accel 0.3 and a 10 Hz cycle, the arm
  settles ~**2 s** after ROS 2 stops sending commands (physical/mechanical lag).
- **VR ↔ ROS 2 round-trip (RTT)** — **~23 ms** average on normal Wi-Fi (P95 ≈ 52 ms),
  rising to ~50 ms under heavy 200 Mbit/s background load.
- **VR performance** — ~**66 FPS** average over 30.8 min (ATW compensates to 72 Hz, 0 skipped
  frames), ~520 MB RAM, no memory leak; CPU (avg 76%) is the bottleneck.

## Tech stack

`ROS 2 Humble` · `ros2_control` · `MoveIt 2` · `Gazebo (Ignition)` · `C++` · `UART` ·
`Unity 6` · `Meta XR SDK` · `ROS# / rosbridge` · `Denso VS-6577` · `RC5` · `Meta Quest 3`

## Source code

- ROS 2 control system — `ros2_arctos_HCMUT`
- Unity VR application — `denso_arm_metaquest`

(Repositories under the [ACLAB-HCMUT GitHub organization](https://github.com/ACLAB-HCMUT).)

## Future work

- Better model of the arm's acceleration/deceleration to cut the ~2 s settle time.
- Reduce VR CPU load (camera-image rendering) and add **Cartesian / end-effector tracking**
  (map hand motion directly to the end-effector).
- Record-and-replay of action sequences; multi-robot support via the reusable Hardware
  Interface.
