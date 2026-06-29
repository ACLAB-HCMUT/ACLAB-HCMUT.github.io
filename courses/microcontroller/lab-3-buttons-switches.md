---
sidebar_position: 4
title: 'Lab 3: Buttons / Switches'
---

# Lab 3: Buttons / Switches

## Overview

Mechanical switches bounce, so reading them reliably needs pull-up resistors and software
debouncing. This lab reads a button, debounces it, and processes it with a finite state
machine (FSM). The final project is a 4-way traffic light with multiple configuration modes.

## Objectives

- Add new C source/header files to an STM32 project.
- Read a digital input on a timer interrupt and debounce it (e.g. N = 2 filtering).
- Design and implement an FSM in the MCU.

## Key ideas

- **Pull-up resistor:** with a button to GND, the pin reads 1 when released, 0 when pressed.
- **Debounce:** sample every N ms (10 to 50). Compare consecutive reads; only accept a state
  when readings agree — this filters bounces and noise.
- **Module split:** `input_reading` (driver → buffer) and `input_processing` (FSM → output).

```c
// 3-state FSM
enum ButtonState { BUTTON_RELEASED, BUTTON_PRESSED, BUTTON_PRESSED_MORE_THAN_1_SECOND };
```

## Final project

A crossroad traffic light with 12 LEDs (4 red / 4 amber / 4 green), four 7-segment displays
and three buttons, with at least 4 modes:

- **Mode 1 – Normal:** the traffic light runs normally.
- **Modes 2/3/4 – Modify:** change the red / amber / green durations (range 1–99). Button 1
  selects the mode, button 2 increases the value, button 3 sets it.

## Exercises

1. Sketch the FSM. 2. Draw the Proteus schematic. 3. Create the STM32 project (10 ms timer).
4. Make the timer period easy to change without affecting behavior. 5. Add button debouncing
and mode increment. 6. Display modes on 7-segments and blink LEDs per mode. 7–9. Increase the
red / amber / green durations with buttons 2 and 3. 10. Integrate, record a demo, write the
report.

## Report & Submission

Submit the FSM sketch, schematic, source code, a demo video and a report on BKeL.
