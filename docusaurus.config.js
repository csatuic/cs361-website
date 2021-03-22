/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'My Site',
  tagline: 'The tagline of my site',
  url: 'https://www.cs.uic.edu/~ckanich/cs361/next/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/uic.svg',
  organizationName: 'csatuic', // Usually your GitHub org/user name.
  projectName: 'cs361-website', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'CS 361: Systems Programming',
      logo: {
        alt: 'UIC Logo',
        src: 'img/uic.svg',
      },
      items: [
        {
          to: 'syllabus/',
          label: 'Syllabus',
          position: 'left',
        },
        {
          href: 'https://github.com/csatuic/cs361-website/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discourse Q&A',
              href: 'https://example.com',
            },
            {
              label: 'Discord',
              href: 'https://example.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Chris Kanich',
              to: 'https://www.cs.uic.edu/~ckanich/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/csatuic/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chris Kanich. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.auto.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/csatuic/cs361-website-next/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-auto-sidebars']
};
