---
sidebar_position: 5
title: Intel x86 Carrier Board — KiCad Workflow & Mechanical
---

# Intel x86 Carrier Board — KiCad Workflow & Mechanical

This is a repeatable KiCad checklist for designing the carrier board: a **6-layer,
controlled-impedance** board fabricated at **JLCPCB**. Work through the sections in order —
each one gates the next. Skipping a verification step here is one of the cheapest ways to
waste a fabrication run.

:::note
For tool setup and library management, see [EDA Tools](/docs/pcb-design/eda-tools). For the
signal-integrity rationale behind the high-speed interfaces (PCIe, HDMI, USB3, SATA), see
[Intel x86 Carrier Board — High-Speed Design](/docs/pcb-design/projects/intel-x86-carrier-high-speed).
:::

## Schematic

Get the schematic right before you touch the layout — most layout pain traces back to a sloppy
schematic.

1. **Label every high-speed net explicitly.** Don't rely on implicit wire connections for
   anything that will need impedance control or length tuning.
2. **Use one consistent diff-pair naming scheme.** For example `PCIE_TX0_P` / `PCIE_TX0_N`,
   `HDMI_D0_P` / `HDMI_D0_N`. Pick the convention once and apply it everywhere.
3. **Use hierarchical vs. global labels intentionally.** Hierarchical labels for signals that
   cross sheet boundaries through a defined port; global labels only for truly board-wide nets
   (power rails, resets, common clocks). Don't mix them by accident.
4. **Add `PWR_FLAG` only where ERC genuinely needs a power-source declaration** (e.g. a rail
   fed from a connector or a regulator output that ERC can't otherwise see driving the net).
5. **Mark intentional unused pins as `NC`** so ERC stops flagging them and a reviewer can see
   the omission was deliberate.
6. **Document strap resistors and default logic levels** right next to the relevant signals —
   boot straps, mode selects, and bus configuration pins. A reader should not have to guess the
   default state.

:::caution
`PWR_FLAG` silences ERC about power direction — it is **not** a way to hide a real
power-direction error. If you find yourself adding flags to make warnings disappear, stop and
confirm the actual source/sink direction of the net first.
:::

### Differential-pair naming

KiCad recognizes differential pairs by a **suffix convention** on the net names. Keep it
consistent across the whole board:

- Typically `_P` / `_N` or `+` / `-`, per your board setup.
- The two members of a pair must share the same base name and differ only by the suffix
  (`PCIE_TX0_P` ↔ `PCIE_TX0_N`).
- If the suffixes are inconsistent, the diff-pair router and length-tuning tools will not pair
  the nets, and you will route them as two unrelated single-ended traces.

## Layout

Set up the design rules **before** routing. In KiCad, net classes and impedance rules drive the
router and the DRC; defining them after the fact means re-routing.

1. **Create net classes** for each signal family: PCIe, HDMI, USB3, SATA, low-speed, and power.
2. **Set width, clearance, and diff-pair rules per class BEFORE routing** so the router enforces
   them as you go rather than after.
3. **Assign impedance rules by layer.** Map each high-speed class to the layer(s) where its
   target impedance is achievable in the chosen stackup.
4. **Use length tuning only after the topology is otherwise correct.** Get placement, layer
   assignment, and return paths right first; meanders are a last step, not a fix for bad
   routing.
5. **Inspect the return path before trusting any length-match value.** A length-matched pair
   over a split reference plane is still a broken pair — verify continuous reference under each
   high-speed trace.
6. **Use 3D and footprint checks** to confirm connector orientation and mechanical clearance
   before committing the placement.

:::tip
Define net classes and impedance rules in **Board Setup** first, then route. KiCad applies them
live, so violations show up immediately instead of as a flood of DRC errors at the end.
:::

## Verification

Verification is not a single end-of-project gate — run these checks continuously.

1. **Run ERC before placement.** Fix schematic errors while they are still cheap.
2. **Run DRC frequently while routing**, not just once at the end, so violations stay local and
   easy to trace.
3. **Inspect unconnected items manually.** Don't assume the ratsnest is empty just because DRC
   is quiet — walk the unconnected-items list.
4. **Review the fabrication outputs and drill files.** Open the generated Gerbers and drill
   files in a viewer and confirm they match your intent.
5. **Check the impedance notes against the actual ordered stackup.** The impedance targets you
   designed to are only valid for the stackup you actually order — reconcile them.

:::note
Before generating the order, walk the pre-order checklist in
[Fabrication and Ordering](/docs/pcb-design/fabrication-and-ordering). Common schematic and
layout pitfalls are collected in [Common Mistakes](/docs/pcb-design/common-mistakes).
:::

## Mechanical & grounding

The carrier board has to survive a real enclosure, a coreboard, a heatsink, and external
cables. Treat mechanical and grounding as part of the design, not an afterthought.

1. **Connect connector shells and shields per the interface best practice.** Each interface
   (HDMI, USB3, SATA, etc.) has its own shield-grounding convention — follow it rather than
   tying everything together blindly.
2. **Add ground stitching vias around external high-speed connectors** to provide a tight return
   path and contain emissions at the board edge.
3. **Decide chassis ground vs. signal GND deliberately.** Choose where (and whether) they join,
   and make it an explicit design decision rather than an accident of the copper pour.
4. **Provide mounting holes and keepouts** for the coreboard, the heatsink, and the connectors,
   with the right clearances and no copper where mechanical hardware lands.
5. **Keep external features mechanically accessible:** antenna zones clear of nearby copper and
   metal, HDMI plugs, SATA cables, and USB connectors all reachable in the final assembly.

:::tip
Use KiCad's **3D viewer** with the coreboard, heatsink, and mating connectors loaded to confirm
clearances and accessibility before you finalize the board outline and mounting holes.
:::
