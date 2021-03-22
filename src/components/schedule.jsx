import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';

const Hello = (props) => {
  const {siteConfig} = useDocusaurusContext();
  const globalData = useGlobalData();
  const singlePage = globalData["docusaurus-plugin-content-docs"].default.versions[0].docs

  const {title, tagline} = siteConfig;

  return <pre>{JSON.stringify(globalData,null,2)}</pre>;
};

export default Hello