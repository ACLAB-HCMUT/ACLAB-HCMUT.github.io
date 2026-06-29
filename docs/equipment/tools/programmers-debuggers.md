---
sidebar_position: 4
title: Programmers & Debuggers
---

# Programmers & Debuggers

These get your compiled code **onto the chip** and let you **step through it** while it runs.
On ARM MCUs (like STM32) this happens over **SWD** (2 wires: SWDIO + SWCLK) or the older JTAG;
older AVRs use ISP. A serial adapter handles plain UART flashing and `printf`-style logging.

:::info Wiring an SWD debugger
Connect **SWDIO, SWCLK, GND**, and usually a voltage-reference pin (3.3 V). **GND is mandatory** —
the number-one cause of "target not found" is a missing or bad ground between probe and board.
:::

## ST-Link

ST's programmer/debugger for STM32 (and STM8). Cheap, ubiquitous, and the default for the
lab's STM32 work; clones are everywhere and an ST-Link is also built into Nucleo/Discovery
boards.

- **Use for:** flashing and debugging STM32 over SWD.
- **Works with:** STM32CubeIDE, STM32CubeProgrammer, OpenOCD, PlatformIO.

:::tip
If CubeIDE reports old firmware on the ST-Link, run **STM32CubeProgrammer → Firmware upgrade**
once. It clears a lot of mysterious connection failures.
:::

## J-Link

SEGGER's professional-grade debug probe. Broad chip support, very fast flashing, and strong
tooling (RTT for low-overhead logging, Ozone debugger).

- **Use for:** multi-vendor work, fast/large flashing, advanced debugging.
- **Works with:** virtually every major IDE/toolchain, OpenOCD, GDB.

:::caution Licensing
Genuine J-Links are licensed hardware. The bundled tools are free for use **with genuine
units**; the EDU model is for non-commercial/educational use only. Use the lab's official units
and don't mix in counterfeit probes.
:::

## USB-UART (serial) adapter

A USB-to-serial bridge (CP2102, CH340, FTDI…) — not a debugger, but indispensable.

- **Use for:** serial console / `printf` logging, and **flashing** ESP32 and STM32-over-bootloader.
- **Wiring:** cross **TX↔RX**, share **GND**. Match the **logic level** (3.3 V vs 5 V) to your board.

:::danger Match the logic level
A 5 V serial adapter driving a 3.3 V MCU's RX pin can damage it. Many adapters have a 3.3/5 V
jumper — set it correctly before connecting, and always share a common ground.
:::

## Quick picker

| Situation | Tool |
| --- | --- |
| Flash/debug an STM32 | **ST-Link** |
| Multi-vendor, fast flashing, advanced features | **J-Link** |
| Serial logs, or flashing ESP32 / STM32 bootloader | **USB-UART** |

:::note
For the surrounding firmware workflow (toolchains, RTOS, drivers) see
[Embedded Firmware](/docs/embedded-firmware).
:::
