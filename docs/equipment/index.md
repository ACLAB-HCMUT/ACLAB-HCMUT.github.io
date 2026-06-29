---
slug: /equipment
title: Lab Equipment Guide
---

# Lab Equipment Guide

A practical reference for the hardware and tools shared in the lab — what each thing is,
when to reach for it, and how to use it safely and correctly.

The guide is split into two families:

| Family | What's inside |
| --- | --- |
| [**Devices**](/docs/equipment/devices) | Things that *run your code* — microcontrollers (MCU) and single-board computers (SBC / SoC). |
| [**Tools**](/docs/equipment/tools) | Things you *use on* devices — power & hand tools, measurement instruments, and programmers/debuggers. |

## Quick "which do I need?"

- **Read a sensor, blink an LED, drive a motor, hard real-time timing** → a [microcontroller](/docs/equipment/devices/microcontrollers).
- **Run Linux, a camera + vision model, a web service, or ROS 2** → a [single-board computer](/docs/equipment/devices/single-board-computers).
- **Flash / debug firmware** → a [programmer / debugger](/docs/equipment/tools/programmers-debuggers) (ST-Link, J-Link, USB-UART).
- **"Is this pin actually 3.3 V?" / "why is this signal wrong?"** → a [measurement instrument](/docs/equipment/tools/measurement-instruments) (multimeter, oscilloscope, logic analyzer).

## Usage policy

:::info Shared-resource etiquette
- **Book** shared/expensive equipment before use, and **log** issues and consumable usage.
- **Return** tools to their place; leave the bench cleaner than you found it.
- Don't remove hardware from the lab without approval.
:::

:::danger Safety first
Before touching power, soldering, or any moving hardware, read
**[Lab Rules & Safety](/docs/lab-rules)**. Power down before wiring, check polarity and
voltage before applying power, and treat LiPo/Li-ion batteries with care.
:::

> Adding a device? Follow the page pattern: **What it is → When to use it → Specs → Setup →
> Common mistakes**, and keep facts accurate over impressive.
