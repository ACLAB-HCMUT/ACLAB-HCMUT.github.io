---
sidebar_position: 3
title: Intel x86 Carrier Board — High-Speed Interfaces
---

# Intel x86 Carrier Board — High-Speed Interfaces

This page is the practical, step-by-step routing reference for the high-speed interfaces on the
ACLAB Intel x86 carrier board (carrier for an Intel x86 coreboard, designed in **KiCad** and
fabricated at **JLCPCB** on a **6-layer controlled-impedance** stackup).

:::danger This is the highest-risk page in the PCB Design section
Every interface below carries signal-integrity, power, or platform-config risk. Do **not** copy a
rule blindly — always confirm against the actual coreboard datasheet, the endpoint device, and the
real JLCPCB stackup. When in doubt, verify before you route.
:::

See also: [Common PCB mistakes](/docs/pcb-design/common-mistakes) ·
[Carrier board overview](/docs/pcb-design/projects/intel-x86-carrier-overview).

## Signal-integrity targets

| Interface | Target impedance | Notes |
| --- | --- | --- |
| PCIe | **85 Ω** differential | TX/RX pairs + REFCLK |
| HDMI (TMDS) | **90 Ω** differential | TMDS clock + data pairs |
| USB 3.x | **90 Ω** differential | SuperSpeed TX/RX pairs |
| SATA | **~100 Ω** differential (VERIFY) | Confirm against SATA architecture |

General rules for every pair on the board:

- Use the **actual JLCPCB stackup** — calculate trace width and gap from the stackup
  (copper thickness + dielectric height) for each layer.
- **Do not reuse impedance widths across layers** without recalculating per layer.
- Keep a **solid GND reference plane** directly under every pair.
- **Avoid plane splits, voids, and antipads** under pairs.
- **Minimize layer transitions.** When you must change layers, transition both conductors
  similarly and add nearby **GND stitching vias**.
- Avoid 90° corners — use **45° or smooth/arc** routing.
- Keep P/N members matched in **length, via count, and environment**.
- Don't route high-speed pairs over **noisy power islands**.

## PCIe (highest priority)

- **Signals:**
  - `PERp` / `PERn` — receive pair
  - `PETp` / `PETn` — transmit pair
  - `REFCLKp` / `REFCLKn` — reference clock

:::caution Direction (TX/RX) is relative to the transmitter
TX/RX naming depends on which side is transmitting. Confirm direction from **both** the coreboard
and the endpoint, then connect **host TX → device RX** and **host RX → device TX**.
:::

- **Lane grouping:** a x4 link is wired by physical lanes plus platform configuration; keep
  lanes 1–4 consistent to one endpoint/connector.
- **Sideband signals:**
  - `PERST#` — reset (host → endpoint)
  - `CLKREQ#` — clock request (power management)
  - `WAKE#` — wake (endpoint → host)

:::caution AC-coupling capacitors
AC-coupling caps normally sit on the **TX pairs**. **VERIFY whether the coreboard already includes
them** before duplicating. Where the docs permit, place them **close to the transmitter**.
:::

- **Routing rules (85 Ω):**
  - Tightly coupled and length-matched.
  - Equal via count and topology for P and N.
  - Don't split reference planes under the pair.
  - Avoid stubs and test pads.
  - Add ground stitching at transitions.
  - Keep away from switching nodes and inductors.
  - **Don't route under crystals, clock generators, or audio/analog.**
- **Power:** possible rails are `12V` / `3.3V` / `3.3Vaux` where the device requires them —
  check the actual connector and device needs before populating.
- **Connector mechanics:** tie all shield/mechanical GND pins to GND; provide ample ground vias
  near the connector and on escape routing.

## M.2 Key-E (Wi-Fi + Bluetooth)

- **Essential signals:** PCIe TX/RX pair(s), PCIe REFCLK pair, `PERST#`, `CLKREQ#`,
  `WAKE#` (if supported), `3.3V`, `GND`, and **USB 2.0 D+/D-** (Bluetooth is carried over USB 2.0
  on many modules).
- **Logic level:** typically 3.3V — verify against both the module and the coreboard.
- **Layout:**
  - Keep PCIe short and impedance-controlled.
  - Place the socket with **antenna clearance**.
  - **No copper or metal near the antenna zone.**
  - Robust ground stitching.

