---
sidebar_position: 5
title: High-Speed Digital Signals
---

# High-Speed Digital Signals

USB, Ethernet, HDMI, MIPI, DDR, fast SPI/QSPI. Once edges get fast, traces behave like
**transmission lines** — impedance, return paths and length matching decide whether the link
works.

## Controlled impedance

- Fast signals need a **defined impedance**, set by the **stackup** (trace width/spacing,
  dielectric height). Ask your fab for an **impedance-controlled** stackup.
- Typical targets: **50 Ω** single-ended; **90 Ω** (USB) / **100 Ω** (Ethernet, HDMI, LVDS)
  differential.
- Route over a **solid reference plane** (usually ground) directly beneath the layer.

## Return paths (the hidden half)

- Every signal's return current flows in the plane **right under it**. Keep that plane
  **continuous** — do **not** route high-speed traces **across a split/gap** in the reference
  plane.
- Add **ground stitching vias** when a signal changes layers, so the return current has a path.

## Differential pairs & length matching

- Route **pairs together**, constant spacing; match the two halves (**intra-pair skew**) tightly.
- Match **lengths within a bus** (e.g. parallel/DDR) per the interface spec; use serpentine
  tuning where required.
- Minimise stubs and vias on the fast nets.

## Common interfaces

| Interface | Impedance | Notes |
| --- | --- | --- |
| USB 2.0 | 90 Ω diff | Length-match D+/D−; keep short |
| USB 3 / PCIe | ~85–100 Ω diff | Strict; minimise vias/stubs |
| Ethernet (10/100/1000) | 100 Ω diff | Match pairs; magnetics placement |
| HDMI / LVDS / MIPI | 100 Ω diff | Tight skew; route as a group |

:::caution The #1 high-speed mistake
**Crossing a plane split.** A beautiful 100 Ω pair routed over a gap in the ground plane will
radiate and fail EMC. Plan the stackup and plane cuts *before* routing.
:::

## See also

- [From Design to Delivery](/docs/pcb-design/fabrication-and-ordering) — request a controlled stackup
- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
- [Reference Designs & Sources](/docs/pcb-design/reference-designs)
