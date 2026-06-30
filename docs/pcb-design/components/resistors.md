---
sidebar_position: 2
title: Resistors
---

# Resistors

The most common part on any board. The value usually tells you the **job** — experienced
designers read "10 k" as "pull-up" almost automatically.

## Common use cases (read the value)

| Value | Typical job | Notes |
| --- | --- | --- |
| **10 kΩ** | **Pull-up / pull-down** on GPIO, reset, boot/strap, enable | The default pull value |
| **4.7 kΩ / 2.2 kΩ** | **I²C** bus pull-ups (SDA/SCL) | Lower value for faster/longer buses |
| **1 kΩ** | LED current (with 3.3/5 V), general pull, base resistor | |
| **330 Ω – 1 kΩ** | **LED** series resistor | Set per LED current & supply |
| **22 Ω – 33 Ω** | **Series termination** on USB D+/D−, fast digital lines | Tames reflections/ringing |
| **0 Ω** | **Jumper / link** — option, net tie, layout fix | Cheap configurability |
| **m Ω (shunt)** | **Current sense** | Use Kelvin (4-wire) connection |
| **100 kΩ – 1 MΩ** | High-impedance pull, bleeder, dividers | Watch leakage/noise |

## Pull-ups & pull-downs

- A **pull-up** ties a line to V+ so it has a defined level when nothing drives it; a **pull-down**
  ties to GND.
- Needed on: floating inputs, **open-drain** outputs (I²C), reset lines, **boot/strap** pins,
  enable pins, buttons.
- **Value trade-off:** lower R = stronger pull, faster edges, more current; higher R = lower power
  but slower and noise-prone. 10 k is the everyday compromise; I²C wants ~2–4.7 k.

## Voltage dividers

- Two resistors set a fraction: `Vout = Vin × R2/(R1+R2)`.
- Used for ADC scaling, feedback, ID pins. Keep impedance low enough for the ADC's input.

## Ratings to check

- **Power**: `P = I²R` (or `V²/R`). A 0603 handles ~0.1 W — size up for current-sense / bleed.
- **Tolerance**: 1 % (E96) is standard and cheap; use tighter only where it matters (dividers,
  feedback, sense).

## See also

- [Common Practices](/docs/pcb-design/applied-circuits/common-practices) — where pulls are required
- [MCU & Digital Circuits](/docs/pcb-design/circuit-blocks/mcu-and-digital)
