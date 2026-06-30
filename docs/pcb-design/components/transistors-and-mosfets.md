---
sidebar_position: 6
title: Transistors & MOSFETs
---

# Transistors & MOSFETs

Active switches and amplifiers. On digital boards they're mostly used as **switches** — turning
power or loads on and off.

## BJT vs MOSFET

| | BJT | MOSFET |
| --- | --- | --- |
| Controlled by | **Current** (base) | **Voltage** (gate) |
| On-state | Vce(sat) drop | Low **Rds(on)** resistance |
| Use for | Small signal switching, level shift | Power switching, load switches |

For switching power, **MOSFETs** win (low loss). N-channel for low-side, P-channel (or a high-
side driver) for high-side.

## Common MOSFET circuits

- **Low-side switch** — N-FET between load and GND; MCU drives the gate (add a gate resistor and
  a gate pull-down so it's off at boot).
- **High-side / load switch** — P-FET (or a dedicated load-switch IC) to gate a rail cleanly,
  often with controlled inrush.
- **Reverse-polarity protection** — a P-FET in the supply, lower loss than a diode.
- **Level shifting** — a small N-FET + two pull-ups bidirectionally shifts I²C between voltage
  domains.

## Gate-drive basics

- The gate is **capacitive** — driving it fast needs current. For power switching use a proper
  **gate driver**; keep the **gate loop short** (see
  [Power Electronics](/docs/pcb-design/circuit-blocks/power-electronics)).
- Always define the gate at power-on (pull-down/up) so the FET isn't randomly on.

:::caution Logic-level gates
A normal MOSFET may need 10 V on the gate to fully turn on. For 3.3 V/5 V MCU control, pick a
**logic-level** MOSFET (full enhancement at ~2.5–4.5 V) or it'll run hot and partially on.
:::

## See also

- [Power Management](/docs/pcb-design/applied-circuits/power-management) — load switches, arbiters
- [Power Electronics & High-Current](/docs/pcb-design/circuit-blocks/power-electronics)
