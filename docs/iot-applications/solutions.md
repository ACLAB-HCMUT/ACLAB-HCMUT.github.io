---
sidebar_position: 4
title: IoT Solutions
---

# IoT Solutions

Representative **end-to-end IoT solution blueprints** — complete systems built on the
[IoT pattern](/docs/iot-applications) (sense → connect → process → act). Each pairs field sensors
over RS485/Modbus with an edge gateway (Raspberry Pi or ESP32-class) and a cloud dashboard with
alerts. They show how the building blocks in [Building a Product](/docs/embedded-firmware/building-a-product)
come together into a deployable system.

## Shrimp-pond water-quality monitoring

Keep aquaculture ponds healthy around the clock — see [Environmental Monitoring](/docs/iot-applications/environmental-monitoring#aquaculture-water-quality).

- **Monitors:** pH, electrical conductivity (EC), dissolved oxygen (DO), ammonia (NH₄), temperature — via industrial RS485 probes.
- **Connect / process:** Pi-class gateway → cloud SCADA dashboard.
- **Acts:** 24/7 monitoring, threshold alerts (email/Telegram), historical reports.
- **Benefit:** catch dangerous DO/pH swings early, prevent disease and stock loss.

## Building energy monitoring & device control

Cut energy waste and manage devices remotely across a building.

- **Monitors:** power per zone — voltage, current, leakage current.
- **Controls:** lights, fans and air-conditioners (IR control) and smart circuit breakers, over RS485 Modbus → ESP32 gateway → cloud.
- **Benefit:** real-time per-zone energy visibility, electrical-fault alerts, automated AC sequencing, multi-room control without site visits.

## Data-center room monitoring

Protect critical infrastructure with proactive alerts.

- **Monitors:** temperature, humidity, **water-leak detection**, power (UPS/generator voltage & current), door-access events.
- **Acts:** real-time anomaly alerts (email/Telegram), control of HVAC/UPS, web dashboard with logs.
- **Benefit:** prevent downtime, spot problems before they escalate, audit access.

## Environmental monitoring station

A full station for site/agriculture/air-quality data — see [Environmental Monitoring](/docs/iot-applications/environmental-monitoring).

- **Monitors:** air (temperature, humidity, pressure, light, **noise**, **PM2.5/PM10**), weather (wind speed/direction, rainfall), solar irradiance, soil (temperature, moisture, EC, pH, NPK).
- **Connect:** RS485 → ESP32-S3 gateway → **4G / Wi-Fi / Ethernet** → cloud; alerts via email/Telegram/SMS.
- **Benefit:** local, real-time, data-driven decisions (vs. generic forecasts); early warnings; integrates with automation like irrigation.

:::note Blueprints, not a catalog
These describe how such solutions are built so members can design their own. Specifics
(sensors, thresholds, dashboards) vary per deployment.
:::

## References

- [Shrimp-pond water quality](https://epcb.vn/products/giai-phap-giam-sat-chat-luong-nuoc-ao-nuoi-tom) ·
  [Building energy & control](https://epcb.vn/products/giai-phap-giam-sat-nang-luong-va-dieu-khien-thiet-bi-toa-nha) ·
  [Data-center monitoring](https://epcb.vn/products/giai-phap-giam-sat-phong-data-center) ·
  [Environmental station](https://epcb.vn/products/giai-phap-tram-quan-trac-moi-truong) (EPCB)
