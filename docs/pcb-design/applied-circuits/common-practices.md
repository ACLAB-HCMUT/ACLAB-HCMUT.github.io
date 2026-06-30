---
sidebar_position: 2
title: Common Practices
---

# Common Practices

The small, repeated patterns that separate a board that works from one that "should work." Most
are cheap insurance — do them by default.

## Always do these

- **Decouple every IC** — 100 nF per power pin at the pin, plus bulk per rail. See
  [Capacitors](/docs/pcb-design/components/capacitors).
- **Pull-ups / pull-downs** where a line can float:
  - **I²C** SDA/SCL → 2.2–4.7 kΩ pull-ups (open-drain bus needs them).
  - **Reset, boot/strap, enable** pins → 10 kΩ to their required level.
  - **Buttons** → pull to a defined state; debounce in HW or SW.
- **Unused pins** — don't leave inputs floating (tie or configure); leave unused outputs per the
  datasheet.
- **Series resistors** — 22–33 Ω on USB / fast lines (termination); a resistor in series with a
  crystal/LED where specified.
- **Gate pull-down** on every MOSFET so it's off at power-on.

## Always include

- **Programming/debug header** (SWD/JTAG/UART) — exposed and labelled.
- **Test points** on key nets (power rails, important signals) for bring-up.
- **Power/activity LED** (with series resistor) — instant "is it alive?" feedback.
- **Mounting holes**, fiducials (for assembly), and clear **silkscreen** (refdes, pin 1, polarity).

## Protect the outside world boundary

- **TVS/ESD** on every connector/exposed pin; **reverse-polarity** protection on power input.
  See [Power Management](/docs/pcb-design/applied-circuits/power-management).

:::tip Make a personal checklist
Keep a pre-order checklist of these items. Most "dead board" bring-up problems are one of them
missing — not a design flaw.
:::

## See also

- [Resistors](/docs/pcb-design/components/resistors) — pull/series value cheat-sheet
- [MCU & Digital Circuits](/docs/pcb-design/circuit-blocks/mcu-and-digital)
- [Common Mistakes & Risks](/docs/pcb-design/common-mistakes)
