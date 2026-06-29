---
sidebar_position: 3
title: Common Mistakes & Risks
---

# Common PCB Mistakes & Risks

A board can pass DRC and still brown out, glitch, fail EMC, or get rejected by the fab. These
are the recurring mistakes — grouped by area, each as **cause → effect → fix**.

:::tip Catch them in review, not after the fab run
Almost everything below is cheap to fix in schematic/layout review and expensive to fix after
ordering. Run the [DFM checklist](/docs/pcb-design) before every order.
:::

## 1. Power & decoupling

- **Missing / too little decoupling** → rail sags on current spikes → random resets, flaky logic. *Fix:* a **100 nF** cap at every IC power pin + a bulk cap (1–10 µF) per supply rail.
- **Decoupling cap placed far from the pin** → trace inductance kills it at high frequency. *Fix:* same side as the IC, shortest trace, vias straight to the plane.
- **Undersized power traces / no power plane** → IR drop and heating. *Fix:* size traces to current; use planes/pours for power and ground.
- **Forgetting regulator input/output caps** → LDO/buck oscillation or ripple. *Fix:* follow the datasheet's required caps and values.

:::warning Decoupling is not optional
A missing 100 nF cap is the classic "works on the bench, glitches in the field" bug. Every IC
power pin needs local decoupling, close to the pin.
:::

## 2. Grounding & return paths

- **Split / slotted ground plane under a fast signal** → return current detours → EMI + signal integrity problems. *Fix:* keep a **continuous reference plane** under high-speed traces.
- **Long return paths** → ground bounce and coupled noise. *Fix:* keep the return directly beneath the signal; add ground stitching vias.
- **Carelessly mixing analog and digital grounds** → digital noise injected into sensitive analog. *Fix:* plan the ground partitioning and the single connection point deliberately.

## 3. Signal integrity

- **Crosstalk** — traces packed too close or long parallel runs couple into each other → noise, glitches. *Fix:* apply the **3W rule**, shorten parallel lengths, add a ground trace/plane between.
- **Stubs, impedance discontinuities, unterminated high-speed lines** → reflections and ringing. *Fix:* keep controlled impedance continuous; terminate where required.
- **No length matching on parallel buses** (e.g. memory) → skew → data errors. *Fix:* length-match within the bus tolerance.

:::warning Differential pairs need real pair routing
USB, Ethernet, CAN, HDMI and similar use **differential signaling**. If the two nets aren't
routed as a tight, length-matched pair at the correct differential impedance (e.g. **90 Ω** USB,
**100 Ω** Ethernet), you get intermittent enumeration, CRC errors, or a link that never comes up.
*Fix:* route them together, length-match, and set controlled impedance from the stackup.
:::

## 4. Manufacturing constraints (DFM)

Set your design rules to the **fab's capability sheet before routing** — not after.

| Constraint | If too aggressive | Conservative default (verify with fab) |
| --- | --- | --- |
| Trace width / spacing | Etch opens or shorts | ≥ 6 mil (0.15 mm) |
| Via drill / pad | Drill breakout, unreliable plating → opens | ≥ 0.3 mm drill / 0.6 mm pad |
| Annular ring | Breakout → open via | ≥ 5 mil (0.13 mm) |
| Copper-to-edge | Exposed copper, shorts | ≥ 0.3 mm |
| Silkscreen line | Unreadable text | ≥ 6 mil |

- **Via too small** → fab can't drill/plate it reliably → intermittent or open connections.
- **Trace too thin** → for current: overheats / lifts; for the process: etches open.
- **Acute angles / acid traps and copper slivers** → etching defects. *Fix:* avoid sharp acute angles; clean up slivers.
- **No solder mask between fine-pitch pads** → solder bridging in assembly.
- **Asymmetric pads/thermals on small passives** → **tombstoning** (part stands up) during reflow.

:::danger Match your DRC to the chosen fab
A 4 mil trace / 0.2 mm via may be fine at an advanced fab but **rejected or surcharged** at a
budget one. Get the manufacturer's capability sheet first and configure DRC to it — a clean DRC
against the *wrong* rules still fails in production.
:::

## 5. Footprints & symbols

- **Wrong footprint, pin mapping, or pin-1 orientation** → unsolderable or dead board.
- **Wrong pad size / pitch, mirrored connector** → parts don't fit or sit backwards.
- **Library part doesn't match the datasheet** → silent errors that survive to assembly.

:::warning Verify every footprint against the datasheet
Footprint errors are a top cause of a board respin. Check pad dimensions, pitch and pin 1
against the **official datasheet** — not just a downloaded library symbol.
:::

## 6. Thermal

- **No copper pour / thermal vias under power ICs** (buck regulators, MCUs with thermal pads) → overheating, shutdown. *Fix:* add the recommended pour and via array.
- **No thermal relief on plane connections** → pads act as heat sinks → cold joints, hard hand-soldering.
- **Hot parts packed together** → heat coupling. *Fix:* space and orient for airflow.

## 7. Process & bring-up

- **No test points / fiducials** → hard to debug and to assemble (no machine alignment).
- **Missing polarity marks, pin-1 dots, labels** → assembly mistakes.
- **Ordering before a design review** → expensive respin. *Fix:* review schematic, layout, **and the Gerbers in a viewer** first.

:::tip Pre-order checklist
- [ ] DRC clean **against the fab's rules**
- [ ] Every IC decoupled; regulators have datasheet caps
- [ ] Differential pairs routed + impedance set; buses length-matched
- [ ] Footprints checked vs datasheets
- [ ] Test points, fiducials, polarity marks present
- [ ] BOM verified; Gerbers viewed before sending
:::

## References

- [KiCad documentation](https://docs.kicad.org/) — design rules and routing.
- Manufacturer DFM / capability guides (e.g. JLCPCB, OSH Park) — real production limits.
- See also: [PCB Design Software (EDA Tools)](/docs/pcb-design/eda-tools) and [Embedded Firmware](/docs/embedded-firmware).
