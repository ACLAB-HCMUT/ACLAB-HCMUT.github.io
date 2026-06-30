---
sidebar_position: 2
title: Signal Integrity
---

# Signal Integrity

**Signal integrity (SI)** is keeping a signal recognisable from driver to receiver. At low speed
a trace is just a wire. Once the **edge** is fast relative to the trace length, the trace becomes
a **transmission line** and reflections, ringing and crosstalk appear.

## When does a trace become a transmission line?

Rule of thumb: treat it as a transmission line when the trace is longer than about
**1/6–1/10 of the edge's rise distance**. It's the **rise time**, not the clock frequency, that
matters — a slow clock with sharp edges still rings.

## Reflections & termination

- A mismatch between the **source impedance**, the **trace impedance** and the **load** causes
  part of the signal to reflect back → overshoot, undershoot, ringing.
- Fix with **termination**:
  - **Series (source)** termination — a resistor at the driver matching the trace (common for
    point-to-point digital).
  - **Parallel / Thevenin** termination — at the receiver (buses, fast clocks).
- Set the trace to a **controlled impedance** (see [Impedance & Stackup](/docs/pcb-design/fundamentals/impedance-and-stackup)).

## Crosstalk

- Energy couples between traces that run **close and parallel**.
- Reduce it: increase spacing (the **3W rule** — spacing ≥ 3× trace width), keep a solid
  reference plane, shorten parallel runs, and route adjacent layers **orthogonally**.

## Practical SI checklist

- [ ] Identify the **fast** nets (clocks, USB, DDR, fast SPI) — they need SI care
- [ ] Controlled impedance + solid reference plane under them
- [ ] Terminate where the datasheet/length requires
- [ ] Keep parallel runs short; honour 3W spacing
- [ ] Minimise vias/stubs on critical nets

:::tip Return path is half of SI
A signal's quality depends on its **return current** as much as the trace itself. See
[Return Paths & Grounding](/docs/pcb-design/fundamentals/return-paths-and-grounding).
:::

## See also

- [High-Speed Digital Signals](/docs/pcb-design/circuit-blocks/high-speed)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
- [Measurement Instruments](/docs/equipment/tools/measurement-instruments) — scope an SI problem
