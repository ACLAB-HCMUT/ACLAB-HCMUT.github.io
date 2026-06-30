---
sidebar_position: 5
title: Diodes & Protection
---

# Diodes & Protection

Diodes pass current one way. That simple property powers rectification, clamping and a whole
family of **protection** parts.

## Diode types

| Type | Key trait | Typical use |
| --- | --- | --- |
| **Standard / rectifier** | One-way conduction | Rectify AC, blocking |
| **Schottky** | Low forward drop, fast | Freewheel, OR-ing, reverse protection, buck |
| **Zener** | Conducts in reverse at Vz | Voltage clamp / crude reference |
| **TVS** | Fast, high-energy clamp | **Transient/ESD protection** |
| **LED** | Emits light | Indicators (with series R) |

## TVS diodes (transient protection)

- A **TVS** clamps a voltage spike (ESD, surge, inductive kick) by conducting hard above its
  breakdown, protecting downstream parts.
- Put one on **every externally exposed line**: USB, power input, buttons, connectors.
- Choose **working voltage** above the normal signal, **clamping voltage** below what the
  protected part survives; place it **right at the connector** with a short ground path.

## Flyback / freewheel diode

- Across an **inductive load** (relay, motor, solenoid), a diode gives the collapsing current a
  path — without it the back-EMF spikes and kills the driver.

## Other protection parts

- **Reverse-polarity:** series Schottky (simple) or a P-FET (low loss).
- **Overcurrent:** fuse, **PTC resettable fuse**, or an **eFuse** IC.
- **Overvoltage:** Zener/TVS clamp, or an active OVP.

:::tip Protect at the boundary
ESD and surges enter through **connectors**. Concentrate TVS/ESD parts and filtering at the
board's edge/connectors, with the shortest possible path to ground.
:::

## See also

- [Power Management](/docs/pcb-design/applied-circuits/power-management) — reverse/over-current/arbiter
- [Power Electronics & High-Current](/docs/pcb-design/circuit-blocks/power-electronics)
