---
sidebar_position: 2
title: Intel x86 Carrier Board — Power & Power Management
---

# Intel x86 Carrier Board — Power & Power Management

Practical, step-by-step power design notes for the **Intel x86 coreboard carrier** (KiCad + JLCPCB, 6-layer). For the project context and board overview, see the [carrier board overview](/docs/pcb-design/projects/intel-x86-carrier-overview). For recurring decoupling and power layout pitfalls, see [common mistakes](/docs/pcb-design/common-mistakes).

## Power architecture

- **Primary input: nominal 12V.** Two possible sources:
  - **USB-C PD** negotiated to a 12V (or compatible) profile.
  - **External 12V adapter** (barrel/DC jack).
- A single 12V rail feeds the on-board regulators that derive 3.3V, 5V_SBY, and the standby logic.

:::danger Never tie two 12V sources together
Do **not** directly connect the USB-C PD output and the external 12V adapter to the same node. Back-feeding one source into the other can destroy the PD controller, the adapter, or both. Select between sources with one of:

- a **power mux** (load-switch with priority/select), or
- **ideal-diode ORing** (ideal-diode controller + MOSFET), or
- **MOSFET reverse-current protection** on each input branch.
:::

### Rails

| Rail | Purpose | Notes |
|------|---------|-------|
| **12V** | Main system input | PCIe slot/device power where required; fan and power circuitry |
| **3.3V** | General logic | M.2 Key-E; PCIe aux/device rail when required |
| **3.3V_AUX** (3.3Vaux) | Standby-powered logic | Wake functions where required; active alongside standby domain |
| **5V_SBY** (VCC_5V_SBY) | Standby rail | Active when system is soft-off but input present; powers wake, EC, USB charging, and always-on functions |

## Protection

- **Reverse polarity / reverse current** protection at the input (MOSFET-based or ideal-diode controller).
- **TVS** clamps where external connectors require surge/ESD protection.
- **AVOID paralleling Schottky diodes** as the primary current-sharing element — forward-voltage mismatch causes uneven sharing and thermal runaway in the hottest diode.
- Use a proper **MOSFET / ideal-diode controller** for low conduction loss and predictable, controlled current sharing.

## PCB power rules

- Use **wide copper pour** for high-current 12V paths.
- **Verify filled zones actually connect** to the SMD pads they should feed (run KiCad's zone refill + DRC; visually confirm the pad is in the zone, not isolated by clearance).
- Choose **thermal relief vs. direct (solid) connection** per the current the pad carries and its solderability needs — high-current pads often want a solid connection; hand-solder pads benefit from thermal relief.
- Use **multiple vias** when carrying power between layers (one via per ~0.5–1 A as a rough rule; size to your via current rating).
- **Do not route high-current power under sensitive analog/audio** sections.

:::tip
See [common mistakes](/docs/pcb-design/common-mistakes) for the most frequent decoupling and power-pour errors (orphaned zones, missing stitching vias, thin necks into high-current pads).
:::

## Power-management signals

| Signal | Meaning | Notes |
|--------|---------|-------|
| **PWR_OK** | Power-good | Asserted when rails are stable |
| **PSON** | Power-on control | Enables the main rails |
| **SUS** | Suspend-state signaling | Indicates suspend state |
| **WAKE** | Wake event | Wake request from a peripheral/source |
| **LID** | Lid switch input | Can be left unused if not needed |
| **SLEEP** | Sleep-state | Indicates sleep state |
| **BATLOW** | Low-battery | Often unused for a desktop-like carrier |
| **WDT** | Watchdog | Watchdog timer status/strobe |
| **THRM** | Thermal control/status | Thermal throttle/alert |
| **CB_RESET** | Coreboard reset | Handle carefully per coreboard docs |

:::caution Power-state signal implementation
- Do **not** arbitrarily pull power-state signals high/low without checking the **direction** (input vs. output) for each pin.
- **Match pull-up voltage** to the coreboard's I/O domain — a pull-up to the wrong rail back-feeds or overstresses the pin.
- Keep **standby/wake signals available** even when optional peripherals are absent.
- Mark unused signals **NC only after confirming** they don't affect boot.
:::

## RTC battery

- Provide a **coin-cell holder** plus an optional **RTC battery connector** for an external cell.
- Use **diode ORing / isolation** when switching between the battery and an alternate source so neither back-feeds the other.
- Prefer **low-leakage or ideal-diode** isolation to maximize battery life.

:::caution
- Confirm the **RTC rail voltage** and any **charging restrictions** before wiring.
- **Never charge non-rechargeable coin cells** — verify the cell chemistry and the rail's charging path before connecting.
:::

:::note
For the broader board context (form factor, connectors, layer stack-up), return to the [Intel x86 carrier board overview](/docs/pcb-design/projects/intel-x86-carrier-overview).
:::
