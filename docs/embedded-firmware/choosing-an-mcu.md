---
sidebar_position: 3
title: Choosing an MCU
---

# Choosing an MCU

Picking a microcontroller is a trade-off between performance, peripherals, power, cost,
robustness and ecosystem — **not a single number**. This page covers the common families, how to
choose, and the traps to avoid.

## Popular families

| Family | Core / ISA | Sweet spot |
| --- | --- | --- |
| **AVR** (ATmega/ATtiny), **PIC**, **8051** | 8-bit | Cheap, simple, robust, low performance — Arduino Uno is AVR |
| **STM32** (ST) | Arm Cortex-M0/M3/M4/M7/M33 | The lab default — huge range, rich peripherals, great tooling |
| **ESP32** (Espressif) | Xtensa / RISC-V | Built-in Wi-Fi + BLE — IoT |
| **Nordic nRF52/nRF53** | Cortex-M | Bluetooth Low Energy / low power |
| **RP2040 / RP2350** (Raspberry Pi) | Cortex-M0+ / M33 + RISC-V | Cheap, dual-core, hobby & education |
| **TI MSP430** | 16-bit | Ultra-low-power sensing |
| **NXP, Renesas, Microchip SAM** | Cortex-M | Industrial / automotive breadth |
| **GD32, WCH CH32V, SiFive** | RISC-V | Low-cost, open ISA, growing ecosystem |

## Selection criteria

- **Performance** — see the [gotchas below](#dont-pick-on-clock-speed-alone); judge the core + features, not just MHz.
- **Peripherals** — the right count and type: ADC resolution/channels, timers/PWM, UART/I²C/SPI/CAN/USB/Ethernet.
- **Memory** — enough flash + RAM, with headroom (an RTOS and stacks eat RAM).
- **Power** — active and sleep currents, low-power modes — critical for battery devices.
- **Connectivity** — is Wi-Fi/BLE/Thread/cellular integrated, or external?
- **Cost** — unit price *at your volume*, plus dev-board and tooling cost.
- **Availability & lifecycle** — current stock, longevity/EOL, and a **second source**. Supply shocks (2021–2022) stranded designs built around single-source parts.
- **Operating temperature** — match the grade to the environment (see below).
- **Robustness & safety** — brown-out detect, watchdog, ESD rating, ECC memory; safety certs (IEC 61508, ISO 26262) for critical systems.
- **Ecosystem & compatibility** — toolchain, HAL/RTOS support, debugger, community, and **pin-compatible family members** so you can scale up/down without a redesign.
- **Security** — TrustZone (Cortex-M33), secure boot, hardware crypto.

### Operating temperature grades

| Grade | Typical range | Use |
| --- | --- | --- |
| Commercial | 0 … +70 °C | Indoor consumer |
| Industrial | −40 … +85 °C | Most real-world / outdoor |
| Automotive (AEC-Q100) | −40 … +125 °C | Vehicles, harsh environments |

:::caution Match the grade to the environment
A commercial-grade part in an outdoor or engine-bay device will drift or fail. For anything
beyond a benign indoor setting, default to **industrial (−40…+85 °C)**.
:::

## Gotchas — read before you commit

### Don't pick on clock speed alone

MHz is only part of performance. Two chips at the same clock can differ several-fold:

- **Architecture / IPC** — a Cortex-**M7** does far more per cycle than an **M0+**; DMIPS/MHz varies by core.
- **FPU** — without a hardware floating-point unit, every `float` is emulated in software (often 10×+ slower). An **M4 @ 80 MHz with FPU** can beat an **M0 @ 100 MHz** on math.
- **DSP instructions** — Cortex-M4/M7 SIMD/MAC accelerate filtering and control loops.
- **Flash wait states / cache** — at high clocks the flash can't keep up; an accelerator/cache (or running from RAM) is what delivers the rated speed.

:::tip FPU: know what you need
Most Cortex-M4/M7 have a **single-precision** FPU. If your code needs **double** precision and
the FPU is single-only, those doubles still run in software. Match the FPU to your math.
:::

### RISC-V vs. Arm

| | **Arm Cortex-M** | **RISC-V** |
| --- | --- | --- |
| Ecosystem | Mature — tools, RTOS, libraries, support | Younger, growing fast |
| ISA | Licensed (vendors pay Arm) | **Open**, royalty-free, customizable |
| Risk | Very low, proven | Tooling/fragmentation still settling |
| Cost trend | — | Often cheaper silicon |

- **Choose Arm** for proven tooling, broad RTOS/library support, and lowest project risk (the safe default today).
- **Choose RISC-V** for cost, openness, or custom silicon — and accept a less mature ecosystem.

:::note Other things people forget
- **Check the errata sheet** — silicon bugs are real and can block a peripheral you rely on.
- **Dev board + debugger availability** — you want to prototype on day one (e.g. ST-Link/J-Link; see [Programmers & Debuggers](/docs/equipment/tools/programmers-debuggers)).
- **Footprint/pin compatibility** within a family lets you change memory/speed late without a board respin.
:::

## A quick decision flow

1. **Connectivity?** Need Wi-Fi/BLE → ESP32 / nRF. Otherwise a plain MCU.
2. **Performance & math?** Heavy float/DSP → Cortex-M4/M7 with FPU. Simple I/O → M0+/8-bit.
3. **Environment?** Outdoor/harsh → industrial/automotive grade.
4. **Power?** Battery → low-power family (MSP430, nRF, STM32L).
5. **Cost & supply?** Check unit price *and* live stock + a second source.
6. **Ecosystem?** Favor a family your team and tools already support.

See also: [Firmware Approaches](/docs/embedded-firmware/firmware-approaches) and the lab's
[Microcontrollers hardware guide](/docs/equipment/devices/microcontrollers).