## HDMI / DDI / DisplayPort

- **Source:** `DDI1` from the coreboard.

:::caution DDI is ambiguous — don't assume HDMI-only
A DDI port may be **HDMI or DisplayPort** depending on the platform and its configuration.
Confirm the actual mode before designing the path.
:::

- **HDMI path:** coreboard → **FPC 26-pin** → external HDMI daughterboard.
  - High-speed pairs: **TMDS clock + TMDS data pairs (90 Ω)**.
  - Support signals: `HPD`, `DDC/I2C`, an HDMI `5V` source with protection/current-limit, `CEC`
    if required, and **ESD protection at the external connector**.
- **Logic:** confirm the `HPD`/`DDC` voltage domain before any direct connection — **don't assume
  it is 5V-safe**.
- **Routing:** TMDS length-matched; avoid vias; uninterrupted reference plane; place **ESD close to
  the external connector**, not mid-route.
- **`DDI1_AUX_SEL`:** pull **High** when the platform docs require HDMI/AUX-select high — confirm
  the exact polarity from the coreboard documentation.

:::note Platform-specific power-LED scheme
A user scheme uses `PWR_LED`/`PSON` to drive a MOSFET that pulls a DDI-related node to GND. Treat
this as **platform-specific** and verify the logic against your coreboard before reusing it.
:::

- **LVDS / eDP:**
  - May stay **NC** if there is no internal panel — after verifying that unused display interfaces
    don't need strap resistors or configuration.
  - `DDI1` HDMI and LVDS/eDP may coexist **only if** the coreboard pipeline and BIOS support it —
    verify.
  - Don't route LVDS/eDP to an arbitrary panel connector without checking pinout, voltage,
    backlight, and power sequencing.
  - If future panel support is wanted, **reserve the footprint, ESD, and pull resistors** now.

## USB

- **USB 2.0:**
  - Route `D+`/`D-` as a differential pair; avoid long stubs and asymmetric branches.
  - **OC (over-current) direction must be confirmed from the coreboard** — typically an input to
    the host from a power switch.
- **USB 3.x (90 Ω):** SuperSpeed TX pair, SuperSpeed RX pair, and USB 2.0 `D+`/`D-`.
- **USB-C:**
  - The receptacle requires **plug-flip orientation handling** — the mux/PHY must support both
    orientations unless the connector/controller already handles it.
  - **Don't short independent SuperSpeed lanes** without confirming topology.
  - `CC` pins need a correct Type-C/PD controller or resistor configuration.
  - `VBUS` needs current limiting + protection.
- **Protection:** ESD arrays close to external USB connectors; use a controlled USB power switch
  with over-current reporting where applicable.

## SATA / PCIe mux

- **Concept:** some coreboard lanes are **muxed between SATA and PCIe** — a given lane
  group/port is SATA **OR** PCIe, never both at once.

:::caution Selection is platform-controlled
Follow the platform strap / BIOS / coreboard docs for selection. **Don't connect one muxed group
to active SATA and PCIe simultaneously.** Document each lane-group allocation.
:::

- **SATA routing:**
  - Typically **100 Ω** differential (verify).
  - AC coupling only as the SATA architecture specifies.
  - Keep traces short and continuous over the reference plane.
- **SATA over FPC:** possible **only** with a controlled-impedance FPC, a short cable, reliable
  grounding, and a validated pinout — **higher risk** than routing directly to a SATA connector.
- **PCIe-over-mux:** maintain all PCIe rules when the mode is PCIe; ensure the BIOS/platform config
  matches the physical implementation.

## FPC design (HDMI & SATA daughterboards)

- Reserve **multiple GND pins between high-speed signal groups**.
- Use an **impedance-controlled FPC** for HDMI/SATA/PCIe-like signals.
- Keep the cable **short**.
- Specify **mating orientation and pin numbering** clearly.
- Don't place all high-speed pairs adjacent without GND references between them.
- Add **ESD on the external connector side**.

:::caution FPC is not a generic replacement for a routed connection
FPC is acceptable for HDMI/SATA **only after** considering cable impedance, insertion loss,
grounding, connector quality, and length — it is not a generic substitute for a carefully routed
connection.
:::
