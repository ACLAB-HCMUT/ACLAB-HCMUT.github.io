---
sidebar_position: 4
title: Advanced Topics
---

# Advanced Firmware Topics

The deeper skills that separate "it blinks" from "it ships": understanding memory, working at the
register level, and debugging methodically. Go here once you're past the basics in
[Firmware Approaches](/docs/embedded-firmware/firmware-approaches).

## The memory model

An MCU program lives in a fixed memory map you must understand:

| Region | Lives in | Holds |
| --- | --- | --- |
| `.text` / `.rodata` | **Flash** | Code and constants |
| `.data` | RAM (copied from Flash at boot) | Initialized globals |
| `.bss` | RAM (zeroed at boot) | Uninitialized globals |
| **Heap** | RAM (grows up) | `malloc`/`new` allocations |
| **Stack** | RAM (grows down) | Locals, call frames, ISR context |

- The **linker script** defines these regions; the **map file** shows exactly how much you used.
- **Flash/RAM "region overflowed"** is a *link-time* error — too much code or static data.
- **Heap and stack growing into each other** is a *runtime* crash — far nastier, see below.

## Memory management

- **Prefer static / fixed pools** over `malloc`/`free`. Dynamic allocation in a long-running
  device causes **fragmentation** and non-deterministic timing.
- **Size with headroom** — leave ~20–30% Flash and RAM free for growth, OTA, and stacks.
- **`const` data stays in Flash** — don't waste RAM on read-only tables.
- **DMA buffers** need correct **alignment** and, on cached cores (Cortex-M7), **cache
  maintenance** or coherency bugs appear intermittently.
- Use the **MPU** (Memory Protection Unit) to trap stray writes and guard stacks.

## Common memory bugs

| Bug | Cause | Symptom | Mitigation |
| --- | --- | --- | --- |
| **Stack overflow** | Deep recursion, big locals, nested ISRs, undersized RTOS task stack | Random corruption, HardFault | Stack painting / high-water mark, MPU guard, size stacks |
| **Heap fragmentation** | Repeated `malloc`/`free` of mixed sizes | `malloc` fails over time | Avoid dynamic alloc; use memory pools |
| **Buffer overflow / out-of-bounds** | Writing past an array | Corruption, security hole | Bounds checks, safe string fns, static analysis |
| **Memory leak** | Allocations never freed | Slow RAM exhaustion | Track ownership; pools; leak checks |
| **Use-after-free / dangling pointer** | Using freed/expired memory | Sporadic crashes | Null after free; avoid raw lifetimes |
| **Uninitialized read** | Using memory before set | Heisenbugs | Initialize; compiler warnings |

:::danger Stack overflow is the silent killer
It rarely crashes where it happens — it corrupts whatever is next in RAM, so the bug surfaces
elsewhere. **Enable stack-overflow checking** (RTOS hook, MPU guard, or stack painting) and
check each task's **high-water mark** before shipping.
:::

## Working at the register level

- Peripherals are **memory-mapped registers**; access them via **CMSIS** definitions, not magic
  addresses.
- Declare hardware registers **`volatile`** so the compiler doesn't optimize away reads/writes.
- Use **read-modify-write** carefully — a naïve RMW on a shared register can race with an ISR;
  guard with atomics or critical sections.
- Your source of truth is the **reference manual + datasheet** — and always read the **errata**.

## Debugging methods

Match the tool to the question (see also [Programmers & Debuggers](/docs/equipment/tools/programmers-debuggers)
and [Measurement Instruments](/docs/equipment/tools/measurement-instruments)):

| Method | Tool | Best for |
| --- | --- | --- |
| **On-chip debug (SWD/JTAG)** | ST-Link / J-Link + IDE | Breakpoints, watchpoints, single-step, inspect memory/registers |
| **`printf` logging** | UART + serial console | Quick traces (but timing-intrusive) |
| **SEGGER RTT** | J-Link | High-speed logging with almost no timing impact |
| **Logic analyzer / scope** | — | Bus decode (I²C/SPI/UART), real timing, glitches |
| **Fault handler decode** | Debugger | Find *where* a HardFault came from |
| **Static analysis** | cppcheck, clang-tidy, MISRA | Catch bugs before running |
| **Map file + stack high-water** | Toolchain / RTOS | Memory budgeting |

:::tip Decode the HardFault, don't guess
When a Cortex-M faults, the cause is in the fault status registers (CFSR/HFSR) and the **stacked
registers** hold the PC at the moment of failure. A minimal fault handler that prints these turns
"it just resets" into an exact line of code.
:::

## Reliability practices

- **Watchdog timer** — recover from hangs into a safe state.
- **Brown-out detection** — defined behavior on sag (see [decoupling](/docs/pcb-design/common-mistakes)).
- **CRC / integrity checks** on stored data and firmware images.
- **OTA with rollback** — never ship an update path that can brick the device.
- **Assertions + defined safe states** for out-of-range conditions.

See also: [Building a Product](/docs/embedded-firmware/building-a-product).
