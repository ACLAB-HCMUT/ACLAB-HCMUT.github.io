---
sidebar_position: 1
title: Components & Parts
---

# Components & Parts

A practical reference for the parts you place on almost every board — what they do, the values
you actually reach for, and the **common use cases** (e.g. "10 kΩ is usually a pull-up").

## The catalogue

| Part | What it does | Page |
| --- | --- | --- |
| **Resistors** | Limit current, set voltages, pull-ups/downs, terminate | [Resistors](/docs/pcb-design/components/resistors) |
| **Capacitors** | Decouple, filter, store, couple/block DC | [Capacitors](/docs/pcb-design/components/capacitors) |
| **Inductors & ferrites** | Energy storage (regulators), filtering | [Inductors & Ferrites](/docs/pcb-design/components/inductors-and-ferrites) |
| **Diodes & protection** | Rectify, clamp, protect (Schottky, Zener, TVS) | [Diodes & Protection](/docs/pcb-design/components/diodes-and-protection) |
| **Transistors & MOSFETs** | Switch and amplify; load switches, gate drive | [Transistors & MOSFETs](/docs/pcb-design/components/transistors-and-mosfets) |

## Reading values

- **Resistors/capacitors** come in **E-series** (E12/E24/E96) — you can't buy "any" value, you
  pick the nearest standard. 10 k, 4.7 k, 1 k, 100 nF, 10 µF are everyday staples.
- **Package size** (0402, 0603, 0805…) trades hand-solderability for density. **0603/0805** are
  the friendly default for lab work; **0402** for dense boards.
- Always check **voltage rating** (caps), **power rating** (resistors) and **tolerance**.

:::tip Build a house style
Pick a small set of go-to values and packages (e.g. 0603, 100 nF/10 µF caps, 10 k/4.7 k/1 k/0 Ω,
33 Ω) and reuse them. Fewer unique parts = cheaper BOM and faster assembly.
:::

## See also

- [Design by Circuit Block](/docs/pcb-design/circuit-blocks)
- [Applied Circuits & Practices](/docs/pcb-design/applied-circuits)
