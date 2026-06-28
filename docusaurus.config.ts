import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ACLAB',
  tagline: 'Advanced Computing Lab — HCMUT',
  favicon: 'img/favicon.ico',

  url: 'https://aclab-hcmut.github.io',
  baseUrl: '/',

  organizationName: 'ACLAB-HCMUT',
  projectName: 'ACLAB-HCMUT.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      vi: {label: 'Tiếng Việt', htmlLang: 'vi'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ACLAB-HCMUT/ACLAB-HCMUT.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'News & Events',
          blogDescription: 'News, seminars, workshops and recruitment at ACLAB.',
          postsPerPage: 6,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/ACLAB-HCMUT/ACLAB-HCMUT.github.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ACLAB',
      hideOnScroll: false,
      logo: {
        alt: 'ACLAB HCMUT Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/about', label: 'About', position: 'left'},
        {to: '/research', label: 'Research', position: 'left'},
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/people', label: 'People', position: 'left'},
        {to: '/blog', label: 'News & Events', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'knowledgeBase',
          position: 'left',
          label: 'Knowledge Base',
        },
        {to: '/contact', label: 'Contact', position: 'left'},
        {type: 'localeDropdown', position: 'right'},
        {
          href: 'https://github.com/ACLAB-HCMUT',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
        {to: '/join', label: 'Join ACLAB', position: 'right', className: 'navbar__cta'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ACLAB',
          items: [
            {label: 'About the Lab', to: '/about'},
            {label: 'Research Areas', to: '/research'},
            {label: 'Projects', to: '/projects'},
            {label: 'People', to: '/people'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'Knowledge Base', to: '/docs/intro'},
            {label: 'News & Events', to: '/blog'},
            {label: 'Join Us', to: '/join'},
            {label: 'Contact', to: '/contact'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'GitHub', href: 'https://github.com/ACLAB-HCMUT'},
            {label: 'Facebook Page', href: 'https://www.facebook.com/aclabhcumt'},
            {label: 'Facebook Group', href: 'https://www.facebook.com/groups/aclabbachkhoa'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/'},
            {label: 'YouTube', href: 'https://www.youtube.com/'},
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'Ho Chi Minh City University of Technology (HCMUT)',
              href: 'https://hcmut.edu.vn/',
            },
            {label: '268 Ly Thuong Kiet, Dist. 10, HCMC', href: 'https://maps.google.com/?q=HCMUT'},
            {label: 'aclab@hcmut.edu.vn', href: 'mailto:aclab@hcmut.edu.vn'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Advanced Computing Lab (ACLAB), HCMUT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
