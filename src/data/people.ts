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
];

export const peopleHighlight: Member[] = [peopleGroups[0].members[0]];

/** All members flattened, tagged with their group label (used to build /people/<slug>). */
export const allMembers: Member[] = peopleGroups.flatMap((g) =>
  g.members.map((m) => ({...m, group: g.label})),
);
