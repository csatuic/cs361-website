import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import data from '../../schedule.json';
const sections = ['labs', 'lectures', 'homeworks', 'exams'];
import ReactMarkdown from 'react-markdown';
import Link from '@docusaurus/Link';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const getPath = (filename) =>
  filename.slice(filename.indexOf('/') + 1, filename.lastIndexOf('.'));

const getSection = (element) => {
  return element?.[0].split('/')?.[1];
};

const Description = (props) => {
  if (props.render || (props.section !== 'lectures' && props.section !== 'exams'))
    return <Link to={`/${props.file}`}>{props.name}</Link>;
  else return <></>;
};

const Content = (props) => {
  return (
    <ul>
      {props.element?.contents?.map((elt) =>
        typeof elt === 'string' ? (
          <li key={elt}>{elt}</li>
        ) : (
          <li key={elt.name} >
            <Link to={elt.link}>{elt.name}</Link>
          </li>
        ),
      )}
    </ul>
  );
};

const Notes = (props) => {
  if (props.released)
    return (
      <>Released on {new Date(props.released).toLocaleDateString('en-us')}</>
    );
  else if (props.notes) return <ReactMarkdown>{props.notes}</ReactMarkdown>;
    return <>{` `}</>;
};

const EventTime = (props) => {
  return <>{new Date(props.date).toLocaleDateString('en-us')}</>;
};

const ScheduleRow = (props) => {
  return (
    <Tr key={props.title}>
      <Td>{props.section}</Td>
      <Td>
        <EventTime date={props.date} />
      </Td>
      <Td>
        <Description
          section={props.section}
          render={props.sidebar}
          name={props.title}
          file={getPath(props.filename)}
        />
      </Td>
      <Td>
        <Content element={props} />
      </Td>
      <Td>
        <Notes released={props.released} notes={props.notes} />
      </Td>
    </Tr>
  );
};

const Schedule = (props) => {
  const {siteConfig} = useDocusaurusContext();
  const dueDates = [];
  const output = data
    .filter((x) => sections.indexOf(getSection(x)) >= 0)
    .sort((x,y) => new Date(x[1].date) - new Date(y[1].date) )
    .map((x) => {
      return {
        ...x[1],
        filename: x[0],
        section: getSection(x),
        date: x[1].due?.date ? x[1].due.date : x[1].date,
        ...(x[1].due?.date && {released: x[1].date}),
      };
    });

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Td>Type</Td>
            <Td>Date</Td>
            <Td>Link</Td>
            <Td>Content</Td>
            <Td>Notes</Td>
          </Tr>
        </Thead>
        <Tbody>{output.map((x) => ScheduleRow(x))}</Tbody>
      </Table>
    </>
  );
};

export default Schedule;
