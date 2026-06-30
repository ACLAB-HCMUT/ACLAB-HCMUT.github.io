---
sidebar_position: 3
title: Power Management
---

# Power Management

Protecting the input, choosing between multiple power sources, and switching rails cleanly — the
circuitry that sits between "power in" and your regulators.

## Input protection

| Threat | Protection |
| --- | --- |
| **Reverse polarity** | Series Schottky (simple) or **P-FET** (low loss) |
| **Overcurrent** | Fuse, **PTC resettable fuse**, or an **eFuse** IC |
| **Overvoltage / transients** | **TVS** clamp (see [Diodes & Protection](/docs/pcb-design/components/diodes-and-protection)) |
| **Inrush** | Soft-start / load switch with controlled slew, or NTC |

An **eFuse** IC combines several of these (current limit, OVP, inrush, reverse) in one part — a
clean choice for a robust input.

## Power path & arbitration (the "arbiter")

When a board can be powered from **more than one source** — e.g. USB, a DC barrel jack, and a
battery — you need to **choose** which one supplies the load and switch seamlessly between them.

- **Diode-OR (ideal-diode OR-ing):** each source feeds through an ideal-diode/Schottky; the
  highest voltage wins. Simple, but no explicit priority.
- **Priority muxing / power MUX IC:** a **power-path / arbiter** IC enforces a priority (e.g.
  "use the wall adapter if present, else battery") and switches **make-before-break** so the rail
  never drops.
- **PMIC / battery charger with power-path:** powers the system *and* charges the battery from
  the same input, running from the adapter when present and the battery when not.
- **Load switches:** gate individual rails on/off (sequencing, standby) with controlled inrush.

```
Adapter ─┐
USB ─────┤─►  Power-path / arbiter  ─►  System rail  ─►  Regulators
Battery ─┘        (priority + make-before-break)
```

## Sequencing

- If rails must come up in order (core before I/O, etc.), use **enable chaining** or a
  **supervisor / sequencer**, and add **power-good** signals.

:::tip Pick the right level of integration
For anything battery + USB + adapter, reach for a **power-path PMIC or arbiter IC** rather than
discrete diodes — it handles priority, charging and glitch-free switchover for you.
:::

## See also

- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply)
- [Transistors & MOSFETs](/docs/pcb-design/components/transistors-and-mosfets) — load switches
- [Power Topologies](/docs/pcb-design/applied-circuits/power-topologies)
