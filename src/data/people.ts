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
    ],
  },
];

export const peopleHighlight: Member[] = [peopleGroups[0].members[0]];
