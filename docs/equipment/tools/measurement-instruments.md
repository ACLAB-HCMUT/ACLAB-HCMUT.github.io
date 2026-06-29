---
sidebar_position: 3
title: Measurement Instruments
---

# Measurement Instruments

When a circuit "doesn't work," these tools tell you **what's actually happening** instead of
guessing. Pick the instrument that matches the question.

| Question | Instrument |
| --- | --- |
| Is the voltage / continuity / resistance right? | **Multimeter** |
| What does this analog signal *look like* over time? | **Oscilloscope** |
| What are these digital bus lines doing (I²C/SPI/UART)? | **Logic analyzer** |

## Multimeter (DMM)

The first tool you reach for. Measures DC/AC voltage, current, resistance, continuity, and
often diode/capacitance.

- **Voltage:** probes in *parallel* with the point you're measuring (red to the node, black to GND).
- **Continuity:** the beeper confirms two points are connected — perfect for finding shorts and
  broken traces with the power **off**.

:::danger Current mode can blow the fuse — or worse
To measure current you move the red lead to the **A/mA jack** and put the meter *in series*
with the load. If you leave it in the current jack and then probe a voltage, you create a near
short. Always return the lead to the **VΩ jack** when done.
:::

## Oscilloscope

Shows voltage as a waveform over time — essential for analog signals, PWM, edges, noise, and
timing.

- Match the **probe attenuation** (often **10×**) to the channel setting, or every reading is
  off by 10×.
- Always connect the **probe ground clip** to circuit ground.
- Set trigger, timebase (horizontal) and volts/div (vertical) so the waveform is stable and
  fills the screen.

:::warning Grounding hazard
A bench scope's probe ground is tied to **earth ground**. Clipping it to a non-ground node (or
probing mains-referenced circuits) can short through the scope and damage your board or the
instrument. Know where your ground is before you clip.
:::

## Logic analyzer

Captures many **digital** lines at once and decodes protocols (I²C, SPI, UART, etc.). The right
tool for "is the sensor actually replying on the bus?" — it shows the decoded bytes, not just
the voltage.

:::tip Scope vs. logic analyzer
Use a **scope** to judge *signal quality* (is the edge clean, is there ringing?). Use a
**logic analyzer** to judge *protocol correctness* (are the right bytes on the bus at the right
time?). For embedded bus debugging, the logic analyzer is usually faster.
:::

:::info Cross-reference
These instruments pair naturally with the [Programmers & Debuggers](/docs/equipment/tools/programmers-debuggers):
the debugger tells you what the *code* thinks it's doing; the scope/analyzer tells you what the
*pins* are really doing. The bug is often the gap between the two.
:::
