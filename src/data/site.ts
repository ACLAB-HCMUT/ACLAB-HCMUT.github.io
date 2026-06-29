export const stats = [
  {value: '40+', label: 'Lab Members'},
  {value: '25+', label: 'Active Projects'},
  {value: '60+', label: 'Publications'},
  {value: '15+', label: 'Partners & Awards'},
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
    name: 'Faculty of EEE',
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
