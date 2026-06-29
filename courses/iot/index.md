---
sidebar_position: 1
slug: /iot
title: Internet of Things
---

# Internet of Things (IoT)

A hands-on IoT lab course: read sensors on an **ESP32 / ESP32-S3**, send telemetry to the
**CoreIOT (ThingsBoard)** platform, visualize it on dashboards, and update firmware
over-the-air (OTA). Projects are built with **PlatformIO** in VSCode and follow RTOS practice.

## Hardware & Tools

- **ESP32 / ESP32-S3** development board.
- **DHT20 / DHT11** temperature & humidity sensors (DHT20 via I²C), connectors.
- **PlatformIO** (VSCode) — build & flash. Template:
  [PlatformIO_Arduino-Framework_ESP32_Template](https://github.com/ACLAB-HCMUT/PlatformIO_Arduino-Framework_ESP32_Template).
- **CoreIOT / ThingsBoard** — device management, dashboards, rule chains.

## Labs

| Lab | Topic |
| --- | --- |
| [Lab 1](/courses/iot/lab-1-temp-humidity) | Temperature & Humidity Sensors |
| [Lab 2](/courses/iot/lab-2-core-iot-platform) | Core-IoT Platform |
| [Lab 3](/courses/iot/lab-3-ota-firmware-update) | OTA Firmware Update |

## Getting started

Run a "Hello World" example to verify the board, then a DHT20 example to confirm the sensor
works (print readings to the serial monitor) before building the full solution.
