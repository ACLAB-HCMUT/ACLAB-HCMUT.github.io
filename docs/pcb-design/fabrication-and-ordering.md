---
sidebar_position: 4
title: From Design to Delivery
---

# From Design to Delivery

The full path from a finished layout to boards on your bench, using **JLCPCB** as a worked
example. Other fabs (PCBWay, OSH Park, Aisler…) follow the same flow with different UIs.

```
Design → DRC → Export files → Upload & review → Choose options → Order → Fabricate → Ship → Customs → You
```

## 1. Finalize & run DRC

Before exporting anything, run the tool's **Design Rule Check** with rules set to your fab's
capability sheet (see [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)).

- [ ] DRC clean against the **fab's** rules (not just defaults)
- [ ] Footprints verified vs datasheets
- [ ] Silkscreen, polarity marks, fiducials, test points present
- [ ] Board outline (edge cuts) closed and correct

## 2. Generate the manufacturing outputs

Fabs don't take your native project — they take standard output files. Typically you **zip**:

| File | Format | What it is |
| --- | --- | --- |
| **Gerbers** | RS-274X (`.gbr`) | Copper, solder mask, silkscreen, paste — one per layer |
| **Drill file** | Excellon (`.drl`) | Hole positions and sizes |
| **BOM** | `.csv` | Bill of materials (only if ordering assembly) |
| **Pick-and-place / CPL** | `.csv` | Part X/Y, rotation, side (only for assembly) |

:::tip KiCad → JLCPCB
KiCad exports Gerbers + drill from **File → Plot / Generate Drill Files**, or use the
**JLCPCB plugin** to produce the exact Gerber/BOM/CPL set in one click. Always **preview the
Gerbers in a viewer** before zipping — it's your last cheap check.
:::

## 3. Upload & review

- Upload the zip; the site renders it in an **online Gerber viewer**.
- Confirm layer alignment, board size, and that nothing is missing or mirrored.
- The system auto-detects layer count and dimensions — sanity-check them.

## 4. Choose fabrication options

The common knobs (JLCPCB defaults shown — other fabs are similar):

| Option | Typical default | Notes |
| --- | --- | --- |
| Base material | FR-4 | Standard fiberglass laminate |
| Layers | 2 | 1–6+ available; more layers cost more |
| Thickness | 1.6 mm | 0.6–2.0 mm options |
| **PCB color (solder mask)** | Green | Red, blue, black, white, yellow, purple… non-green may add a day |
| Surface finish | HASL (lead-free) | **ENIG** (gold, flat) costs more — better for fine-pitch/QFN |
| Copper weight | 1 oz | 2 oz for higher current |
| Via covering | Tented | Cover/plug options |
| Special | — | Castellated holes, gold fingers, impedance control (extra) |

:::note Color & finish are not just cosmetic
**ENIG** gives a flat, solderable gold surface — choose it for fine-pitch parts; **HASL** is
cheaper but slightly uneven. Dark solder masks (black) can make rework/inspection harder.
:::

## 5. Assembly (PCBA) — optional

:::note PCB vs. PCBA
- **PCB** = the **bare board** — copper, mask, silkscreen, holes. No parts on it.
- **PCBA** = **PCB + Assembly** — the board with components soldered on, ready to use.

You can order just the PCB and hand-solder, or order a full PCBA and get a populated board.
:::

If you don't want to hand-solder, fabs offer **SMT assembly**:

- Provide the **BOM** + **pick-and-place (CPL)** files.
- Parts come from the fab's library (JLCPCB uses **LCSC**). **Basic parts** are cheapest;
  **Extended parts** add a per-reel loading fee.
- You usually assemble one side (SMT); through-hole or both sides may cost more.

### PCBA risks to check before ordering

Assembly adds failure modes a bare PCB doesn't have — most are cheap to catch now, expensive after a run:

- **Wrong footprint** → part won't fit or won't solder. *Fix:* verify pad size/pitch vs the **datasheet**, not just a library symbol.
- **Wrong orientation / rotation** → the assembler places pin 1 the wrong way → dead or destroyed parts. *Fix:* check **polarity marks** (diodes, electrolytics, ICs) and confirm the **rotation in the CPL file** — the part's rotation in your library often differs from the fab's expectation (a classic JLCPCB gotcha; preview placement before confirming).
- **Low stock / out-of-stock parts** → the chosen part runs out before/at assembly → order delayed or partially populated. *Fix:* check **live stock** when picking parts; prefer **Basic/in-stock** parts; have an alternate part number ready.
- **End-of-life (EOL) / long lead-time parts** → fine for one prototype, risky for any repeat build. *Fix:* avoid EOL parts; note lead times for anything critical.
- **MOQ & extended-part fees** → small quantities can carry minimum-order and per-reel loading costs. *Fix:* factor these into the quote.

:::warning Lock your BOM to real, in-stock parts
A board designed around a part that's **out of stock** (or EOL) can stall the whole order.
Pick parts that show **healthy live stock**, prefer the fab's basic/preferred library, and keep
a backup part number for anything important.
:::

## 6. Place the order

