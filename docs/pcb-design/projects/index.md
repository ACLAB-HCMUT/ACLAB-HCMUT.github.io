---
sidebar_position: 1
title: PCB Examples & Reference
---

# PCB Examples & Reference

Worked PCB examples and design references — real boards broken down into practical, step-by-step
guidance you can follow in [KiCad](/docs/pcb-design/eda-tools). Use them alongside
[Common Mistakes & Risks](/docs/pcb-design/common-mistakes) and
[From Design to Delivery](/docs/pcb-design/fabrication-and-ordering).

## Intel x86 Carrier Board

A carrier/extension board hosting an **Intel x86 coreboard**, integrating common PC interfaces
(PCIe, M.2 Wi-Fi, HDMI/DP, USB, SATA, audio, LAN, ATX-like power). Baseline: **KiCad → JLCPCB,
6-layer controlled-impedance**.

- [**Overview**](/docs/pcb-design/projects/intel-x86-carrier-overview) — architecture, priorities, key decisions, what to verify.
- [**Power & Power Management**](/docs/pcb-design/projects/intel-x86-carrier-power) — 12V input, power mux, standby rails, power-state signals.
- [**High-Speed Interfaces**](/docs/pcb-design/projects/intel-x86-carrier-high-speed) — PCIe, M.2, HDMI/DDI, USB, SATA mux, signal integrity, FPC.
- [**Peripherals & Audio**](/docs/pcb-design/projects/intel-x86-carrier-peripherals) — ALC662 audio, LAN, SPI BIOS, SMBus/I2C/UART/GPIO/EC.
- [**KiCad Workflow & Mechanical**](/docs/pcb-design/projects/intel-x86-carrier-kicad) — schematic, layout, verification, grounding.

:::caution Platform-specific — verify against coreboard docs
The exact pinouts, straps, voltage domains and lane mappings depend on the specific Intel
coreboard. Treat these pages as a structured starting point and confirm details against the
coreboard's documentation before committing the design.
:::
