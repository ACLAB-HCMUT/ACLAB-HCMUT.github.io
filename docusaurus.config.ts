import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Advanced Computing Lab',
  tagline: 'IoT, Robotics, AI, and more!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://aclab-hcmut.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ACLAB-HCMUT', // Usually your GitHub org/user name.
  projectName: 'ACLAB-HCMUT.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
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
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Advanced Computing Lab',
      logo: {
        alt: 'ACLAB Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ACLAB-HCMUT',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About Us',
          items: [
            {
              label: 'About ACLAB',
              to: '/docs/intro',
            },
            {
              label: 'Join Us',
              to: '/docs/intro',
            },
            {
              label: 'Contact Us',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Quick Guide',
          items: [
            {
              label: 'How to get help',
              href: 'https://stackoverflow.com/questions/tagged/aclab',
            },
            {
              label: 'FAQs',
              to: '/docs/intro',
            },
            {
              label: 'Technical Support',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'ACLAB Facebook Page',
              href: 'https://www.facebook.com/aclabhcumt/',
            },
            {
              label: 'Facebook Group',
              href: 'https://www.facebook.com/groups/aclabbachkhoa/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ACLAB-HCMUT',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Advanced Computing Lab, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
