---
sidebar_position: 2
title: Microcontrollers (MCU)
---

# Microcontrollers (MCU)

A microcontroller is a single chip with a CPU, memory, and peripherals (GPIO, timers, ADC,
UART/I²C/SPI…) built in. It runs one program directly on the metal — no operating system
required — which makes it **deterministic and fast to react**, ideal for sensors, motors,
and precise timing.

:::info Powering & logic levels
Most lab MCUs run at **3.3 V logic**. Feeding 5 V into a 3.3 V pin can damage the chip.
Always confirm the operating voltage before wiring, and use a level shifter when mixing 3.3 V
and 5 V parts.
:::

## STM32 (ARM Cortex-M)

High-performance 32-bit MCUs from ST. The lab standard for the Microcontrollers course is the
**STM32F103** ("Blue Pill" class, Cortex-M3 @ 72 MHz).

- **Use for:** real-time control, rich peripherals, projects that outgrow Arduino.
- **Toolchain:** STM32CubeIDE (HAL/LL) or PlatformIO. Simulate with Proteus.
- **Flashing:** SWD via [ST-Link](/docs/equipment/tools/programmers-debuggers); bootloader over UART also works.

:::tip
Use STM32CubeMX (built into CubeIDE) to configure clocks and pins graphically before writing a
line of code — it prevents the most common "peripheral won't start" mistakes.
:::

## ESP32 (Wi-Fi + Bluetooth)

A dual-core MCU with **built-in Wi-Fi and Bluetooth** — the go-to for IoT. The lab IoT course
uses the **ESP32 with a DHT20 sensor**.

- **Use for:** connected devices, cloud telemetry, BLE.
- **Toolchain:** PlatformIO (Arduino or ESP-IDF framework).
- **Flashing:** built-in USB-UART on most dev boards — just plug in USB, no external programmer needed.

:::caution Brown-outs
Wi-Fi transmit bursts draw current spikes. A weak USB port or thin cable causes random
reboots ("brownout detector triggered"). Use a quality cable and a 500 mA+ supply.
:::

## Arduino / AVR

Classic 8-bit MCUs (e.g. ATmega328P on the Arduino Uno). 5 V logic, very beginner-friendly.

- **Use for:** quick prototypes, teaching, simple I/O.
- **Toolchain:** Arduino IDE or PlatformIO.
- **Limits:** modest speed/RAM and no networking — graduate to STM32/ESP32 when you hit the ceiling.

## Choosing quickly

| Need | Reach for |
| --- | --- |
| Wi-Fi / Bluetooth | **ESP32** |
| Lots of peripherals, real-time control | **STM32** |
| Simplest possible start | **Arduino / AVR** |

:::warning Before you leave the bench
Power down before rewiring, double-check VCC/GND, and never hot-plug a board with the supply
live. See [Lab Rules & Safety](/docs/lab-rules).
:::
