---
sidebar_position: 2
title: UART
---

# UART

Asynchronous serial: two lines (**TX**, **RX**), no shared clock — both ends just agree on a
**baud rate**. The simplest and most universal link.

## Pros & cons

| Pros | Cons |
| --- | --- |
| Dead simple, on every MCU | Point-to-point only (2 devices) |
| Full-duplex (TX + RX) | No addressing, no multi-drop |
| Cheap (no extra parts on-board) | Both ends must agree on baud |
| Great for debug/logging | Single-ended → noise-prone over distance |
| | No built-in error handling/flow control |

## Use cases

- **Debug / log console** (the #1 use).
- Talking to **modules**: GPS, GSM/4G, Bluetooth, ESP-AT.
- **Bootloader** firmware upload.
- Short **board-to-board** links.

## Hardware requirements

- **Cross the lines:** TX → RX, RX → TX, and a **common ground**.
- **Match voltage levels** (3.3 V vs 5 V) — add a level shifter if they differ.
- Optional **RTS/CTS** hardware flow control for high rates / lossy receivers.
- For **distance or noise**, don't run raw UART — convert to **RS-232** (point-to-point) or
  **RS-485** (long/multi-drop) with a transceiver.

## Software requirements

- Configure **baud, data bits, parity, stop bits** identically on both ends (e.g. 115200-8-N-1).
- Use **interrupt or DMA** RX with a **ring buffer** — polling drops bytes.
- Define your own **framing** (length/delimiters/CRC) — UART gives you a byte stream, nothing more.

:::caution Top UART failures
Mismatched **baud**, a missing **common ground**, or a **3.3 V↔5 V** mismatch. Check these three
first when "garbage" comes out.
:::

## See also

- [Connectivity overview](/docs/embedded-firmware/connectivity) · [RS-485](/docs/embedded-firmware/connectivity/rs485)
- [Building a Product](/docs/embedded-firmware/building-a-product) — USB-UART bridges (CH340, CP2102)
