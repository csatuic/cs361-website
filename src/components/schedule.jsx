import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)
import data from '../../schedule.json'
const sections  = ['labs','lectures','homeworks']

const getSection = (element) => {
  return element?.[0].split('/')?.[1]
}

const Schedule = (props) => {
  const {siteConfig} = useDocusaurusContext();
  const output = data.filter(x => 
    sections.indexOf(getSection(x)) >= 0
  ).map(x => {
    const thisDate = new Date(Date.parse(x[1].date))
    const later = moment(thisDate).add(15,"m").toDate()
    return {title: x[1].title, start: new Date(Date.parse(x[1].date)), section:getSection(x),
      end: later,
    ...(x[1].due?.date && {end: new Date(Date.parse(x[1].due.date))} ) }
  })
  
  return (<div>
    <Calendar
      localizer={localizer}
      events={output}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>)
};

export default Schedule