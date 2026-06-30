---
sidebar_position: 3
title: I²C
---

# I²C

A 2-wire synchronous bus — **SDA** (data) and **SCL** (clock) — where one master talks to many
addressed devices. Both lines are **open-drain**, so they need pull-ups.

## Pros & cons

| Pros | Cons |
| --- | --- |
| Only **2 pins** for many devices | **Short distance** (bus capacitance limited) |
| Built-in **addressing** (7/10-bit) | Open-drain → needs pull-ups, modest speed |
| The standard for sensors | One stuck device can **hang the whole bus** |
| Multi-device, multi-master capable | Address clashes between identical parts |

## Use cases

- **On-board sensors** (IMU, temperature, pressure), **EEPROM/RTC**, **port expanders**, small
  **OLED displays**, PMIC config.

## Hardware requirements

- **Pull-up resistors** on SDA and SCL to the bus voltage — ~**4.7 kΩ** (100 kHz) down to
  ~**2.2 kΩ** (400 kHz+); only **one** pull-up pair per bus.
- Keep the bus **short and low-capacitance** (it's an on-board bus).
- One voltage domain, or a **level translator** between 1.8/3.3/5 V devices.
- Resolve **address conflicts**: address-select pins, or an I²C **mux/switch** (e.g. TCA9548A).

## Software requirements

- Handle **START/STOP**, **ACK/NACK**, 7/10-bit addressing.
- Support **clock stretching** (slaves holding SCL low).
- Add **timeouts** and a **bus-recovery** routine (toggle SCL up to 9 times to free a stuck slave).

:::caution Top I²C failures
**Missing pull-ups** (bus stuck high/low), **address clash** (two identical sensors), and a
**locked bus** from a slave mid-transaction. Add bus recovery and check addresses early.
:::

## See also

- [Connectivity overview](/docs/embedded-firmware/connectivity)
- [Resistors](/docs/pcb-design/components/resistors) — choosing the pull-up value
- [Common Practices](/docs/pcb-design/applied-circuits/common-practices)
