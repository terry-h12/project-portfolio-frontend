import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../Components/ProjectCard';
import { projectDetails } from '../Pages/DashboardApp';
import { TextField, Button, CircularProgress } from '@mui/material'
import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

export default function ProjectList(props: {userId: string}) {
  const userId = props.userId
  const [projects, setProjects] = useState<projectDetails[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  let isCurrUser: boolean = true;
  if (userId !== window.localStorage.getItem('user_id')) isCurrUser = false;

  useEffect(() => {
    // All projects
    const propfileProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/profileprojects/?user_id=${userId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProjects(resp.data.results)
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
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
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }
    //Display all projects or public ones
    if (isCurrUser) {
      propfileProjects();
    } else {
      publicProjects();
    }
  },[userId, isCurrUser])

  return(
    <div>
      <div id="projectList">
        <div id="ProjectControlPanel">
          {
            isCurrUser ? 
            <>
              <TextField placeholder="Enter project" onChange={event => setQuery(event.target.value)} id="ProjectSearch"/>
              <Link to="/dashboard/addProject" style={{ textDecoration: 'none' }} >
                <Button variant="outlined" size="large" id="AddProjectButton" ><AddIcon/> Project</Button>
              </Link>
            </>
            :
            <>
              { 
                projects.length === 0  && !loading ? <div id="emptyProjects">No projects uploaded.</div> :  
                <TextField placeholder="Enter project" onChange={event => setQuery(event.target.value)} id="ProjectSearchUser"/>
              }
            </>
          }
        </div>
        { 
          !loading ?  
          projects.filter(project => !query || project.title.toLowerCase().includes(query.toLowerCase()))
          .map((project, index) => {
            return (<ProjectCard key={index} project={project}/>)
          }) :
          <div id="loading">
            <CircularProgress />
          </div>
        }
      </div>
    </div>
  )
}
