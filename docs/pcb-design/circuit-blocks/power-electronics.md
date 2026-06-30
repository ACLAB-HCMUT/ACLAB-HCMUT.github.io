---
sidebar_position: 4
title: Power Electronics & High-Current
---

# Power Electronics & High-Current

Motor drivers, H-bridges, high-current switching FETs, battery paths. Here the enemies are
**heat, current density, and switching noise** — and sometimes **mains/high voltage**, which is
a safety matter.

## Copper & thermal

- **Width = current.** Size traces (or use copper pours) for the current; use an online
  trace-width calculator and add margin.
- Use **heavier copper** (2 oz+) for high-current layers if needed.
- Spread heat with **polygon pours** and **thermal vias** under hot parts (FETs, regulators).
- Keep high-current paths **short and direct**; avoid thin necks at pads.

## Switching FETs & gate drive

- Keep the **gate-drive loop small** (driver → gate → source return) — long gate traces ring and
  slow switching.
- Add a **gate resistor** to tune edge speed / reduce ringing.
- Keep the **power loop** (FET + bulk cap) tight; place decoupling/bulk caps close.
- Add **current sense** (shunt + Kelvin connection) where you need feedback.

## Isolation, creepage & clearance

- For higher voltages, respect **creepage (along surface)** and **clearance (through air)** per
  the standard for your voltage — widen gaps, add slots.
- Keep high-voltage and low-voltage / logic domains physically separated.

## Snubbers & protection

- Add **snubbers / flyback diodes** across inductive loads (motors, relays, solenoids).
- Protect the input and outputs (TVS, fuses) for real-world transients.

:::danger Safety
Power electronics get **hot** and can carry **dangerous voltages/currents**. Verify thermal and
clearance before powering. Treat anything mains-connected as a safety-critical design — see
[Lab Rules & Safety](/docs/lab-rules).
:::

## See also

- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply)
- [Lab Rules & Safety](/docs/lab-rules)
- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
