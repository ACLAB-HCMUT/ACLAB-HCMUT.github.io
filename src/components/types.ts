// Shared content/domain types used across components and src/data.

export type ProjectStatus = 'Active' | 'Ongoing' | 'Completed' | 'Planned';

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  area: string;
  year: number;
  initials: string;
  to?: string;
};

export type Member = {
  name: string;
  role: string;
  interests: string;
  initials: string;
  photo?: string;
  links?: {label: string; href: string}[];
  /** When set, the member gets a detail page at /people/<slug>. */
  slug?: string;
  affiliation?: string;
  email?: string;
  office?: string;
  bio?: string;
  education?: {degree: string; institution?: string; years?: string}[];
  experience?: {period?: string; title: string; org?: string; description?: string}[];
  awards?: {year?: string; title: string; org?: string}[];
  researchAreas?: string[];
  publicationsUrl?: string;
  projects?: {label: string; to?: string}[];
  /** Filled when members are flattened across groups (group label). */
  group?: string;
};

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  to: string;
};
