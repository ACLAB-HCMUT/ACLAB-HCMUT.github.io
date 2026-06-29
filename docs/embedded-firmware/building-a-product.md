---
sidebar_position: 5
title: Building a Product
---

# From Firmware to Product

Shipping a real embedded/IoT device is more than code — you specify the hardware the firmware
needs and assemble the right supporting chips around the MCU. This page covers **defining
hardware requirements** and a **catalog of the building blocks** that show up on almost every
board.

## Defining hardware requirements

Translate the product's job into concrete specs *before* choosing the [MCU](/docs/embedded-firmware/choosing-an-mcu):

| Requirement | What to estimate / specify |
| --- | --- |
| **Flash** | Code + assets + **OTA** (often dual-bank = ~2×) + ~20–30% headroom |
| **RAM** | Buffers + RTOS task stacks + network/TLS stack + heap + headroom |
| **Performance** | FPU/DSP if heavy math; core class for the workload |
| **Security** | Secure boot / key storage → add a **secure element** |
| **Connectivity** | Which buses & radios → pick the right transceivers/modules |
| **Storage** | Logs/config/data → external flash or EEPROM |
| **Power** | Source, budget, sleep currents, battery life |
| **Environment** | Temperature grade, sealing, ESD/surge protection |
| **Bring-up** | Debug header (SWD), test points, fiducials |

:::tip TLS and network stacks are RAM-hungry
A "small" connected feature (Wi-Fi + TLS) can need **tens of KB of RAM** for buffers and
certificates. Budget RAM for the *whole* stack, not just your application logic.
:::

## Common building blocks

What you typically place around the MCU, grouped by function.

### Power

- **LDO** (low-dropout linear regulator) — simple, low-noise, low current. *e.g. AMS1117, MCP1700.*
- **Buck / boost** (switching) — efficient, for higher current or big step-downs.
- **PMIC / battery charger / fuel gauge** — *e.g. TP4056 charger* for Li-ion products.
- **Protection** — TVS/ESD diodes, reverse-polarity protection, fuses.

### Clocking (crystals & oscillators)

- **Main crystal (HSE)** — accurate system clock, *e.g. 8–25 MHz*, needs correct load capacitors.
- **32.768 kHz crystal** — for the **RTC** / low-power timekeeping.
- **TCXO / oscillator module** — when you need high accuracy (e.g. radio, precise timing).
- **Internal RC** — convenient but imprecise.

:::caution Some peripherals require a real crystal
**USB, CAN and precise UART baud rates** generally need an external crystal — the internal RC
oscillator usually isn't accurate enough. Decide clocking early.
:::

### Memory & storage

- **SPI / QSPI NOR flash** — external code/data/OTA storage. *e.g. W25Q series.*
- **SDRAM / PSRAM** — external RAM for large buffers (displays, MPUs, ESP32 PSRAM).
- **EEPROM** — small non-volatile config. *e.g. 24Cxx (I²C).*
- **eMMC / NAND / SD card** — mass storage for logs and filesystems.

### Interface & signal-conversion chips

These bridge the MCU's logic-level pins to real-world buses and other voltage/isolation domains:

| Function | Common part | What it does |
| --- | --- | --- |
| **USB ↔ UART bridge** | CH340, CP2102, FT232 | Program/console over USB |
| **CAN transceiver** | TJA1050, SN65HVD230 | MCU CAN controller ↔ differential CAN bus |
| **RS-485 transceiver** | MAX485, THVD series | Differential, multidrop industrial bus |
| **RS-232 level shifter** | MAX232 | Legacy serial voltage levels |
| **Digital isolator** | **ADuM1201** (ADI) | Pass signals across isolated ground/safety domains |
| **Logic level shifter** | — | 3.3 V ↔ 5 V interfacing |
| **Ethernet PHY** | LAN8720 (+ RJ45 magnetics) | MAC ↔ physical Ethernet |

:::note Why isolation (e.g. ADuM1201)?
Isolators break ground loops and **protect the MCU side from high voltage or noisy domains** —
essential in industrial, medical and mains-connected designs. Some parts also carry isolated
power (e.g. ADuM5xxx family).
:::

### Connectivity / radio

- **Wi-Fi / BLE** — module or SoC (e.g. ESP32).
- **Cellular** — modem modules (e.g. SIMxx, Quectel) for LTE/NB-IoT.
- **LoRa** — long-range, low-power (e.g. SX127x).
- **GNSS** — positioning modules.

### Security

- **Secure element / crypto-auth IC** — *e.g. ATECC608, NXP SE050* — protected key storage,
  authentication, and secure-boot support, kept off the main MCU.

### Real-time clock & misc

- **RTC chip** (*e.g. DS3231*) + coin cell — keep time while powered off.
- **Sensors** — IMU, temperature/humidity, etc.
- **GPIO/port expanders** (I²C) when you run out of pins.

## A minimal IoT node — typical BOM shape

- MCU/SoC with Wi-Fi/BLE (e.g. ESP32) · **LDO** for the rail · **crystal** + load caps ·
  **USB-UART (CH340)** for programming · external **QSPI flash** · sensor(s) ·
  **TVS/ESD** protection · debug/test points.

:::tip Modules vs. discrete
Early on, **modules** (pre-certified Wi-Fi, cellular, etc.) save design and certification effort.
Move to discrete chips only when volume justifies the extra engineering. See
[PCB cost optimization](/docs/pcb-design/fabrication-and-ordering#cost-optimization).
:::

See also: [Choosing an MCU](/docs/embedded-firmware/choosing-an-mcu) ·
[Advanced Topics](/docs/embedded-firmware/advanced-topics) ·
[PCB Design](/docs/pcb-design).
