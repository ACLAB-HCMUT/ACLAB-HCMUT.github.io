---
sidebar_position: 3
title: Single-Board Computers (SBC / SoC)
---

# Single-Board Computers (SBC / SoC)

A single-board computer is a full computer on one board, built around a **System-on-Chip (SoC)**
that integrates a multi-core CPU, GPU, RAM controller, and I/O. It boots a real operating
system (usually Linux), so you get a filesystem, networking, package managers, and the ability
to run many programs at once — at the cost of real-time precision and instant boot.

:::info Storage & OS
Most SBCs boot from a **microSD card** (or eMMC/SSD on newer models). Use a quality card,
flash the OS with the official imager, and **shut down cleanly** — pulling power can corrupt
the card.
:::

## Raspberry Pi

The most common SBC in the lab. Drag to orbit the model below, scroll to zoom:

<DeviceModel
  src="/assets/3D/RASPBERRY_PI_5.STEP"
  poster="/assets/IMG/Pi5.jpg"
  posterAlt="Raspberry Pi 5 board"
  title="Raspberry Pi 5"
  subtitle="Click to load the interactive 3D CAD model (STEP)"
  chips={['BCM2712 · Cortex-A76 @ 2.4 GHz', '4 / 8 GB LPDDR4X', '40-pin GPIO (3.3 V)', '2× USB 3.0 · PCIe 2.0', '5 V / 5 A USB-C PD']}
  height={460}
  caption="Static photo shown first; the 3D model (~33 MB) loads only when you click."
/>

The relevant generations:

| Model | SoC / CPU | RAM | Notes |
| --- | --- | --- | --- |
| **Pi 3 (B+)** | Quad-core Cortex-A53 @ 1.4 GHz | 1 GB | Older, fine for light/headless tasks |
| **Pi 4** | Quad-core Cortex-A72 @ 1.5 GHz | 1–8 GB | USB 3.0, dual HDMI; needs USB-C 5 V/3 A |
| **Pi 5** | Quad-core Cortex-A76 @ 2.4 GHz | 4 / 8 GB | Much faster; needs 5 V/5 A (PD), active cooling recommended |

- **Use for:** Linux services, networking, cameras, light vision, ROS 2 nodes, dashboards.
- **OS:** Raspberry Pi OS (Debian-based) — flash with Raspberry Pi Imager.
- **I/O:** a 40-pin GPIO header (3.3 V logic) for sensors and HATs.

:::caution Power & heat
Under-powered supplies cause the on-screen lightning-bolt warning and random instability —
**use the official PSU** for the model. The Pi 4/5 run hot under load; add a heatsink or fan,
especially for vision or sustained compute.
:::

:::danger GPIO is 3.3 V — not 5 V tolerant
The Raspberry Pi GPIO pins are **not 5 V tolerant**. Applying 5 V to a GPIO pin can
permanently damage the SoC. Level-shift any 5 V signal before connecting it.
:::

## NVIDIA Jetson (edge AI)

SoCs with an integrated **CUDA-capable GPU** for running ML/vision models on-device (e.g. Jetson
Nano / Orin Nano).

- **Use for:** real-time computer vision, on-device inference, edge AI — see [AI / Edge AI](/docs/ai-edge).
- **Software:** NVIDIA JetPack (Ubuntu + CUDA/cuDNN/TensorRT).
- **Note:** higher power draw than a Pi; budget for the right barrel/USB-C supply and cooling.

## Pi vs. Jetson

| Need | Reach for |
| --- | --- |
| General Linux, networking, ROS 2, light vision | **Raspberry Pi** |
| GPU-accelerated deep learning / heavy vision | **Jetson** |

:::tip Headless setup
For robotics and servers you rarely need a monitor. Enable SSH (and Wi-Fi) in the imager's
advanced settings, then connect over the network — no keyboard/HDMI required.
:::
