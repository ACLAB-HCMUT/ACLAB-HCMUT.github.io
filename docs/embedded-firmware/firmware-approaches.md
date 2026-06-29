---
sidebar_position: 2
title: Firmware Approaches
---

# Firmware Approaches

How you structure firmware — from talking directly to registers, up to a full RTOS. Each level
trades **control and footprint** for **development speed and features**. Pick the lowest level
that still makes the project comfortable to build and maintain.

| Approach | Control / footprint | Dev speed | Use when |
| --- | --- | --- | --- |
| Bare-metal (super-loop) | Highest / smallest | Slow | Tiny, simple, low-power, deterministic |
| Vendor HAL / LL | High / small–medium | Medium | Most single-purpose MCU projects |
| Framework (Arduino, ESP-IDF) | Medium / medium | Fast | Prototypes, connected devices |
| RTOS (FreeRTOS, Zephyr…) | Medium / medium–large | Medium | Concurrency, timing, connectivity |
| Embedded Linux | Lowest / largest | Fast (app-level) | MPUs/SoCs, heavy compute (not MCU) |

## Bare-metal (register level)

No operating system — a `main()` super-loop plus interrupts, writing directly to peripheral
registers.

- **Pros:** minimal overhead, full control, deterministic timing, tiny footprint.
- **Cons:** slow to develop, manual scheduling, blocking code is easy to get wrong, not portable.
- **Use for:** very small/cheap MCUs, ultra-low-power nodes, hard real-time control.

:::tip CMSIS sits underneath everything on ARM
On Arm Cortex-M, **CMSIS** provides the standard register definitions and core access. Even
"bare-metal" usually means *CMSIS + your code*, not raw magic addresses.
:::

## Vendor libraries: HAL vs LL

Most vendors ship two layers (e.g. STM32 **HAL** and **LL**):

- **HAL (Hardware Abstraction Layer):** high-level, portable across a chip family, fast to write.
  - *Cons:* larger code, some overhead, occasional bloat/bugs — read the generated code.
- **LL (Low-Layer):** thin wrappers close to registers — small and fast, less hand-holding.

A common pattern: prototype with HAL, drop to LL or registers on the hot paths.

## Frameworks

- **Arduino** — fastest start, huge library ecosystem; hides details, less efficient, limited control. Great for learning and quick prototypes.
- **ESP-IDF** (Espressif) — full-featured framework for ESP32, **built on FreeRTOS**, with Wi-Fi/BLE stacks. The serious choice for connected ESP32 products.

## RTOS (Real-Time Operating System)

Adds **preemptive multitasking** — independent tasks, priorities, scheduling, and
synchronization (queues, semaphores, mutexes). Reach for one when you have concurrent activities,
real-time deadlines, or a networking/USB stack to run.

| RTOS | Notes |
| --- | --- |
| **FreeRTOS** | Tiny, ubiquitous, easy to learn, huge support (AWS-backed). It's a *kernel* — add libraries for networking/USB. |
| **Zephyr** | Full RTOS **+ drivers, networking, device tree**; vendor-neutral, scalable, Linux Foundation. Steeper learning, heavier build (CMake/`west`). |
| **ThreadX** (Eclipse ThreadX, ex-Azure RTOS) | Small, deterministic, safety-certified — common in industrial/medical. |
| **embOS** (SEGGER) | Commercial, very reliable, certified for safety, excellent tooling. License cost. |
| **RT-Thread / NuttX** | Rich component ecosystems; NuttX offers a POSIX-like API. |

:::note Kernel vs. ecosystem
**FreeRTOS** is a lean scheduler you build *around*. **Zephyr** is closer to a small OS —
drivers, subsystems and connectivity included — so it does more out of the box but asks you to
adopt its whole build system. Choose by how much you want the platform to provide.
:::

:::tip An RTOS is not always the answer
A super-loop with well-written interrupts handles many products fine. Add an RTOS when
concurrency/timing genuinely gets hard to manage by hand — not by default. Every task costs RAM
(its own stack) and adds complexity.
:::

## Embedded Linux

For **MPUs / SoCs** (e.g. Raspberry Pi, NXP i.MX) — a full OS with filesystem, networking and
processes. This is a different world from MCU firmware; see
[Single-Board Computers](/docs/equipment/devices/single-board-computers).

## Choosing an approach

- **Footprint-bound or hard real-time?** → bare-metal / LL.
- **Typical single-purpose MCU project?** → HAL (+ LL on hot paths).
- **Need Wi-Fi/BLE fast?** → ESP-IDF or a framework.
- **Concurrency, connectivity, or a product that will grow?** → FreeRTOS (lean) or Zephyr (batteries-included).
- **Safety certification required?** → a certified RTOS (ThreadX, embOS).

See also: [Choosing an MCU](/docs/embedded-firmware/choosing-an-mcu).
