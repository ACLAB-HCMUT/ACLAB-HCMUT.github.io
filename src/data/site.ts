import type {NewsItem} from '../components';

export const stats = [
  {value: '40+', label: 'Lab Members'},
  {value: '25+', label: 'Active Projects'},
  {value: '60+', label: 'Publications'},
  {value: '15+', label: 'Partners & Awards'},
];

export const partners = [
  'HCMUT',
  'Faculty of EEE',
  'Industry Partner',
  'Research Institute',
  'Tech Company',
  'University Partner',
];

export const latestNews: NewsItem[] = [
  {
    date: 'Jun 2026',
    category: 'Recruitment',
    title: 'ACLAB is recruiting new student members for 2026',
    excerpt:
      'Applications are open for undergraduate and graduate students interested in robotics, embedded systems and edge AI.',
    to: '/join',
  },
  {
    date: 'May 2026',
    category: 'Seminar',
    title: 'Seminar: Edge AI for real-time visual inspection',
    excerpt:
      'A technical seminar on deploying quantized vision models on embedded accelerators for the factory floor.',
    to: '/blog',
  },
  {
    date: 'Apr 2026',
    category: 'Competition',
    title: 'ACLAB team places in national robotics competition',
    excerpt:
      'Our autonomous AGV team reached the finals with a LiDAR-based navigation stack built in the lab.',
    to: '/blog',
  },
];
