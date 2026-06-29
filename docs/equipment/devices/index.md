---
sidebar_position: 1
title: Devices
---

# Devices

Devices are the hardware that **runs your code**. In the lab they fall into two broad classes,
and picking the right class is the single most important decision in a project.

## MCU vs. SBC — the core distinction

| | **Microcontroller (MCU)** | **Single-Board Computer (SBC / SoC)** |
| --- | --- | --- |
| Runs | Bare-metal firmware or an RTOS | A full OS (usually Linux) |
| Typical clock | 16–240 MHz | 1–2.4 GHz, multi-core |
| Memory | KB of RAM, KB–MB flash | GB of RAM, SD/eMMC/SSD storage |
| Boot time | Microseconds | Tens of seconds |
| Strengths | Real-time timing, low power, direct pin control | Heavy compute, networking, vision, multitasking |
| Examples | STM32, ESP32, AVR | Raspberry Pi, NVIDIA Jetson |

:::tip Rule of thumb
If the task is **"react to a pin in microseconds"** → MCU. If it's **"run a program that
needs a filesystem, network, or a camera + model"** → SBC. Many real projects use **both**:
an SBC for the brains, an MCU for precise I/O.
:::

## In this section

- [**Microcontrollers (MCU)**](/docs/equipment/devices/microcontrollers) — STM32, ESP32, Arduino/AVR.
- [**Single-Board Computers (SBC / SoC)**](/docs/equipment/devices/single-board-computers) — Raspberry Pi 3/4/5, NVIDIA Jetson.

:::note
For deeper firmware topics (RTOS, drivers, peripherals) see
[Embedded Firmware](/docs/embedded-firmware). This guide focuses on the *hardware* and how to
get started with it.
:::
