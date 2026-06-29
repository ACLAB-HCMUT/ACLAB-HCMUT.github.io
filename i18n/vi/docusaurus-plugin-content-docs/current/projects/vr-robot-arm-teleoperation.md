---
slug: /projects/vr-robot-arm-teleoperation
title: Điều khiển từ xa bằng VR cánh tay robot Denso VS-6577
description: A ROS 2 + MoveIt 2 control stack and a standalone Meta Quest 3 VR app for teleoperating a 6-DOF Denso VS-6577 industrial robot arm with a synchronized Digital Twin.
tags: [ROS 2, MoveIt 2, VR, Digital Twin, Robot Arm]
---

# Điều khiển từ xa bằng VR cánh tay robot Denso VS-6577 với ROS 2

> **Trạng thái:** Hoàn thành (2026) · **Lĩnh vực:** Robotics thông minh
> **Tác giả:** Trần Ngọc Cát · **Người hướng dẫn:** Dr. Lê Trọng Nhân (Trưởng bộ môn, ACLAB)

## Tổng quan

Dự án này nâng cấp cách con người vận hành một cánh tay robot công nghiệp — từ phần mềm 2D,
chuột và bàn phím sang một giao diện **Thực tế ảo (VR)** nhập vai chạy trên kính
**Meta Quest 3**. Thiết bị được điều khiển là cánh tay công nghiệp 6 trục **Denso VS-6577**,
được điều khiển thông qua bộ điều khiển **RC5** đời cũ. Bên trên là một control stack **ROS 2**
tiêu chuẩn (`ros2_control` + **MoveIt 2**), và ứng dụng VR render một **Digital Twin** được
đồng bộ với cánh tay thật theo thời gian thực.

Mục tiêu là đạt được **Cộng tác Người-Robot (Human-Robot Collaboration, HRC)** hiệu quả: điều
khiển từ xa trực quan, độ trễ thấp, ổn định, giúp giảm tải nhận thức cho người vận hành so với
các công cụ 2D truyền thống.

## Kiến trúc hệ thống

Hệ thống gồm ba khối chính được kết nối theo dạng **Thiết bị → PC Controller → Ứng dụng VR**:

| Khối | Thành phần | Vai trò |
| --- | --- | --- |
| **Thiết bị** | Denso VS-6577, bộ điều khiển RC5, Gripper-A (+ Driver-Hat-A), 2× camera USB | Cánh tay vật lý, gripper và phản hồi hình ảnh, được điều khiển bởi ROS 2 |
| **PC Controller** | ROS 2 Humble (Ubuntu 22.04), `ros2_control`, MoveIt 2, rosbridge | Bộ não điều khiển — làm cầu nối giữa thiết bị ngoài và bộ RC5 + cánh tay |
| **Ứng dụng VR** | Meta Quest 3, Unity 6, Meta XR SDK, ROS# (ROS-Sharp) | Giao diện vận hành — các chế độ điều khiển + Digital Twin |

Giao tiếp: cánh tay/gripper trao đổi với PC qua **UART**; camera qua **USB**; kính VR giao tiếp
với ROS 2 qua **WebSocket** thông qua ROS# / rosbridge.

## Phần cứng

- **Denso VS-6577** — cánh tay khớp nối 6 trục, tầm với 770 mm (R ≈ 934 mm đến đầu công tác),
  tải trọng 7 kg, độ lặp lại ±0.03 mm, encoder tuyệt đối.
- **Bộ điều khiển RC5 (RC5-VSE6B)** — điều khiển trực tiếp các trục servo của cánh tay; được lập
  trình bằng ngôn ngữ độc quyền **PAC** của Denso; liên kết ngoài duy nhất là **UART**.
- **Gripper-A** — gripper kẹp song song (một servo, hành trình 5°–85°) được điều khiển bởi
  **Driver-Hat-A** qua UART bằng giao thức lệnh JSON.
- **Meta Quest 3** — kính VR/MR standalone (Snapdragon XR2 Gen 2, 8 GB RAM), chạy ứng dụng điều
  khiển mà không cần kết nối với PC.
- **2× camera USB** — một gắn trên đầu công tác, một bao quát không gian làm việc.

## Phần mềm — chương trình RC5

Vì RC5 là bộ điều khiển đời cũ, phần logic nặng được đặt trong ROS 2; RC5 chỉ nhận lệnh và điều
khiển các trục một cách ổn định. Chương trình PAC được chia thành các tác vụ chạy đồng thời:

- `TASK0` (10 ms) — đọc lệnh UART vào một buffer.
- `TASK1CRC` (15 ms) — xác thực và giải mã lệnh chuỗi, đẩy vào một **ring buffer**.
- `TASK3` (35 ms) — lấy lệnh ra khỏi ring buffer và xoay các trục (chuyển động mượt, không gián đoạn).
- `GET_JOINT` (100 ms) — báo cáo 6 góc khớp về qua UART.

Một cơ chế **CRC dựa trên độ dài** đơn giản (`J1,…,J6#LEN_PAYLOAD`) phát hiện các chuỗi bị lỗi;
kết hợp với ring buffer, nó giữ cho cánh tay chạy mượt mà và khôi phục sau các lỗi gói tin mà
không phải dừng lại (~2 lệnh lỗi trên 1000 lệnh ở tốc độ 115200 bps).

