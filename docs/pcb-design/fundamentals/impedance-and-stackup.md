---
sidebar_position: 5
title: Impedance & Stackup
---

# Impedance & Stackup

A trace's **characteristic impedance** is set by its geometry and the **layer stackup** around
it. Controlled impedance is what makes [signal integrity](/docs/pcb-design/fundamentals/signal-integrity)
and high-speed interfaces work.

## What sets impedance

For a given trace, impedance depends on:

- **Trace width** (wider → lower impedance)
- **Distance to the reference plane** (closer → lower impedance)
- **Dielectric constant (Dk)** of the board material
- **Copper thickness** and **trace spacing** (for differential pairs)

You don't compute this by hand — use your EDA tool's calculator or your fab's **impedance
calculator**, then confirm with an **impedance-controlled stackup** from the fab.

## Microstrip vs stripline

| Type | Where | Notes |
| --- | --- | --- |
| **Microstrip** | Outer layer, one reference plane below | Easier, slightly faster; more radiation |
| **Stripline** | Inner layer, plane above *and* below | Better shielding/EMI; needs ≥4 layers |

## Stackup basics

- **2-layer** boards can't do good controlled impedance or shielding — fine for slow/simple
  boards, not for high-speed.
- **4-layer** is the practical minimum for high-speed: e.g. **Signal / GND / PWR / Signal**, so
  every signal layer has an adjacent reference plane.
- Keep signal layers **adjacent to a plane**; keep the impedance-critical layer close to its
  reference.

## Common targets

| Interface | Impedance |
| --- | --- |
| Generic single-ended | 50 Ω |
| USB 2.0 | 90 Ω differential |
| Ethernet / HDMI / LVDS | 100 Ω differential |
| USB 3 / PCIe | ~85–100 Ω differential |

:::tip Decide the stackup first
Pick the layer count and stackup **before** routing fast nets — impedance, return paths and EMI
all depend on it. Ask the fab for their standard impedance-controlled stackup early.
:::

## See also

- [High-Speed Digital Signals](/docs/pcb-design/circuit-blocks/high-speed)
- [From Design to Delivery](/docs/pcb-design/fabrication-and-ordering) — request a controlled stackup
- [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity)
