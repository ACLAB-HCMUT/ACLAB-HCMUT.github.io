---
sidebar_position: 4
title: PCB Assembly
---

# PCB Assembly

Machines for **populating boards** with components in the lab — useful for prototypes and small
batches when you don't outsource to a fab. See also [PCB Design](/docs/pcb-design).

## The SMT assembly chain

1. **Stencil printer / solder-paste jig** — apply solder paste through a stainless **stencil** onto the pads.
2. **Pick-and-place (P&P) machine** — places SMD components onto the paste from reels/trays using vision alignment.
3. **Reflow oven** — heats the board through a temperature profile so the paste melts and solders all joints at once.

## Machines & tools

| Tool | Role |
| --- | --- |
| **Stencil printer** | Repeatable solder-paste application |
| **Pick-and-place machine** | Automated component placement (speed + accuracy) |
| **Reflow oven** | Controlled reflow soldering profile |
| **Reflow hot plate** | Small/single-sided boards, quick reflow |
| **Hot-air rework station** | Place/remove individual SMD parts |
| **Wave/selective soldering** | Through-hole at volume (advanced) |

:::tip Hand vs. machine
For one or two prototypes, a **stencil + hot plate/hot air** is often enough. Reach for
**pick-and-place + reflow** when placing many parts or building several boards. See PCBA tips in
[From Design to Delivery](/docs/pcb-design/fabrication-and-ordering).
:::

:::caution Profiles & paste
Follow the solder paste's **reflow profile** (preheat → soak → reflow → cool) and store paste
correctly. A bad profile causes cold joints, tombstoning or damaged parts.
:::
