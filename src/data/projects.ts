import type {Project} from '../components';

export const projects: Project[] = [
  {
    slug: 'vr-robot-arm-teleoperation',
    title: 'VR Teleoperation of a Denso VS-6577 Robot Arm with ROS 2',
    description:
      'A full-stack VR teleoperation system for the 6-DOF Denso VS-6577 industrial arm: a ROS 2 + ros2_control + MoveIt 2 control stack (UART driver to the RC5 controller, MoveIt Servo and a custom Action Server) paired with a standalone Meta Quest 3 app built in Unity. It communicates over ROS# / rosbridge with a synchronized Digital Twin and dual-camera feedback, achieving ~23 ms round-trip latency and stable 66 FPS.',
    tags: ['ROS 2', 'MoveIt 2', 'VR', 'Meta Quest 3', 'Digital Twin'],
    status: 'Completed',
    area: 'Intelligent Robotics',
    year: 2026,
    initials: 'VR',
    to: '/docs/projects/vr-robot-arm-teleoperation',
  },
];

export const featuredProjects = projects.slice(0, 3);
