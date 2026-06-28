import type {Project} from '../components';

export const projects: Project[] = [
  {
    slug: 'autonomous-agv',
    title: 'Autonomous Warehouse AGV',
    description:
      'A differential-drive AGV with LiDAR SLAM and ROS 2 navigation for autonomous material transport in warehouses.',
    tags: ['ROS 2', 'LiDAR', 'SLAM', 'STM32'],
    status: 'Active',
    area: 'Intelligent Robotics',
    year: 2025,
    initials: 'AGV',
  },
  {
    slug: 'edge-vision-inspection',
    title: 'Edge AI Visual Inspection',
    description:
      'On-device defect detection running a quantized CNN on a Jetson module for real-time quality control.',
    tags: ['Edge AI', 'Jetson', 'Computer Vision', 'TensorRT'],
    status: 'Ongoing',
    area: 'Embedded Systems & Edge AI',
    year: 2025,
    initials: 'EVI',
  },
  {
    slug: '6dof-robot-arm',
    title: '6-DOF Collaborative Robot Arm',
    description:
      'A custom 6-axis robot arm with BLDC actuators, custom motor-driver PCBs and a ROS MoveIt pipeline.',
    tags: ['Robot Arm', 'BLDC', 'PCB', 'MoveIt'],
    status: 'Ongoing',
    area: 'Intelligent Robotics',
    year: 2024,
    initials: 'ARM',
  },
  {
    slug: 'iot-sensor-mesh',
    title: 'Industrial IoT Sensor Mesh',
    description:
      'A low-power wireless sensor network with edge gateways streaming telemetry over MQTT for factory monitoring.',
    tags: ['IoT', 'ESP32', 'MQTT', 'Low-power'],
    status: 'Completed',
    area: 'IoT & Cyber-Physical Systems',
    year: 2024,
    initials: 'IOT',
  },
  {
    slug: 'fpga-motor-control',
    title: 'FPGA-based Motor Control Platform',
    description:
      'A field-oriented control (FOC) platform implemented on an FPGA SoC for high-bandwidth motor control.',
    tags: ['FPGA', 'FOC', 'Co-design', 'Verilog'],
    status: 'Active',
    area: 'Hardware-Software Co-design',
    year: 2025,
    initials: 'FOC',
  },
  {
    slug: 'autonomous-drone',
    title: 'Autonomous Inspection Drone',
    description:
      'A UAV with visual-inertial odometry and onboard planning for GPS-denied autonomous inspection.',
    tags: ['UAV', 'VIO', 'Planning', 'Edge AI'],
    status: 'Planned',
    area: 'Autonomous Systems',
    year: 2026,
    initials: 'UAV',
  },
];

export const featuredProjects = projects.slice(0, 3);
