---
sidebar_position: 1
title: Connectivity & Buses
---

# Connectivity & Buses

How a microcontroller talks to sensors, peripherals and other boards. Picking the right bus is a
trade-off between **pin count, speed, distance, number of devices and noise immunity**.

## Quick comparison

| Bus | Wires | Signalling | Typical speed | Distance | Multi-device | Best for |
| --- | --- | --- | --- | --- | --- | --- |
| [**UART**](/docs/embedded-firmware/connectivity/uart) | 2 (TX/RX) | Single-ended, async | ≤ ~1 Mbps | Short (on-board) | No (point-to-point) | Debug console, modules, bootloader |
| [**I²C**](/docs/embedded-firmware/connectivity/i2c) | 2 (SDA/SCL) | Single-ended, open-drain | 100 k–3.4 M | Very short (cm) | Yes (addressed) | On-board sensors, EEPROM, RTC |
| **SPI** | 3 + 1/CS | Single-ended, sync | 10s of Mbps | On-board | Yes (per-CS) | Fast on-board (flash, displays, ADC) |
| [**CAN**](/docs/embedded-firmware/connectivity/can) | 2 (CANH/L) | **Differential** | 1 M (5 M+ FD) | Tens of m | Yes (arbitration) | Automotive, robotics, industrial |
| [**RS-485**](/docs/embedded-firmware/connectivity/rs485) | 2 (A/B) | **Differential** | ≤ 10 Mbps | Up to ~1200 m | Yes (multi-drop) | Long industrial links (Modbus) |

> SPI is included for context; the four guides below cover the buses in this request.

## How to choose

- **On one board, few pins, several slow devices** → **I²C**.
- **On one board, need speed** → **SPI**.
- **Two devices, simple, debug/module** → **UART**.
- **Long cable, noisy environment, many nodes** → **RS-485** (or **CAN** for robust messaging).
- **Robust, distributed, prioritised messaging** → **CAN**.

:::tip Distance ⇒ go differential
Single-ended buses (UART/I²C/SPI) are for **on-board** use. The moment a link leaves the board or
runs through noise, switch to a **differential** bus (CAN, RS-485) — see
[Differential Signaling](/docs/embedded-firmware/connectivity/differential-signaling).
:::

## See also

- [Building a Product](/docs/embedded-firmware/building-a-product) — the transceiver chips (CAN, RS-485, USB-UART)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
