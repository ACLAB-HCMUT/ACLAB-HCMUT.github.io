---
slug: /iot-applications
sidebar_position: 1
title: IoT Applications
---

# IoT Applications

The Internet of Things (IoT) connects physical **sensors and actuators** to networks and
software, so we can **monitor and control the real world** remotely and automatically. This
section maps the common application domains and the patterns behind them. For hands-on basics,
see the [IoT course](/courses/iot).

## The IoT pattern

Almost every IoT system follows the same chain — recognize it and any application becomes familiar:

```
Sense → Connect → Process → Act / Visualize
```

| Stage | What it does | Typical tech |
| --- | --- | --- |
| **Sense** | Read the physical world | Sensors + MCU / edge device (ESP32, STM32) |
| **Connect** | Move data to the platform | Wi-Fi, BLE, **LoRa/LoRaWAN**, NB-IoT/LTE-M, cellular, Zigbee |
| **Process** | Filter, store, analyze | Edge processing + cloud platform (e.g. CoreIOT/ThingsBoard) |
| **Act / Visualize** | Close the loop or inform people | Actuators, alerts, dashboards, **maps (GIS)** |

→ The hardware that makes this possible is covered in [Building a Product](/docs/embedded-firmware/building-a-product).

## Cross-cutting capabilities

These appear across *every* domain below:

### Data collection & mapping (GIS)

- **Geotag** each reading and plot sensors on a map; build **heatmaps** and track moving assets.
- Combine many nodes into a single live picture of an area (site, farm, city).

### Automatic control

- **Closed-loop:** sensor → rule/AI decision → actuator (e.g. soil-moisture → irrigation valve).
- **Remote control & scheduling**, with safety interlocks and manual override.

### Edge AI

- On-device inference (anomaly detection, vision, sound classification) cuts bandwidth and
  latency — see [AI / Edge AI](/docs/ai-edge).

## Application domains

| Domain | Examples |
| --- | --- |
| [**Environmental Monitoring**](/docs/iot-applications/environmental-monitoring) | Construction sites, workplaces, agriculture, aquaculture, wildlife |
| [**Smart Infrastructure & Logistics**](/docs/iot-applications/smart-infrastructure) | Street lighting, warehouses, buildings/cities |
| [**IoT Solutions**](/docs/iot-applications/solutions) | End-to-end solution blueprints (shrimp ponds, building energy, data center, env. station) |

:::tip Same pattern, different sensors
Most IoT projects differ only in **which sensors** and **which connectivity** they use — the
sense→connect→process→act backbone stays the same. Master it once and you can build any of these.
:::
