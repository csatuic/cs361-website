import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import data from '../../schedule.json'

const Schedule = (props) => {
  const {siteConfig} = useDocusaurusContext();

  return <pre>{JSON.stringify(data,null,2)}</pre>;
};

export default Schedule