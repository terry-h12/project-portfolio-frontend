import { 
  useState,
  useEffect 
} from 'react';
import axios from 'axios';
import ProjectCard from '../Components/ProjectCard';
import { projectDetails } from '../Pages/DashboardApp';
export default function ProjectList(props: {userId: string}) {
  const userId = props.userId
  const [projects, setProjects] = useState<projectDetails[]>([]);
  useEffect(() => {
    // const userId = window.localStorage.getItem('user_id')

    // All projects
    const propfileProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/profileprojects/?user_id=${userId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProjects(resp.data.results)
        // console.log(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    // Only public projects
    const publicProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/userprojects/?user_id=${userId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProjects(resp.data.results)
        // console.log(resp.data)
      } catch (err) {
        console.log(err)
      }
    }

    //Display all projects or public ones
    if (userId === window.localStorage.getItem('user_id')) {
      propfileProjects();
    } else {
      publicProjects();
    }
  },[userId])

  return(
    <div>
      <div id="projectList">
        {projects.map((project, index) => {
          return (<ProjectCard key={index} project={project}/>)
        })}
      </div>
      
    </div>
  )
}