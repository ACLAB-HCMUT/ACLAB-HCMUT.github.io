---
sidebar_position: 1
title: Signal & Power Integrity
---

# Signal & Power Integrity

The physics that decides whether a board *works* once signals get fast or currents get large.
These topics are **cross-cutting** — they apply to every [circuit block](/docs/pcb-design/circuit-blocks),
not just one. Learn them once and apply everywhere.

## The concepts

| Topic | The core idea | Page |
| --- | --- | --- |
| **Signal integrity (SI)** | Fast edges = transmission lines; reflections, terminations, crosstalk | [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity) |
| **Return paths & grounding** | Current always returns; keep its path under the signal | [Return Paths & Grounding](/docs/pcb-design/fundamentals/return-paths-and-grounding) |
| **EMI / EMC** | Emissions & immunity; pass compliance and don't self-interfere | [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc) |
| **Impedance & stackup** | Trace geometry + layer stack set the impedance | [Impedance & Stackup](/docs/pcb-design/fundamentals/impedance-and-stackup) |
| **Copper pours & thermal** | Fill zones, thermal relief, plane capacitance, heat | [Copper Pours & Thermal](/docs/pcb-design/fundamentals/copper-pours-and-thermal) |

## Why it matters

A schematic can be perfect and the board still fail because of **how it's laid out**: a trace
that reflects, a return current forced to detour, a plane split that radiates. These five topics
are the difference between "the simulation passed" and "the hardware passes EMC and boots every
time."

:::tip They're connected
SI, return paths, EMI and impedance are **the same physics** seen from different angles. A clean
return path is good SI *and* low EMI *and* controlled impedance. Fix the ground/stackup and most
problems shrink at once.
:::

## See also

- [Design by Circuit Block](/docs/pcb-design/circuit-blocks)
- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
