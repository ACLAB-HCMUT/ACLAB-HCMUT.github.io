---
sidebar_position: 3
title: 'Lab 2: Core-IoT Platform'
---

# Lab 2: Core-IoT Platform

## Overview

Core IoT (built on **ThingsBoard**) handles device management, data visualization and
real-time analytics. This lab connects an ESP32-S3 to the platform, publishes telemetry, and
builds an interactive dashboard.

## Learning outcomes

- Publish telemetry data and visualize it on ThingsBoard dashboards.
- Implement basic rule chains for event-driven automation.

## Requirements

- Create a PlatformIO project in VSCode and integrate the ESP32 board (you may clone the
  [ESP32 template](https://github.com/ACLAB-HCMUT/PlatformIO_Arduino-Framework_ESP32_Template)).
- Read temperature/humidity from DHT20 and display it on a CoreIOT template dashboard.
- Complete all tasks following the **RTOS** standard, and create a **scheduler**.

## Instructions

1. Install VSCode + the PlatformIO plugin; build the template and flash the ESP32-S3.
2. Connect DHT20 to the board via I²C; measure temperature/humidity every 5 s.
3. Create a dashboard in CoreIOT and display the data.
4. Implement a scheduler (see the ThingsBoard
   [Scheduler docs](https://thingsboard.io/docs/pe/user-guide/scheduler/)).

## Questions

- Which protocols can connect devices to ThingsBoard, and what are their advantages?
- What is the difference between shared attributes and client attributes, and when to use each?
