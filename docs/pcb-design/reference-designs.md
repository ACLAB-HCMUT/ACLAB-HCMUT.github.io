---
sidebar_position: 7
title: Reference Designs & Sources
---

# Reference Designs & Sources

The fastest way to learn board design is to **read good boards**. Many vendors and projects
publish full schematics, layouts and Gerbers under open licenses — study how they handle power,
decoupling, connectors and high-speed routing, then apply the patterns to your own work.

## Open hardware to study

| Source | What it is | Good for studying |
| --- | --- | --- |
| [Antmicro Open Hardware](https://openhardware.antmicro.com/) | Open KiCad designs — SoM carriers, baseboards, FPGA/AI boards | High-speed routing, SoM/connector design, clean modern KiCad practice |
| [Raspberry Pi](https://www.raspberrypi.com/documentation/) | SBC family; mechanical + reduced schematics | Power tree, USB/Ethernet, connector pinouts, form factor |
| [BeagleBoard](https://www.beagleboard.org/) | Fully open SBCs (schematics, layout, BOM, Gerbers) | End-to-end open design, DDR/high-speed, power sequencing |
| [Olimex](https://github.com/OLIMEX) | Open-source boards (KiCad/Eagle sources) | Practical, manufacturable layouts; many small reference blocks |
| [Arduino](https://www.arduino.cc/en/hardware) | Reference schematics for every board | Beginner-friendly MCU + power + USB blocks |
| SparkFun / Adafruit | Breakouts with published hookup guides + EDA files | Single-block examples (sensors, regulators, level shifters) |

Single-board computers in general — **Raspberry Pi, BeagleBone, Banana/Orange Pi** and open
**SoM carrier boards** — are excellent references for the hard parts: power distribution, DDR and
high-speed interfaces, and dense connector layout.

## How to read a reference board

1. **Power tree first** — trace every rail from input to load; note regulator choices and
   sequencing.
2. **Decoupling** — how many caps per IC, values, placement.
3. **Connectors & pinouts** — standard interfaces, ESD/protection parts.
4. **High-speed** — stackup notes, impedance, length matching, plane usage.
5. **Layout discipline** — placement order, ground strategy, test points, silkscreen.

:::caution Licenses
"Open" doesn't always mean "reuse freely." Check each project's **license** before copying a
design or footprint into your own board. Learn the *patterns*; don't blindly clone.
:::

## See also

- [Design by Circuit Block](/docs/pcb-design/circuit-blocks) — apply what you learn, block by block
- [Single-Board Computers](/docs/equipment/devices/single-board-computers) — has an interactive 3D model
- [Hardware Viewer](/hardware-viewer) — view a real PCB's Gerbers and a 3D part in-browser
