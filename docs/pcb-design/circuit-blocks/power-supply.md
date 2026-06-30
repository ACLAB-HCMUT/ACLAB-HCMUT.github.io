---
sidebar_position: 3
title: Power Supplies (LDO, Buck, Boost)
---

# Power Supplies (LDO, Buck, Boost)

Every board needs to turn its input voltage into clean rails. The two families are **linear
(LDO)** and **switching (buck/boost)** — pick per rail, then lay each out correctly.

## Choosing a regulator

| Type | Efficiency | Noise | Complexity | Use when |
| --- | --- | --- | --- | --- |
| **LDO (linear)** | Low (drops V as heat) | Very low | Tiny | Small drop, low current, noise-sensitive (RF, ADC, clocks) |
| **Buck (step-down)** | High | Switching ripple | Medium | Big drop or higher current (e.g. 12 V → 3.3 V) |
| **Boost (step-up)** | High | Switching ripple | Medium | Output above input (e.g. battery → 5 V) |

A common pattern: **buck** for the bulk drop, then a small **LDO** to clean a sensitive rail.

## LDO layout

- Input and output capacitors **right at the pins**; respect the datasheet's required cap type
  and value (stability depends on it).
- It dissipates `(Vin − Vout) × I` as **heat** — add copper pour / thermal vias for higher current.

## Buck layout (the part people get wrong)

- Keep the **hot loop** (input cap → high-side switch → low-side switch → back to cap) as
  **small** as possible — this loop radiates noise.
- Input cap close to the IC; inductor close; **feedback trace away** from the switch node and
  inductor (it's sensitive).
- Solid ground under the regulator; stitch with vias.

## Protection & sequencing

- **Reverse-polarity** protection (series FET or diode) on the input.
- **Fuse / PTC** and a **TVS** for transient/ESD on exposed inputs.
- If rails must come up in order, plan **power sequencing** (enable pins, supervisors).

:::caution Heat & ripple
LDOs fail by **overheating** — always do the power-dissipation math. Bucks fail by **noise** —
a big hot loop or misplaced feedback shows up as ripple and EMI.
:::

## See also

- [Power Electronics & High-Current](/docs/pcb-design/circuit-blocks/power-electronics)
- [Building a Product](/docs/embedded-firmware/building-a-product) — supporting chips (LDO, etc.)
- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
