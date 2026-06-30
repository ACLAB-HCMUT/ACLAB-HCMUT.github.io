---
sidebar_position: 5
title: High-Speed Interface Layout
---

# High-Speed Interface Layout

Concrete routing playbooks for the interfaces people most often get wrong. They all build on the
same physics — [controlled impedance](/docs/pcb-design/fundamentals/impedance-and-stackup) and
[return paths](/docs/pcb-design/fundamentals/return-paths-and-grounding) — applied per interface.

## DDR / RAM

- The hardest common layout. Use the **memory controller's layout guide** — it's not optional.
- **Match lengths** within each byte lane (data + strobe) and across address/command groups; tune
  with serpentines.
- **Fly-by topology** for address/command on DDR3/4; terminate per the spec.
- Keep it on a tight **stackup** with solid reference planes; minimise vias on the bus.

## HDMI / DisplayPort

- **100 Ω differential** pairs; tight intra-pair skew; route the pairs as a group.
- Keep TMDS/lane pairs short and away from noisy nets; **ESD protection** at the connector
  (purpose-built HDMI ESD arrays).
- Continuous reference plane — never cross a split.

## PCIe

- **~85 Ω differential**, very low loss budget. Minimise **vias and stubs**; back-drill on thick
  boards if needed.
- **AC-coupling caps** on the TX pairs (per spec); keep pairs matched and tightly coupled.
- Reference-plane continuity is critical; add ground stitching at layer transitions.

## USB

- **USB 2.0:** 90 Ω differential D+/D−, length-matched, short; series 22–33 Ω where the PHY
  specifies; ESD/TVS at the connector.
- **USB 3 / Type-C:** ~90 Ω SuperSpeed pairs, treat like PCIe (low loss, AC-coupling, few vias);
  handle CC/SBU and ESD.

## General rules (all of the above)

- Decide the **stackup first**; route fast pairs over a **solid plane**.
- **Never cross a plane split**; stitch ground at every layer change.
- Length/skew match per the interface spec; keep stubs and via count minimal.
- **ESD at the connector**, short to ground.

:::tip Use the vendor layout guide
For DDR, PCIe, HDMI and USB3, the controller/PHY vendor publishes a layout guideline with exact
tolerances. Follow it — these interfaces are unforgiving and not worth improvising.
:::

## See also

- [High-Speed Digital Signals](/docs/pcb-design/circuit-blocks/high-speed)
- [Impedance & Stackup](/docs/pcb-design/fundamentals/impedance-and-stackup)
- [Reference Designs & Sources](/docs/pcb-design/reference-designs) — study real high-speed boards
