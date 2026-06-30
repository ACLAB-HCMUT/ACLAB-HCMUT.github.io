---
sidebar_position: 6
title: Analog & Mixed-Signal
---

# Analog & Mixed-Signal

ADCs, DACs, sensors, op-amps, references. Analog cares about **microvolts**, so the enemies are
**noise, grounding and placement** — coupling from digital and switching circuits ruins
measurements.

## Grounding & placement

- Use a **solid ground plane**; **don't** chop it into isolated islands (modern guidance —
  splits cause more problems than they solve). Instead, **partition by placement**: keep analog
  parts in an analog area, digital in a digital area, over one continuous plane.
- Keep **switching regulators and fast digital** away from analog front-ends and references.
- Route digital and analog signals so they don't run parallel/overlap.

## Reference & filtering

- Give ADC/DAC reference and supply pins their **own filtering** (ferrite/RC + local caps).
- Use a clean, stable **voltage reference**; keep its traces short and quiet.

## Sensing

- Use **Kelvin (4-wire) sensing** for shunts and precision measurements.
- Guard high-impedance nodes; keep leakage paths clean (no flux residue).

## ADC layout

- Place the ADC near its signal source; short analog input traces.
- Single, clean return for the analog section; tie to the system ground at one well-chosen point
  near the converter.

:::caution Noise sneaks in
The most common analog bug is a **switching regulator or digital bus placed next to the
front-end**. Fix it with placement first, filtering second.
:::

## See also

- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply) — clean rails for analog
- [High-Speed Digital Signals](/docs/pcb-design/circuit-blocks/high-speed)
- [Lab Equipment: Measurement](/docs/equipment/tools/measurement-instruments)
