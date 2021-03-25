import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import data from '../../schedule.json'
const sections  = ['labs','lectures','homeworks']
import ReactMarkdown from 'react-markdown'
import Link from '@docusaurus/Link';



const getSection = (element) => {
  return element?.[0].split('/')?.[1]
}

const Description = (props) => {
return <pre>{JSON.toString(props,null,2)}</pre>
}

const Content = (props) => {
  
  return <>{props.element.section}</>
}

const Notes = (props) =>{
  return <ReactMarkdown>{props.notes}</ReactMarkdown>
}

const EventTime = (props) =>{
  return <>{(new Date(props.date)).toLocaleString("en-us")}</>
}

const ScheduleRow = (props) => {
  return (<tr key={props.title}>
<td>{props.section}</td>
<td><EventTime date={props.date} /></td>
<td>{props.title}</td>
<td><Content element={props}/></td>
<td><Notes notes={props.notes}/></td>
  </tr>)
}

const Schedule = (props) => {
  const {siteConfig} = useDocusaurusContext();
  const dueDates = []
  const output = data.filter(x => 
    sections.indexOf(getSection(x)) >= 0
  ).map(x => {
    const thisDate = new Date(Date.parse(x[1].date))
    const transformed =  {title: x[1].title, date: new Date(x[1].date), section:getSection(x),
    }
    return {...x[1], title: x[1].title, start: new Date(Date.parse(x[1].date)), section:getSection(x),
    ...(x[1].due?.date && {end: new Date(Date.parse(x[1].due.date))} ) }
  })
  
  return (<>
  <Link to="lectures/lecture09">Lecture 09</Link>
  <table><tbody>
    {output.map(x => ScheduleRow(x))}
    </tbody>
  </table>
  </>)
};

export default Schedule