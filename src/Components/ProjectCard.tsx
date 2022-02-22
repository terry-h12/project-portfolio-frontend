import { Link } from 'react-router-dom';
import '../App.css';
import { projectDetails } from '../Pages/DashboardApp';
import { format } from 'date-fns';

export default function ProjectCard(props: {project: projectDetails}) {
  const project = props.project
  const date = format(new Date(project.time_created), 'dd MMMM yyyy')
  return(
    <>
      <div id="Project-Card">
        <span id="ProjectTitle">
          <Link to={`/dashboard/viewproject/${project.pk}`}>
            {project.title}
          </Link>
        </span>
        <span id="projectDate">{date}</span>
        <div>{project.description}</div>
      </div>
    </>
  )
}