## Phần mềm — control stack ROS 2

Phần mềm phía PC tuân theo kiến trúc **`ros2_control`** tiêu chuẩn (viết bằng C++), được phân
lớp để đảm bảo tính mô-đun và tái sử dụng:

1. **Driver** — `MotorDriver` (cánh tay, qua RC5) và `ServoDriver` (gripper, qua Driver-Hat-A),
   mỗi cái qua một instance `UartProtocol` riêng.
2. **Hardware Interface** — `DensoInterface` (cánh tay) và `DensoHandInterface` (gripper) cung cấp
   `state_interfaces` / `command_interfaces` thông qua chu kỳ read–update–write. Một cơ chế
   **Trend Learning** lọc bỏ các lệnh "snap-back" gây ra bởi độ trễ cơ học.
3. **Controllers** — `JointTrajectoryController` (cánh tay), `GripperActionController` (gripper),
   và `JointStateBroadcaster`, chạy ở chu kỳ điều khiển 10 Hz.
4. **MoveIt 2** — lập kế hoạch (CHOMP) và thực thi, cùng với **MoveIt Servo** để jog liên tục;
   tích hợp chặt chẽ với `ros2_control`.

**Robot description** (URDF/Xacro) được export từ mô hình SolidWorks của nhà sản xuất với gripper
đã gắn kèm. **Gazebo (Ignition)** có thể thay thế Hardware Interface để mô phỏng an toàn và nhanh chóng.

### Lớp ứng dụng

- **Denso MoveIt Servo** (Service Provider) — bao bọc MoveIt Servo để jog theo từng khớp / theo
  Cartesian; publish `JointTrajectory` trực tiếp đến controller mỗi 300 ms.
- **Denso Remote Control** (Action Server) — action `MoveToPose` tùy chỉnh để lập kế hoạch + thực
  thi đến một mục tiêu (giá trị khớp hoặc tư thế XYZ), kèm phản hồi (`planning` → `executing` → `completed`).
- **Các node camera V4L2** — publish các topic ảnh raw + compressed.
- **rosbridge server** (cổng 9090) — cung cấp các topic/service/action cho ứng dụng VR qua WebSocket.

## Ứng dụng VR (Unity + Meta Quest 3)

Được xây dựng trên **Unity 6** với **Meta XR SDK** và **ROS#**, ứng dụng import URDF của robot
làm Digital Twin và kết nối với ROS 2 qua IP/cổng. Nó cung cấp ba chế độ điều khiển cùng với phản hồi:

- **Panel MoveIt Servo** — jog từng khớp (hoặc XYZ) bằng các nút +/-; đóng/mở gripper thông qua
  một action client `GripperCommand`.
- **Joint Rotate (sliders)** — tạo tư thế cho một twin "tương lai" bằng thanh trượt, sau đó
  **Execute** một goal `MoveToPose`.
- **Robot Grab Rotate** — nắm và xoay trực tiếp từng khớp của mô hình 3D ngay trong VR
  (Articulation Bodies, giới hạn min/max), sau đó **Execute**.
- **Hai luồng camera** và một **Digital Twin** được đồng bộ qua `/joint_states`.

## Kết quả

- **Điều khiển RC5** — vận hành ổn định trong thời gian dài; lỗi gói tin không còn làm dừng hệ thống.
- **Độ trễ thực thi** — với Velocity scaling 0.4 / Accel 0.3 và chu kỳ 10 Hz, cánh tay ổn định
  sau ~**2 s** kể từ khi ROS 2 ngừng gửi lệnh (do độ trễ vật lý/cơ học).
- **Round-trip VR ↔ ROS 2 (RTT)** — trung bình **~23 ms** trên Wi-Fi thông thường (P95 ≈ 52 ms),
  tăng lên ~50 ms dưới tải nền nặng 200 Mbit/s.
- **Hiệu năng VR** — trung bình ~**66 FPS** trong 30.8 phút (ATW bù lên 72 Hz, 0 frame bị bỏ),
  ~520 MB RAM, không rò rỉ bộ nhớ; CPU (trung bình 76%) là điểm nghẽn.

## Tech stack

`ROS 2 Humble` · `ros2_control` · `MoveIt 2` · `Gazebo (Ignition)` · `C++` · `UART` ·
`Unity 6` · `Meta XR SDK` · `ROS# / rosbridge` · `Denso VS-6577` · `RC5` · `Meta Quest 3`

## Mã nguồn

- Hệ thống điều khiển ROS 2 — `ros2_arctos_HCMUT`
- Ứng dụng VR Unity — `denso_arm_metaquest`

(Các repository thuộc [tổ chức GitHub ACLAB-HCMUT](https://github.com/ACLAB-HCMUT).)

## Hướng phát triển trong tương lai

- Mô hình hóa tốt hơn quá trình tăng tốc/giảm tốc của cánh tay để giảm thời gian ổn định ~2 s.
- Giảm tải CPU của VR (render ảnh camera) và bổ sung **bám theo Cartesian / đầu công tác**
  (ánh xạ chuyển động của bàn tay trực tiếp đến đầu công tác).
- Ghi-và-phát lại (record-and-replay) các chuỗi hành động; hỗ trợ đa robot thông qua Hardware
  Interface có thể tái sử dụng.
