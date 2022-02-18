import { Link } from 'react-router-dom';
import '../App.css';
import { projectDetails } from '../Pages/DashboardApp';
import { format } from 'date-fns';


export default function ProjectCard(props: {project: projectDetails}) {
  // console.log(props)
  const project = props.project
  // console.log(project)
  const date = format(new Date(project.time_created), 'dd MMMM yyyy')
  return(
    <>
    <div id="Project-Card">
      <span id="ProjectTitle">
        {project.account_id.toString() === window.localStorage.getItem('user_id') ?
          <Link to={`/dashboard/project/${project.pk}`}>
            {project.title}
          </Link> :
          <>{project.title}</>
        } 
      </span>
      
      {/* <Link to={`/dashboard/project/${project.pk}`}>
        <h3>{project.title}</h3>
      </Link> */}
      <span id="projectDate">{date}</span>
      <div>{project.description}</div>
    </div>
    </>
  )
}