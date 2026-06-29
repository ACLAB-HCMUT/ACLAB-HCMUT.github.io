---
sidebar_position: 2
title: 'Lab 1: LED Animations'
---

# Lab 1: LED Animations

## Overview

The first lab introduces the full toolchain: create an STM32Cube project, simulate it in
Proteus, and drive LEDs from the STM32F103C6. You start from a single blinking LED and build
up to traffic lights, a 7-segment display and a 12-LED analog clock.

## Objectives

- Create and configure an STM32Cube project; generate code and export a `.hex`.
- Build and run a Proteus simulation with the STM32F103C6.
- Control GPIO outputs: `HAL_GPIO_TogglePin` / `HAL_GPIO_WritePin`, `HAL_Delay`.

## Hardware & Tools

- STM32F103C6, LED-RED / LED-YELLOW / LED-GREEN, `7SEG-COM-ANODE`, resistors.
- PA5 is wired to the on-board LED; for the 7-segment, segments connect to PB0–PB6
  (active-low: a segment turns on when the pin is logic 0).

```c
while (1) {
  HAL_GPIO_TogglePin(LED_RED_GPIO_Port, LED_RED_Pin);
  HAL_Delay(1000); // blink every 1s
}
```

## Exercises

1. Two LEDs (PA5/PA6) toggling every 2 s.
2. A single-direction traffic light (red 5 s, yellow 2 s, green 3 s).
3. A 4-way traffic light with 12 LEDs.
4. `display7SEG(int num)` — show digits 0–9 on one 7-segment.
5. Integrate the 7-segment as a countdown for the 4-way traffic light.
6. A new schematic with 12 LEDs arranged as an analog clock (PA4–PA15).
7. `clearAllClock()` — turn off all 12 clock LEDs.
8. `setNumberOnClock(int num)` — light the LED for position 0–11.
9. `clearNumberOnClock(int num)` — turn off the LED for position 0–11.
10. Integrate everything: show hour/minute/second with 3 lit LEDs.

## Report & Submission

For each exercise, capture the Proteus schematic and present your source code (the `while`
loop and any helper functions). Submit on BKeL.
