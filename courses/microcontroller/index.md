---
sidebar_position: 1
slug: /microcontroller
title: Microcontrollers
---

# Microcontrollers

A hands-on course on programming ARM microcontrollers with **STM32CubeIDE** and circuit
simulation in **Proteus**, using the **STM32F103C6** as the target device. Through a series of
labs, students build LED animations, timer-driven displays, debounced button interfaces and a
cooperative scheduler.

## Tools

- **STM32CubeIDE** — peripheral configuration, code generation, compile & debug (HAL, C).
- **Proteus** — schematic capture and simulation; load the generated `.hex` into the STM32.
- Target MCU: **STM32F103C6** (ARM Cortex-M3).

## Workflow

1. Create an STM32Cube project, configure pins/clock/peripherals, generate code.
2. Write your application code inside the `USER CODE` blocks so it survives regeneration.
3. Build and export the **Intel `.hex`** file (C/C++ Build → Settings → MCU Post build outputs).
4. In Proteus, set the MCU's **Program File** to the `.hex` and run the simulation.

## Labs

| Lab | Topic |
| --- | --- |
| [Lab 1](/courses/microcontroller/lab-1-led-animations) | LED Animations |
| [Lab 2](/courses/microcontroller/lab-2-timer-led-scanning) | Timer Interrupt & LED Scanning |
| [Lab 3](/courses/microcontroller/lab-3-buttons-switches) | Buttons / Switches |
| [Lab 4](/courses/microcontroller/lab-4-cooperative-scheduler) | Cooperative Scheduler |

## Submission

Demonstrate your work in the lab session and submit source code (and report) on **BKeL**.
