---
sidebar_position: 4
title: Power Topologies
---

# Power Topologies

The standard ways to convert one voltage to another, plus two application standards you'll meet
often: **USB-PD** and **PoE**.

## Converter topologies

| Topology | Direction | Isolated? | Use when |
| --- | --- | --- | --- |
| **LDO (linear)** | Step-down | No | Small drop, low noise, low current |
| **Buck** | Step-down | No | Efficient step-down (12 V → 3.3 V) |
| **Boost** | Step-up | No | Output above input (battery → 5 V) |
| **Buck-boost** | Up *or* down | No | Input crosses output (Li-ion 3.0–4.2 V → 3.3 V) |
| **Flyback** | Up/down | **Yes** | Isolated supply, mains→DC, multiple outputs |

### Flyback (isolated)

- A transformer-based switcher that **galvanically isolates** input from output — the go-to for
  **AC-mains → low-voltage DC** and anywhere isolation/safety is required.
- Needs care: transformer design, primary snubber, output rectifier, and an **isolated feedback**
  path (opto-coupler or auxiliary winding). Respect creepage/clearance across the isolation
  barrier (see [Power Electronics](/docs/pcb-design/circuit-blocks/power-electronics)).

## USB Power Delivery (USB-PD)

- Negotiates higher voltages/currents over USB-C (5 V up to 20 V/48 V EPR) via a **PD controller**
  that talks on the **CC** lines.
- Design notes: a PD controller/PHY (sink or source), correct **CC** pull-ups/downs (Rp/Rd) and
  **VBUS** handling, plus a buck to step the negotiated VBUS down to your rails.

## Power over Ethernet (PoE)

- Delivers power **and** data over one Ethernet cable. A **PD (powered device)** front-end:
  rectifies the power pairs, presents the **25.5 k detection signature**, handles classification,
  then feeds an isolated **flyback/forward** converter (PoE is isolated by spec).
- Use a dedicated **PoE-PD controller** + the right magnetics; mind isolation and the higher
  ~48 V input.

:::caution Isolation = safety
Flyback, PoE and mains supplies cross an **isolation barrier**. Honour creepage/clearance, use
rated isolation parts, and don't route traces across the barrier gap.
:::

## See also

- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply)
- [Power Management](/docs/pcb-design/applied-circuits/power-management)
- [Inductors & Ferrites](/docs/pcb-design/components/inductors-and-ferrites)
