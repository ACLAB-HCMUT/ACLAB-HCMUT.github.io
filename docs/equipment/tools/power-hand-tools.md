---
sidebar_position: 2
title: Power & Hand Tools
---

# Power & Hand Tools

Everything you need to **supply power** to a circuit and to **build or rework** it physically.

## Bench power supply (DC)

A bench supply gives you an adjustable, current-limited DC source — far safer than a wall
adapter for prototypes.

- **Set the voltage** to your circuit's rating *before* connecting it.
- **Set the current limit** low first; a sane limit turns a wiring mistake into a harmless
  "the supply went into CC mode" instead of fried parts or smoke.

:::tip Current limiting is your safety net
On a fresh board, set the current limit just above expected draw. If the supply hits the limit
(constant-current mode) the instant you power on, you have a short — power down and inspect
before going further.
:::

## Soldering station

A temperature-controlled iron for joining components and reworking boards.

- Typical leaded solder flows around **300–350 °C**; lead-free needs a bit hotter.
- Keep the tip **tinned** and clean (brass wool / damp sponge) — a black, oxidized tip won't
  transfer heat.
- Use flux for clean joints; a good joint is shiny and concave, not a dull blob.

:::danger Soldering safety
The iron and the work get hot enough to burn instantly. **Use fume extraction / ventilation**,
wear eye protection, never leave a hot iron unattended, and return it to its stand. See
[Lab Rules & Safety](/docs/lab-rules).
:::

:::caution ESD
Sensitive parts (MCUs, SoCs, MOSFETs) can be killed by static you can't even feel. Use an
**anti-static wrist strap** and mat when handling bare boards and ICs.
:::

## Hot-air rework

For surface-mount (SMD) parts and removing/replacing chips. Control **air temperature and
flow**; shield neighbouring components and pre-heat large boards so joints reflow evenly.

## Hand tools

| Tool | Use |
| --- | --- |
| Wire strippers / flush cutters | Prep and trim wires and leads |
| Precision screwdrivers | Enclosures, headers, mounts |
| Tweezers (ESD-safe) | Placing SMD parts |
| Helping hands / vice | Holding boards while soldering |
| Heat-shrink + heat gun | Insulating and strain-relieving joints |

:::info Consumables
Log when you use up shared consumables (solder, flux, heat-shrink, wick) so they get
restocked — see the [usage policy](/docs/equipment).
:::
