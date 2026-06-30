---
sidebar_position: 2
title: 3D Printing
---

# 3D Printing

Turn a CAD model into a physical part — enclosures, jigs, brackets, robot parts.

## Printer types

| Type | How it works | Strengths | Trade-offs |
| --- | --- | --- | --- |
| **FDM** (filament) | Melts and extrudes plastic layer by layer | Cheap, easy, big parts, tough materials | Visible layers, less fine detail |
| **Resin (SLA/MSLA)** | Cures liquid resin with UV/light | Very fine detail, smooth | Messy, smelly, needs wash + UV cure, brittle |

## Common materials (FDM)

- **PLA** — easiest, rigid, low-temp; great for prototypes.
- **PETG** — tougher, more heat/chemical resistant.
- **ABS / ASA** — durable, heat-resistant; needs an enclosure (warps, fumes).
- **TPU** — flexible parts.
- Engineering filaments (nylon, carbon-fiber-filled) for functional parts.

## Workflow

1. Model in CAD → export **STL/STEP**.
2. **Slice** (Cura, PrusaSlicer, etc.) → set layer height, infill, supports → export G-code.
3. Print → remove supports → (resin: wash + UV cure).

:::caution Ventilation & handling
ABS/resin emit fumes — use ventilation. **Uncured resin is toxic/irritant** — wear gloves and
eye protection and dispose of it properly.
:::

:::tip Design for printing
Mind overhangs (>45° need supports), wall thickness, tolerances for fits, and print orientation
for strength. A reprint is cheaper than a redesign — iterate.
:::