- Set **quantity** (5 pcs is the common minimum for prototypes) and **build time**.
- Review the auto-quote (board + assembly + shipping).
- Pay; fabrication for a standard 2-layer board is often **~24–48 h**.

:::tip Approximate prototype cost
A standard 2-layer board (≤100×100 mm, green, 1.6 mm, HASL) is frequently a few US dollars for
5 pieces — **shipping usually costs more than the boards**. Prices and promos change; check the
live quote.
:::

## 7. Shipping

- Choose a courier (e.g. DHL/FedEx-type express, or cheaper economy/post).
- Express is days; economy can be weeks. You get a tracking number.
- Total time ≈ **fabrication + shipping** — plan around both.

## 8. Import / export & customs

:::caution General guidance only — verify for your country
The following is a rough, non-authoritative overview. Rules vary by country and change; confirm
with the carrier or local customs/import authority, and with your institution if ordering through it.
:::

- **Customs duties / import VAT/GST may apply** depending on your country and the declared value; some places exempt low-value parcels, others don't.
- The **courier often handles clearance** and may **collect duties/fees on delivery** — budget for this.
- **Customs inspection can add delays**; keep the commercial invoice and order details handy.
- Declared value, contents and **HS codes** are set on the shipping documents; under-declaring value is **potentially** a violation — avoid it.
- For ordinary hobby/research boards this is usually routine, but **sensitive or controlled designs** (certain RF, cryptographic, or defense-related hardware) **could potentially** fall under **export-control regulations** — check before sending designs abroad.
- If ordering for the lab/university, there may be **institutional procurement or import rules** — ask first.

## JLCPCB case study (typical prototype)

1. Finish layout in **KiCad**, run **DRC** against JLCPCB capabilities.
2. Export **Gerbers + drill** (or one-click via the JLCPCB plugin); zip them.
3. Upload to JLCPCB → check the **Gerber viewer**.
4. Options: **2-layer, FR-4, 1.6 mm, green, HASL lead-free, 1 oz, 5 pcs**.
5. (Optional) Add **SMT assembly** with BOM + CPL from LCSC parts.
6. Order → fabrication **~24–48 h** → ship by chosen courier → arrives after customs.

## Cost optimization

Most of the price is decided by a handful of choices. Pick the cheapest option that still meets
your reliability needs.

### What drives PCB price

| Driver | Effect on price | Cheaper choice |
| --- | --- | --- |
| **Layer count** | Biggest single jump (2 → 4 → 6) | Stay at **2 layers** if it routes |
| **Board area** | Bigger board = more | Shrink layout; stay within size brackets (e.g. ≤100×100 mm) |
| **Min trace/space & via/hole** | Tight rules push you into a pricier "advanced" tier | Keep **standard** (≥ 6 mil track, ≥ 0.3 mm via) |
| **Surface finish** | ENIG > HASL | **HASL** unless you need fine-pitch/QFN |
| **Solder mask color** | Non-green may add time/cost | **Green** |
| **Copper weight** | 2 oz > 1 oz | **1 oz** unless high current |
| **Thickness** | Non-standard costs more | **1.6 mm** |
| **Special features** | Via-in-pad, blind/buried vias, impedance control, castellated, gold fingers each add cost | Avoid unless required |
| **Build time** | Faster = more | Standard lead time |
| **Quantity** | Price breaks per board | Batch with labmates |

:::note Via size is a price tier, not just a rule
Asking for very small vias/holes or thin traces moves the whole board into the fab's
**advanced** process — more expensive and lower yield. Use standard via sizes unless the part
pitch genuinely forces smaller. See [Common Mistakes & Risks](/docs/pcb-design/common-mistakes).
:::

### What drives PCBA (assembly) price

- **One side vs two sides of SMT** → single-sided is cheaper → **put all SMT parts on one side**.
- **SMT vs through-hole** → THT usually means extra hand-soldering cost → prefer SMT parts.
- **Unique part count & total placements** → fewer unique parts = less setup.
- **Basic vs Extended parts** (JLCPCB) → **Extended** parts add a per-type loading fee; **Basic** parts don't → prefer Basic/preferred parts.
- **Stencil & setup fees** → fixed costs that amortize over larger quantities.

:::tip Quick wins
- Stay at **2 layers** + standard design rules whenever routing allows.
- Keep **all SMT components on one side** of the board.
- Prefer **Basic / in-stock** parts; minimize unique part numbers.
- **Green mask + HASL + 1.6 mm + 1 oz** is the cheapest standard stack.
- Not urgent? Pick **economy shipping** and standard build time.
- **Batch orders** with labmates to clear minimums and split shipping.
:::

:::caution Don't optimize past reliability
Cheaper isn't always better. Choose **ENIG** for fine-pitch/QFN, **2 oz** copper for power, or
**4 layers** when signal integrity needs a solid reference plane. A few extra dollars here
prevents a respin — which is the real cost.
:::

## References

- [KiCad documentation](https://docs.kicad.org/) — plotting Gerbers and drill files.
- Fab capability & ordering guides — e.g. **JLCPCB**, **PCBWay**, **OSH Park**.
- See also: [PCB Design Software (EDA Tools)](/docs/pcb-design/eda-tools) · [Common Mistakes & Risks](/docs/pcb-design/common-mistakes).
