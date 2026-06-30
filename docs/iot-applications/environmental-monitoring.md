---
sidebar_position: 2
title: Environmental Monitoring
---

# Environmental Monitoring (Quan trắc)

Sensing physical conditions continuously to protect people, comply with regulations, optimize
production, and study nature. All of these share the [IoT pattern](/docs/iot-applications) —
they differ mainly in *what* they measure and *where* they run.

## Construction-site monitoring

Track conditions on and around a site for **safety and compliance**.

- **Measure:** dust (PM2.5/PM10), noise, vibration, air quality (CO, VOC), weather (wind/rain).
- **Why:** protect workers and neighbors, meet environmental limits, document compliance.
- **Act:** real-time alerts when thresholds are exceeded; automatic logging for reports.

## Workplace / occupational environment

Monitor the environment workers are exposed to indoors.

- **Measure:** temperature & humidity, **noise level**, **dust/particulates**, gas (CO, CO₂), lighting.
- **Why:** worker health & safety, occupational-hygiene compliance, comfort/productivity.
- **Act:** ventilation control, warning lights/buzzers, shift exposure logs.

## Smart agriculture

Data-driven farming that saves water and improves yield.

- **Measure:** soil moisture & temperature, air temp/humidity, light, rainfall, leaf wetness.
- **Act:** **automated irrigation**, greenhouse climate control, frost/heat alerts.
- **Notes:** fields are large and remote → favor **LoRaWAN** + solar + low-power nodes.

## Aquaculture (water quality)

Keep fish/shrimp ponds healthy and reduce losses.

- **Measure:** dissolved oxygen (DO), pH, temperature, salinity, turbidity, ammonia.
- **Act:** control **aerators** and feeders; alarm on dangerous DO/pH swings (often at night).
- **Notes:** waterproof/rugged sensors, calibration and biofouling are real challenges.

## Wildlife & habitat monitoring / conservation

Study and protect animals and ecosystems.

- **Measure / collect:** animal **GPS/tracking collars**, **camera traps**, acoustic sensors (bird/bat/insect calls), habitat climate.
- **Why:** biodiversity research, anti-poaching, migration and behavior studies.
- **Notes:** extreme **low power** and **long range** (LoRa, satellite/cellular), rugged & weatherproof, very long battery life.

## Specialized measurement devices & GIS integration

- **Integrate IoT into purpose-built instruments** — turn a standalone meter into a connected,
  logging, remotely-readable device.
- **Calibration & data validation** matter: an unvalidated sensor produces confident nonsense.
- **Map integration (GIS):** geotag readings and feed a live map/heatmap so spatial patterns
  (a pollution plume, a dry zone) become visible.

:::caution Remote = power + connectivity first
For sites, farms and the wild, solve **power (solar/battery + low-power design)** and
**connectivity (LoRa/cellular/satellite)** before features. A node that dies or goes silent
collects no data.
:::

:::tip Calibrate, then trust
Environmental decisions ride on these numbers. Calibrate sensors, sanity-check ranges, and flag
drift — bad data is worse than no data.
:::
