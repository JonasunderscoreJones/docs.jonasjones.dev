// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jonas_Jones Docs',
  tagline: 'docs.jonasjones.dev',
  favicon: 'img/favicon.png',

  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexBlog: false,
      }
    ]
  ],

  // Set the production url of your site here
  url: 'https://docs.jonasjones.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'JonasunderscoreJones', // Usually your GitHub org/user name.
  projectName: 'docs.jonasjones.dev', // Usually your repo name.

  onBrokenLinks: 'warn',
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        additionalLanguages: ['properties', 'ini', 'powershell', 'bash', 'yaml'],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Replace with your project's social card
      image: 'img/favicon.png',
      navbar: {
        title: 'DOCS.JONASJONES.DEV',
        logo: {
          alt: 'docs.jonasjones.dev Logo',
          src: 'img/favicon.png',
        },
        items: [
          {
            href: 'https://jonasjones.dev',
            label: 'Homepage',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Website by Jonas_Jones 2021 - ${new Date().getFullYear()}`,
      },
    })
};

export default config;
