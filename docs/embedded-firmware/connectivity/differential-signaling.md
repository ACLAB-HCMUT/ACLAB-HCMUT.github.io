---
sidebar_position: 6
title: Differential Signaling & EMI/EMC
---

# Differential Signaling & EMI/EMC

Most robust/fast links (CAN, RS-485, USB, Ethernet, LVDS, HDMI, MIPI) are **differential**. This
page explains why, and how it ties into **EMI/EMC** — what causes electromagnetic noise and how
differential signaling fights it.

## Single-ended vs differential

- **Single-ended** (UART, I²C, SPI, plain GPIO): one wire carries the signal, measured against a
  shared **ground**. Simple, but any noise or ground shift rides straight into the reading.
- **Differential**: two wires carry **equal and opposite** signals; the receiver reads the
  **difference** between them. Noise that hits both wires equally (**common-mode**) cancels out.

## Pros & cons

| Pros | Cons |
| --- | --- |
| **Common-mode noise rejection** → high immunity | Two wires/pins instead of one |
| **Lower emissions** (the pair's fields cancel) | Needs **matched** routing (length + impedance) |
| Tolerates **ground-potential differences** | Needs transceivers |
| Faster / longer reach | More PCB care (pairs, planes) |

## How it helps EMC (both directions)

- **Emissions:** equal-and-opposite currents create fields that **cancel**, so a tight pair
  radiates far less than a single-ended trace + its return loop.
- **Immunity:** external interference couples onto **both** lines about equally; the receiver
  subtracts it away (**common-mode rejection**).

You only get these benefits if the pair is **tightly coupled and balanced** — route as a pair,
**length-matched**, **controlled impedance** (90/100 Ω), over a **continuous reference plane**. A
**common-mode choke** removes residual common-mode noise on cables.

## Sources of EMI (what generates the noise)

- **Switching regulators** — fast switching nodes and their current loops.
- **Fast digital edges & clocks** — sharp edges carry lots of high-frequency energy.
- **Large current loops** — act as loop antennas (a [return-path](/docs/pcb-design/fundamentals/return-paths-and-grounding) problem).
- **Inductive loads** — motors, relays, solenoids (switching spikes).
- **ESD** and external surges.
- **Cables** — long traces/cables behave as antennas; ground bounce drives them.

## Effects of EMI (why you care)

- Corrupted bits / CRC errors, unexplained **resets**, noisy **ADC** readings, and **failed EMC
  compliance** (a product can't ship until it passes).

## Mitigation summary

- Prefer **differential** for anything off-board or noisy (CAN, RS-485, USB, Ethernet).
- Shrink current loops; keep **solid reference planes**; never cross a plane split.
- Slow unneeded edges; keep switching-regulator loops tight.
- **Filter and protect** cables/connectors: common-mode chokes, ferrites, TVS/ESD.

:::tip This is the firmware ↔ PCB bridge
Choosing a differential bus is a *firmware/system* decision; **realising its EMC benefit** is a
*PCB layout* job. See [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc) and
[High-Speed Digital Signals](/docs/pcb-design/circuit-blocks/high-speed).
:::

## See also

- [CAN](/docs/embedded-firmware/connectivity/can) · [RS-485](/docs/embedded-firmware/connectivity/rs485)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc) · [Return Paths & Grounding](/docs/pcb-design/fundamentals/return-paths-and-grounding)
