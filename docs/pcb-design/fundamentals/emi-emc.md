---
sidebar_position: 4
title: EMI / EMC
---

# EMI / EMC

**EMI** = electromagnetic interference (the noise a board *emits* or *picks up*). **EMC** =
electromagnetic compatibility (the board both behaves *and* tolerates its environment). Products
must pass EMC testing to be sold — and even prototypes that fail EMC often self-interfere.

## The model: source → coupling → victim

Fix EMI by breaking any link in this chain:

- **Source** — switching regulators, fast clocks/edges, current loops.
- **Coupling** — radiated (antennas: loops & stubs) or conducted (through cables/power).
- **Victim** — sensitive analog, the same board's own clock, or another device.

## Reduce emissions at the source

- **Shrink current loops** — small loop area radiates far less (this is mostly a
  [return-path](/docs/pcb-design/fundamentals/return-paths-and-grounding) job).
- **Slow the edges** you don't need fast (gate/series resistors) — faster edges = more high-
  frequency energy.
- Keep **switching regulators'** hot loops tiny and local.

## Stop coupling

- **Solid ground planes** and continuous return paths (no plane splits under fast nets).
- **Filter** conducted noise on cables/power: ferrites, common-mode chokes, π-filters.
- **Shield** where needed (cans over RF, shielded cables); ground the shield correctly.
- Guard I/O and connectors with **TVS/ESD** parts and ground stitching.

## Protect the victim (immunity)

- ESD protection on every externally exposed pin.
- Filtering and good grounding on sensitive analog inputs.

## Design-for-EMC checklist

- [ ] Small loop areas; solid return planes
- [ ] No fast trace crosses a plane split
- [ ] Switching regulator loops tight and shielded by ground
- [ ] Edge rates only as fast as needed
- [ ] Filtering + ESD on every cable/connector
- [ ] Clocks routed short, away from board edges and I/O

:::caution EMC is cheap early, expensive late
Fixing EMI after a failed compliance test usually means a **re-spin**. Bake in loop control,
grounding and filtering from the first layout.
:::

## See also

- [Return Paths & Grounding](/docs/pcb-design/fundamentals/return-paths-and-grounding)
- [Signal Integrity](/docs/pcb-design/fundamentals/signal-integrity)
- [Power Electronics & High-Current](/docs/pcb-design/circuit-blocks/power-electronics)
