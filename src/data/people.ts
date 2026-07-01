import type {Member} from '../components';

export type PeopleGroup = {
  id: string;
  label: string;
  members: Member[];
};

// Only real, verifiable people are listed. Placeholder/anonymous entries were
// removed for credibility — add new members only with real name/role/links
// (and a photo in static/img/people/ when available). Do NOT re-introduce
// generic "Research Engineer" / "Undergraduate" filler.
export const peopleGroups: PeopleGroup[] = [
  {
    id: 'faculty',
    label: 'Faculty',
    members: [
      {
        name: 'Dr. Lê Trọng Nhân',
        slug: 'le-trong-nhan',
        role: 'Head of Lab (HOD)',
        interests:
          'IoT, wireless sensor networks, energy harvesting, edge AI & embedded systems',
        initials: 'LTN',
        photo: '/img/people/le-trong-nhan.jpg',
        affiliation: 'Faculty of Computer Science & Engineering, HCMUT',
        researchAreas: [
          'IoT',
          'Wireless sensor networks',
          'Energy harvesting',
          'Edge AI',
          'Embedded systems',
        ],
        publicationsUrl:
          'https://scholar.google.com/citations?user=nLfZASYAAAAJ&hl=en',
        projects: [
          {
            label: 'VR Teleoperation of a Denso VS-6577 Robot Arm',
            to: '/docs/projects/vr-robot-arm-teleoperation',
          },
        ],
        links: [
          {
            label: 'Google Scholar',
            href: 'https://scholar.google.com/citations?user=nLfZASYAAAAJ&hl=en',
          },
        ],
      },
    ],
  },
  {
    id: 'members',
    label: 'Members',
    members: [
      {
        name: 'Cao Tiến Đạt',
        slug: 'cao-tien-dat',
        role: 'R&D Engineer · Research Assistant',
        interests: 'Embedded systems, PCB design, edge AI and robotics',
        initials: 'CD',
        photo: '/img/people/cao-tien-dat.jpg',
        affiliation: 'Computer Engineering, HCMUT',
        bio: 'R&D engineer working across software, hardware, firmware and mechanical design — from custom PCBs and embedded firmware to robotics and edge AI.',
        researchAreas: ['Embedded Systems', 'PCB Design', 'Edge AI', 'Robotics'],
        education: [
          {degree: 'M.Eng. in Computer Science', institution: 'HCMUT', years: '2024 – Present'},
          {degree: 'B.Eng. in Computer Engineering', institution: 'HCMUT', years: '2020 – 2024'},
        ],
        experience: [
          {
            period: 'Apr 2025 – Present',
            title: 'Software Engineer',
            org: 'NAB Innovation Centre Vietnam',
            description: 'CI/CD pipelines, software patching and vulnerability remediation (Snyk).',
          },
          {
            period: 'Sep 2024 – Jun 2025',
            title: 'Visiting Lecturer & Research Assistant',
            org: 'HCMUT',
            description: 'Labs & research in microcontrollers, digital systems and IoT; PCB design, firmware and Linux research infrastructure.',
          },
          {
            period: 'May 2024 – May 2025',
            title: 'Embedded Systems / Hardware Engineer',
            org: 'Kinis.ai',
            description: 'Firmware for AI-enabled edge devices (ESP32/STM32); custom PCB design, layout and hardware bring-up.',
          },
        ],
        projects: [
          {label: 'Custom AGV Platform (LiDAR · ODrive · ROS · Isaac Sim)'},
          {label: 'Arctos 6-DOF Robot Arm'},
          {label: 'Quadruped Robot — 3-DOF Leg Prototype'},
          {label: 'H.A.T.S Data Logging Dongle (ESP32, custom PCB)'},
        ],
        links: [{label: 'Email', href: 'mailto:caotiendattx@gmail.com'}],
      },
      {
        name: 'Nguyễn Hải Trung',
        slug: 'nguyen-hai-trung',
        role: 'Student Member',
        interests: 'Embedded software, firmware, IoT and industrial monitoring',
        initials: 'NHT',
        affiliation: 'Computer Science & Engineering, HCMUT',
        bio: 'Computer Engineering student with hands-on experience in embedded systems, IoT and industrial monitoring — ESP32/FreeRTOS firmware, sensor integration, and on-site hardware assembly and deployment.',
        researchAreas: ['Embedded Systems', 'IoT', 'Industrial Monitoring', 'Firmware'],
        education: [
          {
            degree: 'B.Eng. in Computer Science & Engineering',
            institution: 'HCMUT',
            years: '2020 – 2026',
          },
        ],
        experience: [
          {
            period: 'Oct 2024 – Present',
            title: 'Student Member',
            org: 'Advanced Computing Lab (ACLAB), HCMUT',
            description: 'IoT and industrial monitoring projects; ESP32 embedded apps, hardware assembly, field deployment and technical documentation.',
          },
          {
            period: 'Jul 2024 – Sep 2024',
            title: 'Embedded Systems Intern',
            org: 'Advanced Computing Lab (ACLAB), HCMUT',
            description: 'Design and assembly of industrial electrical cabinets; ESP32 control & monitoring apps; equipment installation and deployment.',
          },
        ],
        projects: [
          {
            label: 'ESP32 Industrial Controller (ESP32-S3 · FreeRTOS · MQTT/WebSocket)',
            to: 'https://github.com/Trungnguyen3101nht/Thesis_ESP32_Industrial_Controller_',
          },
          {
            label: 'Air Quality & Vibration Monitoring System (ESP32-S3)',
            to: 'https://github.com/Trungnguyen3101nht/AirQ_',
          },
        ],
        links: [
          {label: 'Email', href: 'mailto:trung.nguyenhaitrung31@gmail.com'},
          {label: 'GitHub', href: 'https://github.com/Trungnguyen3101nht'},
        ],
      },
    ],
  },
];

export const peopleHighlight: Member[] = [peopleGroups[0].members[0]];

/** All members flattened, tagged with their group label (used to build /people/<slug>). */
export const allMembers: Member[] = peopleGroups.flatMap((g) =>
  g.members.map((m) => ({...m, group: g.label})),
);
