const path = require("path");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "CS 361: Systems Programming",
  tagline: "Getting to know your operating system",
  url: "https://www.cs.uic.edu/~ckanich/cs361/s21/",
  baseUrl: "/~ckanich/cs361/s21/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/uic.svg",
  organizationName: "csatuic", // Usually your GitHub org/user name.
  projectName: "cs361-website", // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-21532225-1'
    },
    hideableSidebar: true,
    sidebarCollapsible: false,
    navbar: {
      title: "CS 361: Systems Programming",
      logo: {
        alt: "UIC Logo",
        src: "img/uic.svg",
      },
      items: [
        {
          to: "syllabus/",
          label: "Syllabus",
          position: "left",
        },
        {
          to: "schedule/",
          label: "Schedule",
          position: "left",
        },
        {
          href: "https://github.com/csatuic/cs361-website/",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Home", to: "/" },
            { label: "Schedule", to: "/schedule" },
            { label: "Syllabus", to: "/syllabus" },
          ],
        },
        {
          title: "Other tools",
          items: [
            {
              label: "Piazza Q&A",
              href: "https://piazza.com/class/kjs0fa9l97y53k",
            },
            {
              label: "Gradescope",
              href: "https://www.gradescope.com/courses/293389",
            }
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Chris Kanich",
              to: "https://www.cs.uic.edu/~ckanich/",
            },
            {
              label: "GitHub",
              href: "https://github.com/csatuic/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chris Kanich. Built with Docusaurus.`,
    },
  },
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        routeBasePath: "/",
        sidebarPath: require.resolve("./sidebars.auto.js"),
        // Please change this to your repo.
        editUrl: "https://github.com/csatuic/cs361-website/edit/main/",
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html'],
        createRedirects: function (existingPath) {
          let result;
          if (result = /\/labs\/lab([0-9]+)/.exec(existingPath)) {
            const num = parseInt(result[1])
            return [`/lab${num}.html`]
          }
          if (result = /\/homeworks\/homework([0-9]+)/.exec(existingPath)) {
            const num = parseInt(result[1])
            return [`/homework${num}.html`]
          }
        }
      },
    ],
    "docusaurus-plugin-auto-sidebars",
    "@docusaurus/plugin-google-analytics"
  ],
  themes: [
    [
      "@docusaurus/theme-classic",
      {
        customCss: require.resolve("./src/css/custom.css"),
      },
    ],
  ],
};
