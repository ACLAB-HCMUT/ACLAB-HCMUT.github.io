---
sidebar_position: 4
title: 'Lab 3: OTA Firmware Update'
---

# Lab 3: OTA Firmware Update

## Overview

Over-the-Air (OTA) updates let you upgrade device firmware remotely — no physical access
needed — which is essential for maintaining deployed IoT fleets. This lab adds OTA to the
temperature/humidity monitor from the previous labs.

## Requirements

Design and implement an OTA update system for an IoT device on the Core-IoT platform, using an
ESP32 / ESP32-S3 and a DHT20 / DHT11 sensor.

## Approach

1. Set up the ESP32 with firmware that reads sensor data and sends it to an IoT dashboard.
2. Implement an OTA update mechanism over **HTTP** or **MQTT**; deploy an update server and
   host a new firmware version.
3. Trigger the update remotely and verify the new firmware runs correctly.

## Test plan

- **Firmware upload test:** upload a new version to the server and trigger an OTA update.
- **Data integrity check:** verify temperature/humidity keep streaming correctly after update.

## Security (design only)

Write down your solutions (no implementation required): firmware signing and validation before
installation, and authentication to prevent unauthorized updates.

## Questions

- What security measures prevent unauthorized OTA updates?
- How does your mechanism handle network interruptions?
- How do you verify the integrity of new firmware before applying it?
