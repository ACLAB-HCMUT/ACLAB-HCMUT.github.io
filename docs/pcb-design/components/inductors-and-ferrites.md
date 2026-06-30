---
sidebar_position: 4
title: Inductors & Ferrites
---

# Inductors & Ferrites

They resist **changes** in current. Two very different uses: **power inductors** store energy in
switching regulators; **ferrite beads** suppress high-frequency noise.

## Power inductors (switching regulators)

- The energy-storage element in a **buck/boost**. Value and current rating come from the
  regulator datasheet — follow it.
- Key specs: **inductance**, **saturation current (Isat)** (don't exceed — inductance collapses),
  **DCR** (resistance → loss/heat), and shielding (shielded = less radiated noise).
- Place **close to the switch node**; keep the hot loop small.

## Ferrite beads (filtering)

- A ferrite bead looks like a small resistor at high frequency — it **absorbs HF noise** as heat.
  Rated by impedance **at 100 MHz** (e.g. "600 Ω @ 100 MHz") and DC current.
- Common use: isolate a **noisy digital supply** from a **sensitive analog/PLL/ADC** rail
  (ferrite + caps = LC/RC filter).

:::caution Don't bead a fast digital rail blindly
A ferrite in series with a high-current or fast supply can **resonate** with decoupling caps and
make ripple *worse*, or starve transient current. Use beads for **filtering sensitive rails**,
not as a default on every power net.
:::

## Common-mode chokes

- Pass the differential signal, block **common-mode** noise — used on USB, Ethernet, and power
  inputs for [EMI](/docs/pcb-design/fundamentals/emi-emc).

## See also

- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply)
- [Analog & Mixed-Signal](/docs/pcb-design/circuit-blocks/analog-mixed-signal) — clean rails
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
