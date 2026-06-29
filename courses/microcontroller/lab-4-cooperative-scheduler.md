---
sidebar_position: 5
title: 'Lab 4: Cooperative Scheduler'
---

# Lab 4: Cooperative Scheduler

## Overview

A super loop makes it hard to run tasks at precise times. A cooperative scheduler — a single
timer ISR shared by many tasks — gives a simple, predictable, single-tasking architecture.
This lab implements one and runs several periodic tasks through it.

## Objectives

- Implement a cooperative scheduler to trigger activities at accurate intervals.
- Update the main loop to handle timer interrupts (e.g. a 10 ms tick).

## Architecture

- A task struct holds a function pointer, delay, period and a `RunMe` counter.
- **`SCH_Update`** runs in the timer ISR — it only counts down delays and flags due tasks.
- **`SCH_Dispatch_Tasks`** runs in the super loop — it actually executes flagged tasks.
  Splitting update and dispatch keeps timing reliable even when a task runs long.

```c
SCH_Init();
SCH_Add_Task(Led_Display, 0, 1000); // run every 1000 ticks
while (1) { SCH_Dispatch_Tasks(); }
```

## Required functions

- `void SCH_Update(void)` — called in the timer interrupt; updates remaining time per task.
- `void SCH_Dispatch_Tasks(void)` — runs the next due task.
- `uint32_t SCH_Add_Task(void (*pFunction)(), uint32_t DELAY, uint32_t PERIOD)` — returns a task ID.
- `uint8_t SCH_Delete_Task(uint32_t taskID)` — removes a task by ID.

Optional extras: error reporting, idle/sleep mode, and a watchdog (start it in init, refresh
it in `SCH_Update`).

## Problem

Run **5 tasks** periodically at 0.5 s, 1 s, 1.5 s, 2 s and 2.5 s. Avoid task overlap by
choosing sensible initial delays.

## Demonstration

Show a regular 10 ms tick, multiple concurrent timeouts, and callbacks printing timestamps.
Avoid: a single timeout only, out-of-order callbacks, O(n) work in `SCH_Update`, or interrupt
rates above 10 Hz.

## Submission

Demonstrate in the lab session and submit your source code on BKeL.
