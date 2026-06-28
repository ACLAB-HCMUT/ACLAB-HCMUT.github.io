export type ResearchArea = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
};

export const researchAreas: ResearchArea[] = [
  {
    slug: 'intelligent-robotics',
    icon: '🤖',
    title: 'Intelligent Robotics',
    description:
      'Mobile robots, AGVs and robot arms — motion control, manipulation, perception and human-robot interaction.',
    tags: ['ROS', 'Motion Control', 'Manipulation', 'AGV'],
  },
  {
    slug: 'embedded-edge-ai',
    icon: '🧩',
    title: 'Embedded Systems & Edge AI',
    description:
      'Firmware, RTOS and on-device intelligence on microcontrollers, SoCs and AI accelerators.',
    tags: ['Firmware', 'RTOS', 'TinyML', 'STM32'],
  },
  {
    slug: 'autonomous-systems',
    icon: '🛰️',
    title: 'Autonomous Systems',
    description:
      'Localization, mapping (SLAM), navigation and decision-making for self-operating platforms.',
    tags: ['SLAM', 'Navigation', 'Sensor Fusion', 'Planning'],
  },
  {
    slug: 'iot-cps',
    icon: '🌐',
    title: 'IoT & Cyber-Physical Systems',
    description:
      'Connected sensors, gateways and real-time control bridging the physical and digital worlds.',
    tags: ['IoT', 'MQTT', 'Real-time', 'Sensors'],
  },
  {
    slug: 'hw-sw-codesign',
    icon: '⚙️',
    title: 'Hardware-Software Co-design',
    description:
      'Custom PCBs, FPGA/SoC platforms and firmware co-designed for performance, power and cost.',
    tags: ['PCB', 'FPGA', 'DFM', 'Low-power'],
  },
  {
    slug: 'smart-manufacturing',
    icon: '🏭',
    title: 'Smart Manufacturing & Intelligent Devices',
    description:
      'Industrial automation, machine vision and intelligent devices for the smart factory.',
    tags: ['Automation', 'Machine Vision', 'Industry 4.0'],
  },
];
