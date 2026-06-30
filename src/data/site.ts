// Honest, verifiable figures only — each traces to real content on the site.
// Do NOT inflate; replace/extend only with data backed by a real project,
// person, publication or partner record.
export const stats = [
  {value: '6', label: 'Research Areas'},
  {value: '5', label: 'Partners & Affiliations'},
  {value: '2', label: 'Courses Taught'},
  {value: '1', label: 'Flagship Project'},
];

export type Partner = {
  name: string;
  url?: string;
  blurb?: string;
  category: 'Academic' | 'Industry' | 'Research';
};

export const partners: Partner[] = [
  {
    name: 'HCMUT',
    url: 'https://hcmut.edu.vn/',
    category: 'Academic',
    blurb:
      "Ho Chi Minh City University of Technology — ACLAB's home institution.",
  },
  {
    name: 'Faculty of Computer Science and Engineering',
    category: 'Academic',
    blurb: 'Host faculty at HCMUT supporting ACLAB research and teaching.',
  },
  {
    name: 'Kinis.ai',
    url: 'https://kinis.ai/',
    category: 'Industry',
    blurb:
      'AI Movement Intelligence platform that turns everyday cameras into clinical-grade movement assessment — collaborating with ACLAB on computer vision and edge AI.',
  },
  {
    name: 'OhStem Education',
    url: 'https://ohstem.vn/ve-ohstem-education/',
    category: 'Industry',
    blurb:
      'STEM education company — ACLAB collaborates with OhStem on robotics competitions and hands-on activities for students and young engineers.',
  },
  {
    name: 'ARCS — CSUN',
    url: 'https://arcs.center/',
    category: 'Research',
    blurb:
      'Autonomy Research Center for STEAHM at California State University, Northridge — research collaboration.',
  },
];
