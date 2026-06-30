---
sidebar_position: 1
title: Design by Circuit Block
---

# Design by Circuit Block

A real board is not one circuit — it's **several blocks**, each with its own layout rules. A
power supply cares about loop area and heat; a high-speed bus cares about impedance and return
paths; an MCU cares about decoupling and clean clocks. Designing "the whole board the same way"
is how boards fail.

This section classifies the common blocks and links a focused guide for each.

## Classification

| Block | What it handles | Primary concern | Page |
| --- | --- | --- | --- |
| **MCU & Digital** | Microcontrollers, logic, memory | Decoupling, clocks, reset/boot, programming | [MCU & Digital](/docs/pcb-design/circuit-blocks/mcu-and-digital) |
| **Power supply** | LDO / buck / boost regulation | Loop area, feedback, thermal, noise | [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply) |
| **Power electronics** | High current, motor drive, switching FETs | Copper/thermal, gate drive, isolation | [Power Electronics](/docs/pcb-design/circuit-blocks/power-electronics) |
| **High-speed digital** | USB, Ethernet, HDMI, MIPI, DDR | Impedance, length match, return path | [High-Speed Signals](/docs/pcb-design/circuit-blocks/high-speed) |
| **Analog & mixed-signal** | ADC/DAC, sensors, op-amps | Grounding, placement, reference, noise | [Analog & Mixed-Signal](/docs/pcb-design/circuit-blocks/analog-mixed-signal) |

## How to use this

1. **Split your schematic into blocks** — power tree, MCU, each interface, analog front-end.
2. **Design each block by its own rules** (the pages above).
3. **Mind the interfaces between blocks** — power sequencing, shared grounds, where a high-speed
   trace crosses a plane split, where a switching regulator sits next to an ADC.

:::tip Start from the power tree
Before placement, sketch the **power tree** (every voltage rail, its source, and its current).
Most layout and grounding decisions follow from it.
:::

## See also

- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
- [Reference Designs & Sources](/docs/pcb-design/reference-designs) — learn from real open boards
- [From Design to Delivery](/docs/pcb-design/fabrication-and-ordering)
