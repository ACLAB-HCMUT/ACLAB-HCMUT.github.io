---
sidebar_position: 3
title: Capacitors
---

# Capacitors

The second-most-common part. Most are doing one of three jobs: **decoupling**, **bulk energy
storage**, or **filtering / DC blocking**.

## Common use cases

| Value | Typical job |
| --- | --- |
| **100 nF (0.1 µF)** | **Decoupling** — one per IC power pin, right at the pin |
| **1 µF – 10 µF** | **Bulk** decoupling per supply rail near the chip |
| **10 µF – 100 µF+** | **Bulk** at the regulator input/output |
| **pF range** | Crystal load caps, RC/EMI filters, feedback |
| series cap | **DC blocking / AC coupling** (e.g. audio, high-speed) |

## Dielectric types (this matters)

| Type | Class | Use for | Watch out |
| --- | --- | --- | --- |
| **C0G/NP0** | Ceramic I | Timing, filters, small precise values | Small capacitance only |
| **X7R/X5R** | Ceramic II | Decoupling, bulk MLCC | **DC-bias derating** (see below) |
| **Electrolytic** | — | Big bulk, low cost | Polarised, ages, ESR |
| **Tantalum/polymer** | — | Compact bulk, stable | Polarised; tantalum fails short |
| **Film** | — | Audio, snubbers, high-V | Bulky |

:::caution MLCC DC-bias derating
An X5R/X7R ceramic loses a big fraction of its capacitance under DC voltage — a "10 µF" cap may
deliver 3–4 µF at its rated voltage. **Over-spec the voltage rating** (e.g. use a 25 V part on a
5 V rail) and don't trust the headline value for bulk.
:::

## Decoupling — the rule

- **100 nF per power pin**, placed at the pin with a short via to ground.
- Add **bulk** (1–10 µF) per rail near the chip; **big bulk** at the regulator.
- Short, wide connections; the loop from cap to pin to ground must be tiny (it's an
  [SI/EMI](/docs/pcb-design/fundamentals/emi-emc) issue).

## See also

- [MCU & Digital Circuits](/docs/pcb-design/circuit-blocks/mcu-and-digital) — decoupling in context
- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply)
- [Copper Pours & Thermal](/docs/pcb-design/fundamentals/copper-pours-and-thermal) — plane capacitance
