import { Link } from 'react-router-dom';
import '../App.css';
import { projectDetails } from '../Pages/DashboardApp';

export default function ProjectCard(props: {project: projectDetails}) {
  // console.log(props)
  const project = props.project
  return(
    <div id="Project-Card">
      <Link 
        to={`/dashboard/project/${project.pk}`}
        state={{ project: project }}
      >
        <h3>{project.title}</h3>
      </Link>
      <div>{project.time_created}</div>
      <span>{project.description}</span>
    </div>
  )
}