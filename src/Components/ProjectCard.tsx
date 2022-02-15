import { Link } from 'react-router-dom';
import '../App.css';
import { projectDetails } from '../Pages/DashboardApp';

export default function ProjectCard(props: {project: projectDetails}) {
  // console.log(props)
  const project = props.project
  // console.log(project)
  return(
    <div id="Project-Card">
      {project.account_id.toString() === window.localStorage.getItem('user_id') ?
        <Link to={`/dashboard/project/${project.pk}`}>
          <h3>{project.title}</h3>
        </Link> :
        <h3>{project.title}</h3>
      } 
      {/* <Link to={`/dashboard/project/${project.pk}`}>
        <h3>{project.title}</h3>
      </Link> */}
      <div>{project.time_created}</div>
      <span>{project.description}</span>
    </div>
  )
}