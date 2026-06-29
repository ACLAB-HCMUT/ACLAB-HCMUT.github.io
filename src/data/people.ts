import type {Member} from '../components';

export type PeopleGroup = {
  id: string;
  label: string;
  members: Member[];
};

export const peopleGroups: PeopleGroup[] = [
  {
    id: 'faculty',
    label: 'Faculty',
    members: [
      {
        name: 'Dr. Lê Trọng Nhân',
        role: 'Head of Lab (HOD) · Faculty of CSE, HCMUT',
        interests:
          'IoT, wireless sensor networks, energy harvesting, edge AI & embedded systems',
        initials: 'LTN',
        photo: '/img/people/le-trong-nhan.jpg',
        links: [
          {
            label: 'Scholar',
            href: 'https://scholar.google.com/citations?user=nLfZASYAAAAJ&hl=en',
          },
        ],
      },
      {
        name: 'Associate Director',
        role: 'Faculty · Co-PI',
        interests: 'Embedded systems, edge AI, hardware-software co-design',
        initials: 'AD',
        links: [{label: 'Scholar', href: 'https://scholar.google.com/'}],
      },
    ],
  },
  {
    id: 'researchers',
    label: 'Researchers',
    members: [
      {
        name: 'Research Engineer',
        role: 'Robotics Researcher',
        interests: 'SLAM, ROS 2, sensor fusion',
        initials: 'RE',
        links: [{label: 'GitHub', href: 'https://github.com/ACLAB-HCMUT'}],
      },
      {
        name: 'Research Engineer',
        role: 'Embedded / Edge AI',
        interests: 'TinyML, firmware, model optimization',
        initials: 'RE',
        links: [{label: 'GitHub', href: 'https://github.com/ACLAB-HCMUT'}],
      },
      {
        name: 'Research Engineer',
        role: 'Hardware Engineer',
        interests: 'PCB design, power electronics, DFM',
        initials: 'HW',
        links: [{label: 'LinkedIn', href: 'https://www.linkedin.com/'}],
      },
    ],
  },
  {
    id: 'students',
    label: 'Students',
    members: [
      {
        name: 'Graduate Student',
        role: 'MSc Student',
        interests: 'Autonomous navigation, planning',
        initials: 'GS',
        links: [{label: 'GitHub', href: 'https://github.com/ACLAB-HCMUT'}],
      },
      {
        name: 'Undergraduate',
        role: 'Lab Member',
        interests: 'Robotics, embedded firmware',
        initials: 'UG',
      },
      {
        name: 'Undergraduate',
        role: 'Lab Member',
        interests: 'Computer vision, edge AI',
        initials: 'UG',
      },
      {
        name: 'Undergraduate',
        role: 'Lab Member',
        interests: 'IoT, cyber-physical systems',
        initials: 'UG',
      },
    ],
  },
  {
    id: 'alumni',
    label: 'Alumni',
    members: [
      {
        name: 'Alumnus',
        role: 'Now: Embedded Engineer',
        interests: 'Firmware, RTOS',
        initials: 'AL',
      },
      {
        name: 'Alumna',
        role: 'Now: Robotics Engineer',
        interests: 'ROS, motion planning',
        initials: 'AL',
      },
    ],
  },
];

export const peopleHighlight: Member[] = [
  peopleGroups[0].members[0],
  peopleGroups[1].members[0],
  peopleGroups[1].members[2],
  peopleGroups[2].members[0],
];
