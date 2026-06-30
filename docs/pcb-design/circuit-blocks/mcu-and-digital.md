---
sidebar_position: 2
title: MCU & Digital Circuits
---

# MCU & Digital Circuits

The digital core: a microcontroller (or SoC), its support circuitry, and logic/memory. Most of
the work is **getting the support circuits right** so the chip boots reliably and runs clean.

## The blocks around every MCU

- **Power pins + decoupling** — clean, well-bypassed supply.
- **Clock** — internal RC, or an external crystal/oscillator.
- **Reset** — defined power-on reset.
- **Boot / strap pins** — select boot mode; must not float.
- **Programming / debug** — SWD, JTAG or UART header.
- **GPIO / peripherals** — to the rest of the board.

## Decoupling (the #1 rule)

- One **100 nF** ceramic per power pin, placed **right at the pin**, with a short via to the
  ground plane.
- Add **bulk capacitance** (1–10 µF) per supply rail near the chip.
- Short, fat power traces or a power plane — never daisy-chain decoupling caps.

## Clock / crystal

- Keep crystal traces **short and symmetric**; put load capacitors close.
- Surround with a **ground guard** and keep noisy/high-speed signals away.
- A solid ground under the crystal area; no traces routed through it.

## Reset & boot straps

- Use the recommended RC reset (or a supervisor IC) — don't leave RESET floating.
- Pull **boot/strap pins** to their required level with resistors. A floating strap = random
  boot mode.

## Programming / debug header

- Always bring out **SWD/JTAG** (or UART bootloader) on a labelled header — you'll need it for
  bring-up and field updates.
- Include power and ground on the header; add a few test points for key signals.

## Layout checklist

- [ ] 100 nF at every power pin, bulk cap per rail
- [ ] Crystal close, guarded, over solid ground
- [ ] Reset defined; all strap pins pulled
- [ ] Debug header exposed and labelled
- [ ] 3.3 V vs 5 V logic levels checked across every interface

:::caution Common failure
A board that "won't boot" is usually a **floating boot/strap pin** or **missing decoupling** —
not a dead chip. Check these first.
:::

## See also

- [Power Supplies](/docs/pcb-design/circuit-blocks/power-supply) — feeding the MCU
- [Choosing an MCU](/docs/embedded-firmware/choosing-an-mcu)
- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
