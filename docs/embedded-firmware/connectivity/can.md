---
sidebar_position: 4
title: CAN bus
---

# CAN bus

**Controller Area Network** — a robust, differential, multi-master bus designed for noisy
automotive/industrial environments. Devices broadcast **messages** (by ID, not address) and
hardware **arbitration** decides priority.

## Pros & cons

| Pros | Cons |
| --- | --- |
| Very **noise-immune** (differential, twisted pair) | Needs a controller **and** a transceiver |
| **Multi-master**, no single point of control | Modest raw rate (1 Mbps classic; CAN-FD faster) |
| Prioritised **arbitration** (no collisions lost) | Requires correct **termination** |
| Strong **error detection** + auto-retransmit | More software setup than UART/I²C |
| Good over **tens of metres** | |

## Use cases

- **Automotive** (its origin), **robotics**, **industrial automation**, motor controllers,
  distributed sensor/actuator networks where reliability matters.

## Hardware requirements

- A **CAN controller** (built into many MCUs) **+ a CAN transceiver** (e.g. TJA1050, MCP2551).
- **Twisted pair** CANH/CANL with **120 Ω termination at both ends** of the bus.
- Common ground reference; **galvanic isolation** for long runs or different ground potentials.

## Software requirements

- Configure **bit timing** (sample point) — must match across all nodes.
- Set up **message IDs**, **acceptance filters/masks**, and TX/RX mailboxes.
- Handle errors and **bus-off recovery**.
- Optionally a higher-layer protocol: **CANopen**, **J1939**.

:::caution Top CAN failures
**Termination** wrong/missing (one 120 Ω at each end — not more), **bit-timing mismatch** between
nodes, or **no transceiver**. A ground offset between far nodes also corrupts data — isolate.
:::

## See also

- [Differential Signaling](/docs/embedded-firmware/connectivity/differential-signaling)
- [RS-485](/docs/embedded-firmware/connectivity/rs485)
- [Building a Product](/docs/embedded-firmware/building-a-product) — CAN transceivers
