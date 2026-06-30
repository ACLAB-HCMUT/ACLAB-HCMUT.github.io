---
sidebar_position: 6
title: Copper Pours & Thermal
---

# Copper Pours & Thermal

How you fill copper and connect pads affects **power integrity**, **heat** and **manufacturing**.
Two everyday tools: **fill zones (copper pours)** and **thermal relief**.

## Fill zones (copper pours)

A **fill zone** floods an area of a layer with copper tied to a net (usually GND or a power rail).

- **Ground/power planes** as pours give a low-impedance return path and supply, and add
  **plane capacitance** (a power+ground plane pair acts as a small distributed decoupling cap).
- **Stitch** pours on different layers together with vias so they act as one plane.
- Avoid thin **copper slivers/islands** — set a minimum width and remove isolated pour fragments
  (they're useless and can cause issues).
- Don't pour copper that fragments your reference plane under fast signals — a pour is not an
  excuse to break the [return path](/docs/pcb-design/fundamentals/return-paths-and-grounding).

## Thermal relief vs solid connection

When a pad connects to a large pour, how it connects matters:

| Connection | Looks like | Use for |
| --- | --- | --- |
| **Thermal relief** | Spokes (a "wagon wheel") | **Soldering** — the spokes stop the pour from sinking all the heat, so the pad heats and solders properly |
| **Solid (direct)** | Full copper connection | **Current/heat conduction** — high-current pins, thermal pads that must dump heat into the plane |

Rule of thumb: **thermal relief for hand/most assembly soldering; solid for high-current and
thermal-pad connections** (where you accept harder rework for better conduction).

## Thermal management

- Put **thermal vias** under hot parts (regulators, FETs, power thermal pads) to move heat to
  inner/opposite-side copper.
- Use **copper pours** as heatsinks; more copper area = lower temperature rise.
- Heavier **copper weight** (2 oz+) for high-current/high-heat boards.
- Give hot parts breathing room; don't bury them under tall neighbours.

:::caution The "cold pad" trap
A high-current pad connected **solid** to a big ground pour can be nearly impossible to solder by
hand — the pour wicks all the heat. Use **thermal relief** for solderability, or preheat the board.
:::

## See also

- [Power Electronics & High-Current](/docs/pcb-design/circuit-blocks/power-electronics)
- [Return Paths & Grounding](/docs/pcb-design/fundamentals/return-paths-and-grounding)
- [From Design to Delivery](/docs/pcb-design/fabrication-and-ordering)
