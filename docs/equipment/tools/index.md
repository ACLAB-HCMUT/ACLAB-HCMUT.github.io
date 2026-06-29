---
sidebar_position: 1
title: Tools
---

# Tools

Tools are what you **use on** your devices — to build them, power them, measure them, and
program them. They split into three groups:

| Group | What it's for |
| --- | --- |
| [**Power & Hand Tools**](/docs/equipment/tools/power-hand-tools) | Supplying power and physically assembling/reworking hardware (bench supply, soldering, hand tools). |
| [**Measurement Instruments**](/docs/equipment/tools/measurement-instruments) | Answering "what is this signal actually doing?" (multimeter, oscilloscope, logic analyzer). |
| [**Programmers & Debuggers**](/docs/equipment/tools/programmers-debuggers) | Getting code onto a chip and stepping through it (ST-Link, J-Link, USB-UART). |

:::tip A debugging workflow
When something doesn't work, move down this ladder:
1. **Multimeter** — is it even powered? Is GND continuous? Right voltage on VCC?
2. **Logic analyzer / oscilloscope** — is the signal present and the right shape/timing?
3. **Debugger** — set a breakpoint and watch the code's actual behaviour.
:::

:::danger Before powering or soldering
Read [Lab Rules & Safety](/docs/lab-rules): ventilation when soldering, eye protection, power
down before wiring, and correct LiPo/Li-ion handling.
:::
