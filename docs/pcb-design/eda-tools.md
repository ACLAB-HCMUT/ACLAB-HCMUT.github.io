---
sidebar_position: 2
title: PCB Design Software (EDA Tools)
---

# PCB Design Software (EDA Tools)

A practical guide to choosing an **EDA** (Electronic Design Automation) tool: what each one
costs, its strengths and weaknesses, which ones offer **free student licenses**, and roughly
how long they take to learn.

Every tool follows the same flow — **schematic capture → PCB layout → manufacturing outputs**
(Gerbers, BOM, pick-and-place). The fundamentals transfer between tools; the software mostly
changes the UI and the ecosystem around you.

:::tip TL;DR for ACLAB
- **Learning + most lab projects → [KiCad](#kicad-recommended)** — free, cross-platform, genuinely powerful.
- **Coursework simulation → Proteus** — already used in the [Microcontrollers course](/courses/microcontroller).
- **Industry-style workflow → Altium** (free **student license** via school email) or **Cadence Allegro/OrCAD**.
:::

## How to choose

- **Cost / licensing** — free vs. subscription vs. per-seat perpetual.
- **Ecosystem** — library quality, community, tutorials, part availability.
- **Target workflow** — what your team or future employer actually uses.
- **Board complexity** — layer count, high-speed/SI, RF, HDI.
- **Platform** — Windows-only vs. cross-platform (Linux/macOS).

## Quick comparison

| Tool | License | Price (approx.) | Platform | Best for |
| --- | --- | --- | --- | --- |
| **KiCad** | Open source (GPL) | **Free** | Win / mac / Linux | Almost everything |
| **LibrePCB** | Open source | **Free** | Win / mac / Linux | Beginners, simple boards |
| **EasyEDA** | Freemium (web) | Free / Pro paid | Web | Quick boards, JLCPCB/LCSC |
| **Autodesk Eagle → Fusion** | Commercial | Free for students | Win / mac | Hobby → mid-range |
| **Altium Designer** | Commercial | ~US$3–4k+/yr | Windows | Industry standard |
| **Cadence OrCAD / Allegro** | Commercial | $$$ (≫$10k) | Windows | High-end / high-speed |
| **Siemens PADS / Xpedition** | Commercial | $$$ | Windows | Enterprise |

:::note
Prices change often and depend on edition/region — always confirm on the vendor's site.
Open-source tools are free for any use, including commercial.
:::

## Free & open-source

### KiCad (recommended)

- **Pros:** free and unlimited seats; complete suite (schematic, layout, push-and-shove router, 3D viewer, SPICE); cross-platform; huge community and library; ideal for teaching and reproducible open hardware.
- **Cons:** library/footprint management has a learning curve; advanced high-speed length-tuning is less polished than Altium; fewer built-in vendor integrations (closing fast).
- **Price:** Free.

:::note KiCad is production-grade, not a "toy"
Real companies ship complex boards in KiCad. **Antmicro** open-sources advanced designs (FPGA,
multi-gigabit, system-on-module carriers) built entirely in KiCad — browse their
[Open Hardware Portal](https://openhardware.antmicro.com/). "Free" does not mean "limited."
:::

### LibrePCB

- **Pros:** clean, simple, great first tool; cross-platform; unified library system.
- **Cons:** fewer advanced features; smaller ecosystem than KiCad.
- **Price:** Free.

## Freemium / hobbyist

### EasyEDA

- **Pros:** runs in the browser, near-zero setup; tight link to **LCSC** parts and **JLCPCB** fab/assembly; fast for small boards.
- **Cons:** cloud-centric; Pro features are paid; less suited to large/complex designs.
- **Price:** Free (Std); Pro has free and paid tiers.

### Autodesk Eagle (now Fusion Electronics)

- **Pros:** mature, lots of legacy tutorials; now integrated with mechanical CAD in Fusion.
- **Cons:** standalone Eagle is being retired into Fusion; subscription for full use.
- **Price:** **Free education license** with a school email; otherwise part of a Fusion subscription.

## Professional / commercial

### Altium Designer

- **Pros:** polished UX; excellent high-speed routing and interactive length tuning; strong library + data management via **Altium 365**; de-facto industry standard.
- **Cons:** expensive; **Windows-only**.
- **Price:** subscription ≈ **US$3–4k+/yr**; perpetual seats cost far more.

:::tip Free for students
- **Altium Education** — free **1-year, renewable** license with a verified student email.
- **CircuitMaker** — free, community-oriented Altium tool (projects are public).
- **Altium 365 Viewer** — free, web-based, for viewing/reviewing without a license.
:::

### Cadence OrCAD / Allegro

- **Pros:** top-tier signal/power integrity and constraint management; used for the most complex, high-speed industrial boards.
- **Cons:** very expensive; steep learning curve; licensing is enterprise/university-program based.
- **Price:** $$$ — typically well over US$10k per seat.

:::info You can still open the files for free
The **Allegro FREE Physical Viewer** (free download from Cadence) opens and inspects Allegro
boards without a license — handy for design reviews and learning from existing layouts.
:::

### Siemens PADS / Xpedition

- **Pros:** scalable from PADS (mid-range) to Xpedition (enterprise high-speed/HDI).
- **Cons:** cost and complexity aimed at companies, not individuals.
- **Price:** $$$ — quote-based.

## Student & free licenses (with a school email)

| Tool | How to get it |
| --- | --- |
| **Altium Education** | Free 1-year (renewable) — verify with student email |
| **Autodesk Fusion / Eagle** | Free education license — sign up with school email |
| **DipTrace** | Free non-commercial / student edition |
| **Cadence / Siemens** | Via university programs — ask a faculty member, not self-serve |
| **KiCad · LibrePCB · EasyEDA (Std)** | Free for everyone — no license needed |

## Free viewers (inspect a design without buying)

- **Allegro FREE Physical Viewer** — Cadence boards.
- **Altium 365 Viewer / Altium Designer Viewer** — Altium projects, in the browser.
- **KiCad** — opens its own files and imports Eagle/Altium designs.
- **Gerber viewers** — most fabs (e.g. JLCPCB, OSH Park) provide a free online viewer to check manufacturing output.

## Learning curve

- **Basics are quick.** A simple 2-layer board (schematic → layout → Gerbers) can be learned in **a few days**.
- **Embedded engineers usually know the basics** — reading schematics, simple layouts, decoupling, connectors — even if PCB design isn't their specialty.
- **Mastery takes longer** — high-speed/signal integrity, impedance control, RF, HDI and EMC are a **months-to-years** investment.
- **Fundamentals beat the tool** — good schematics, grounding and [DFM](/docs/pcb-design) transfer everywhere. Learn **one** tool well; switching is mostly relearning the UI.

:::tip First board? Start here
Install **KiCad**, follow the official getting-started, and lay out a small breakout for an MCU
you already know (e.g. ESP32 or STM32 — see [Embedded Firmware](/docs/embedded-firmware)).
Keep the [DFM checklist](/docs/pcb-design) handy before you order.
:::

## References

- [KiCad documentation](https://docs.kicad.org/) — official guides and tutorials.
- [Antmicro Open Hardware Portal](https://openhardware.antmicro.com/) — production open-source designs in KiCad.
- [Altium Education](https://education.altium.com/) — free student license.
- Manufacturer DFM guides — e.g. JLCPCB, OSH Park — for real-world fabrication limits.
