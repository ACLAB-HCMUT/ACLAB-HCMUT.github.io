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
};

export type NewsItem = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  to: string;
};
