---
sidebar_position: 1
title: Intel x86 Carrier Board — Overview
---

# Intel x86 Carrier Board — Overview

This project is a **carrier (extension) board that hosts an Intel x86 coreboard**. The coreboard provides the CPU, chipset, memory, and the raw I/O signals; the carrier board's job is to turn those raw signals into the **physical interfaces of a real PC**.

The goal is to integrate the common PC interfaces around the coreboard:

- **PCIe** (expansion / NVMe)
- **M.2 Key-E** for Wi-Fi / Bluetooth
- **HDMI / DisplayPort** (video out)
- **eDP / LVDS** (internal panel, optional)
- **USB** (2.0 and 3.x)
- **SATA** (storage)
- **Audio** (codec + jack)
- **LAN** (Ethernet)
- **ATX-like power** input
- **Power-management signals** (power button, PSON, power-good, LEDs, EC/GPIO)

It is designed in **KiCad**, fabricated at **JLCPCB**, on a **6-layer controlled-impedance** baseline stackup.

:::note
This is the orientation page. Detailed work is split across sub-pages:

- [Power](/docs/pcb-design/projects/intel-x86-carrier-power)
- [High-Speed Interfaces](/docs/pcb-design/projects/intel-x86-carrier-high-speed)
- [Peripherals](/docs/pcb-design/projects/intel-x86-carrier-peripherals)
- [KiCad Workflow](/docs/pcb-design/projects/intel-x86-carrier-kicad)
:::

:::tip
New to the PCB process here? Start with the [PCB Design hub](/docs/pcb-design), skim the [common mistakes](/docs/pcb-design/common-mistakes), and read [fabrication & ordering](/docs/pcb-design/fabrication-and-ordering) before committing to a stackup. For the product-level view, see [building a product](/docs/embedded-firmware/building-a-product).
:::

## System architecture

The design is split into a **main carrier board** plus a small number of **external daughterboards** connected by FPC cables.

### Main carrier board

Hosts everything that needs to sit close to the coreboard:

- The **coreboard** itself (board-to-board connectors)
- **Power** input, conversion, and mux/standby rails
- **M.2** socket (Key-E Wi-Fi/BT)
- **Audio** codec and jack
- **USB** ports
- **PCIe** slots / connectors
- **Headers** (power, control, debug)
- **FPC connectors** to the daughterboards
- **Control circuits** (power sequencing, LED/PSON logic, EC/GPIO glue)

### External daughterboards

Pushed off-board to save space and isolate connectors:

- **HDMI daughterboard** — connected via an **FPC 26-pin** cable
- **SATA daughterboard** — connected via FPC

### Coreboard interface

The carrier supplies **main power (especially 12V)** to the coreboard. In return, the coreboard exposes the interfaces the carrier must fan out:

| Interface | Purpose |
| --- | --- |
| **DDI1 HDMI/DP** | Primary digital video out |
| **LVDS / eDP** | Internal display panel |
| **PCIe / PEG** | Expansion lanes / graphics |
| **SATA / PCIe mux groups** | Storage or PCIe, selected per group |
| **USB** | 2.0 and 3.x ports |
| **HDA audio** | High Definition Audio link to codec |
| **SMBus / I2C** | Low-speed control bus |
| **SPI BIOS** | Boot firmware |
| **UART** | Serial / debug |
| **GPIO / FAN / EC** | General-purpose control, fan, embedded controller |
| **LPC** | Legacy / EC bus |
| **Power-management signals** | PSON, power-good, button, LEDs, power-state |

## Design priorities

Work the board in roughly this order — earlier items constrain the floorplan and stackup, so settle them first:

1. **PCIe & high-speed routing** (defines placement and reference planes)
2. **Power input / mux / standby rails**
3. **HDMI / DDI & USB**
4. **M.2 Key-E Wi-Fi / BT**
5. **SATA / FPC**
6. **Audio** (ALC662 + TRRS)
7. **GPIO / EC / SMBus / UART / LPC**

## High-risk areas

:::caution
These are the parts most likely to cause respins or non-boot. Give them extra review and budget time for them:

- **PCIe differential routing** — length match, 85Ω impedance, reference continuity
- **HDMI / DDI routing** — 90Ω diff pairs, AUX/HPD/DDC handling
- **USB 3.x routing** — 90Ω diff, SuperSpeed pair integrity
- **Power sequencing / standby** — correct rail order and standby (always-on) domains
- **SATA / PCIe mux configuration** — wrong straps = wrong mode = dead port
- **Return-current continuity across layer changes** — every signal via needs a nearby return path / stitching
:::

## Key decisions

| Topic | Decision |
| --- | --- |
| Main power | Carrier supplies **main 12V** to the coreboard |
| Stackup | **6-layer JLCPCB** controlled-impedance baseline |
| HDMI diff impedance | **90Ω** differential |
| PCIe diff impedance | **85Ω** differential |
| USB 3.x diff impedance | **90Ω** differential |
| Wi-Fi / BT | **M.2 Key-E** module |
| Audio | **ALC662** codec + **TRRS** jack |
| HDMI path | Via **DDI1** + **26-pin FPC** daughterboard |
| SATA path | May go via FPC, but **treat as controlled-impedance high-speed** |
| LVDS / eDP | May be **NC** (not connected) if there is no internal panel |
| PEG | **Unused** if no discrete GPU |
| LPC | **Unused** if no EC / legacy devices |
| SATA / PCIe mux | Each group selects **one mode** (SATA *or* PCIe), not both |

## Verify from coreboard documentation

:::caution
Do **not** assume any of the following — confirm each against the coreboard datasheet / schematic / BIOS docs before routing or ordering. Wrong assumptions here are the most common cause of a non-booting or dark board.

- [ ] **DDI1 HDMI/DP** configuration & straps
- [ ] **DDI1_AUX_SEL** polarity & pull value
- [ ] **PWR_LED / PSON** MOSFET logic (active level, open-drain vs push-pull)
- [ ] **Available PCIe lanes** & lane-to-port mapping
- [ ] Whether **PCIe AC-coupling caps** are already on the coreboard (avoid double-coupling)
- [ ] **SATA / PCIe mux** straps & BIOS configuration
- [ ] **Voltage domains** for HPD / DDC / GPIO / USB OC / power-state pins (level-shift if mismatched)
- [ ] Whether **LVDS/eDP and DDI1** can run **simultaneously**
- [ ] **RTC battery** voltage & backup topology
- [ ] **SPI BIOS** boot straps & reset behavior
- [ ] Exact **connector pinouts** & mechanical constraints
:::
