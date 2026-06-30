---
sidebar_position: 4
title: Intel x86 Carrier Board — Peripherals & Audio
---

# Intel x86 Carrier Board — Peripherals & Audio

This page covers the **low-speed and analog peripherals** on the carrier board: audio, LAN, the BIOS SPI flash, and the management/control buses (SMBus/I2C, UART, GPIO/FAN/EC, LPC).

:::note
This is part of the Intel x86 carrier board project. Start at the [overview](/docs/pcb-design/projects/intel-x86-carrier-overview) for the system architecture and design priorities. For the product-level view, see [building a product](/docs/embedded-firmware/building-a-product).
:::

:::tip
Most of these interfaces are "easy" to route but easy to get **wrong** in detail (pull-ups, straps, bias networks). Skim the [common mistakes](/docs/pcb-design/common-mistakes) page before committing.
:::

## Audio — Realtek ALC662 + TRRS jack

The audio path is a **Realtek ALC662** HD Audio codec driving a single **3.5mm TRRS combo jack** (headphone + headset mic in one connector).

Target features:

- **Stereo headphone out**
- **Mic in** (headset microphone)
- **Jack detect** where the jack + codec topology supports it

### Analog design rules

- **Isolate the analog audio region** from switching power and high-speed interfaces.
- Provide a **continuous, clean analog ground** per the codec reference design — do not chop it up with digital returns.
- Place **decoupling caps close to the codec supply pins**.
- Keep **headphone and mic traces short**.
- Do **not** route audio traces beneath **PCIe / HDMI / USB** differential pairs.

### Microphone

:::caution
A typical headset mic is **mono**. Do **not** blindly short MIC L and MIC R together.
:::

- Use the codec's **recommended single-channel mic topology** plus its **bias network**.
- Verify the **MIC1 / VREFO** pins and the required caps against the ALC662 datasheet.

### Jack detect

- Uses **Sense A / Sense B** pins.
- Use jack detect **only if** the chosen jack and the codec detection topology support it.
- For reliable laptop-like detection, **follow the ALC662 reference design** exactly.

### Output

- Use the **recommended coupling / RC / pop-suppression network** on the headphone output.
- Respect the codec reference design for **headphone output cap and resistor values**.

### Connector

:::caution
Confirm **CTIA vs OMTP** pinout. **CTIA** is generally preferred for modern headsets — picking the wrong standard swaps MIC and GND on the sleeve/ring.
:::

### Layout summary

- Place the codec **near the jack** but **away from power inductors**.
- Add **ESD protection at the external jack** if needed.
- Keep **noisy digital returns separated** from the analog region.

## LAN (Ethernet)

- **Magnetics are required** between the Ethernet PHY and the RJ45.
- Identify whether the magnetics are **integrated in the RJ45** ("magjack") or **external** — this changes the BOM and the layout.
- Use the correct **common-mode choke / transformer topology** from the PHY reference design.

Layout:

- Route the **MDI pairs differential and symmetric**.
- Maintain the **Ethernet isolation-barrier** rules (keep the chassis-side and system-side grounds separated by the barrier).
- Decide on a **deliberate chassis / shield grounding strategy** — don't leave it accidental.

## SPI BIOS

The SPI BIOS is the **firmware / BIOS flash interface** — the board boots from it.

- Keep **SPI routing short**.
- Follow the **required pull-ups**, **write-protect**, and **hold / reset** configuration.
- Do **not** leave **BIOS-related strap pins floating**.
- Consider adding an **external programming / debug header** if practical (lets you reflash without unsoldering the chip).

## SMBus / I2C, UART, GPIO / FAN / EC, LPC

| Bus | Typical use | Key watch-outs |
| --- | --- | --- |
| **SMBus / I2C** | Battery/charger-like peripherals, sensors, EEPROM, management devices | Correct **pull-up voltage & values**; avoid excessive **bus capacitance** |
| **UART** | Debug console, EC comms, peripheral comms | Expose on a **debug header** with GND and clear **TX / RX** labels |
| **GPIO / FAN / EC** | Fan control / tachometer, EC functions, general features | Confirm fan **PWM open-drain vs push-pull**; match pull-up voltage; protect **tach input** |
| **LPC** | EC / legacy / debug bus | May stay **unconnected**; verify no **boot straps** are tied to LPC pins |

### SMBus / I2C

- For battery/charger-like peripherals, sensors, EEPROM, and management devices.
- Use the **correct pull-up voltage and values** for the bus domain.
- Avoid **excessive bus capacitance** (too many devices / long traces slow the edges).

### UART

- For the **debug console**, **EC communication**, and **peripheral communication**.
- Recommend **exposing UART on a debug header** with **GND** and **clearly labeled TX / RX**.

### GPIO / FAN / EC

- For **fan control / tachometer**, **EC functions**, and general features.
- Fan specifics:
  - Confirm whether **PWM** is **open-drain vs push-pull**.
  - Match the **pull-up voltage** to the fan / controller.
  - **Protect the tach input** if the cable leaves the board.

### LPC

:::note
**LPC can stay unconnected** if no EC, legacy device, or debug tool needs it. Before doing so, **verify that required boot straps / pull resistors are not tied to LPC pins** — disconnecting them could change boot behavior.
:::
