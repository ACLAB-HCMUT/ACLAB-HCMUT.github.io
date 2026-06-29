---
sidebar_position: 3
title: 'Lab 2: Timer Interrupt & LED Scanning'
---

# Lab 2: Timer Interrupt & LED Scanning

## Overview

Timers let us run code at precise intervals without blocking. This lab configures a 10 ms
Timer 2 interrupt and uses it to scan multiple 7-segment displays, build a digital clock, and
create a non-blocking **software timer**. An optional 8×8 LED matrix extends the idea.

## Objectives

- Configure a Timer 2 interrupt firing every 10 ms.
- Multiplex (scan) several 7-segment displays so they appear lit simultaneously.
- Replace blocking `HAL_Delay` with a software timer driven by the interrupt.

## Timer setup

With an 8 MHz clock, set **Prescaler = 7999** and **Counter Period = 9**:
8 MHz / (7999+1) = 1000 Hz, divided by 10 → 100 Hz → a **10 ms** interrupt. Enable the TIM2
global interrupt (NVIC), start it with `HAL_TIM_Base_Start_IT(&htim2)`, and put your periodic
code in the callback.

```c
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
  if (htim->Instance == TIM2) {
    // runs every 10 ms
  }
}
```

LEDs scanned faster than ~30 Hz appear continuously on; on Proteus a low rate (e.g. 1 Hz) is
used because the simulator can't run at full speed.

## Exercises

1. Display "1" and "2" on two 7-segments, switching every 0.5 s.
2. Extend to four 7-segments + two DOT LEDs (PA4); blink the DOT every second.
3. Implement `update7SEG(int index)` driven by a 4-element buffer.
4. Set the 4-digit scanning frequency to 1 Hz; keep the DOT blinking.
5. A digital clock (hour/minute) via `updateClockBuffer()`.
6. Create a **software timer** (`setTimer0`, `timer_run`, `timer0_flag`) to remove `HAL_Delay`.
7. Rewrite the clock from Ex. 5 using the software timer; move the DOT to `main`.
8. Move `update7SEG()` to `main`; the interrupt only services software timers.
9. (Extra) Add an 8×8 LED matrix (MATRIX-8X8-RED + ULN2803); show character "A".
10. Animate the matrix (e.g. scroll the character left).

## Report & Submission

Present the Proteus schematic and the relevant source (callback / `main`). For the software
timer, explain what happens for `setTimer0(1)`, `setTimer0(10)` and a missing initial call.
