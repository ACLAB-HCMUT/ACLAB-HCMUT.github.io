---
slug: /pcb-design
title: PCB Design & DFM
---

# PCB Design & DFM

Designing reliable, manufacturable printed circuit boards.

## Guides

- [**PCB Design Software (EDA Tools)**](/docs/pcb-design/eda-tools) — comparison, pricing, free student licenses, learning curve.
- [**Design by Circuit Block**](/docs/pcb-design/circuit-blocks) — classify a board into blocks (MCU, power, power electronics, high-speed, analog) and design each by its own rules.
- [**Signal & Power Integrity**](/docs/pcb-design/fundamentals) — the cross-cutting physics: signal integrity, return paths, EMI/EMC, impedance/stackup, copper pours & thermal.
- [**Common Mistakes & Risks**](/docs/pcb-design/common-mistakes) — decoupling, crosstalk, differential pairs, DFM/manufacturing pitfalls.
- [**From Design to Delivery**](/docs/pcb-design/fabrication-and-ordering) — DRC, output files, ordering options, shipping & customs (JLCPCB case study).
- [**Reference Designs & Sources**](/docs/pcb-design/reference-designs) — learn from open boards (Antmicro, Raspberry Pi, BeagleBoard…).

## Topics

- **Schematic capture:** symbols, nets, design reuse
- **Layout:** placement, routing, power/ground planes, signal integrity
- **Power:** LDO, buck/boost, decoupling
- **DFM:** design rules, stackup, fabrication & assembly constraints
- **Bring-up:** first power-on, debugging hardware

## Tools

- **Software:** see [PCB Design Software (EDA Tools)](/docs/pcb-design/eda-tools) — comparison,
  pricing, free student licenses and learning curve. KiCad is preferred (free, powerful).
- **Bench tools:** multimeter, oscilloscope, bench supply — see [Lab Equipment Guide](/docs/equipment/tools/measurement-instruments).

## DFM checklist (short)

- [ ] Design rules match the fab's capabilities
- [ ] Proper decoupling on every IC
- [ ] Clear silkscreen, fiducials, and test points
- [ ] Reviewed BOM and footprints before ordering
