import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { ProjectDetails } from "./AddProject";
import axios from "axios";

export default function ViewProject() {
  const { projectId } = useParams();

  const[projectDetails, setProjectDetails] = useState<ProjectDetails>( {
    title: "",
    image_url: "",
    description: "",
    is_public: false,
    backend_repo: "",
    frontend_repo: "",
    website: "",
    account_id: "",
  });

  useEffect(() => {
    const userProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/getproject/?project_id=${projectId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProjectDetails(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    userProjects();
  }, [projectId])

  return(
    <div id="viewProject">
      {projectDetails.account_id.toString() === window.localStorage.getItem('user_id') ?
        <Link to={`/dashboard/editproject/${projectId}`}>
          <div id="ViewProjectTitle">{projectDetails.title}</div>
        </Link> :
        <div id="ViewProjectTitle">{projectDetails.title}</div>
      } 
      {
        projectDetails.image_url !== "" ? 
        <div id="projectImg">
          <img alt="Project view" src={projectDetails.image_url} width="40%" id="projectImg"/>
        </div> :
        <></>
      }
      <div id="ViewProjectInfo">
        <div id="repoTitle">Git Repositories</div>
        <ul id="repoList">
            {
              projectDetails.frontend_repo !==  ""  ? 
              <li>
                <a href={projectDetails.frontend_repo} target="_blank" rel="noopener noreferrer">Frontend</a> 
              </li> :
              <></>
            }
            {
              projectDetails.backend_repo !==  ""  ? 
              <li>
                <a href={projectDetails.backend_repo} target="_blank" rel="noopener noreferrer">Backend</a> 
              </li> :
              <></>
            }
        </ul>
        <a href={projectDetails.website} target="_blank" rel="noopener noreferrer">Website</a>
        <div id="viewDescription">{projectDetails.description}</div>
      </div>
    </div>
  )
}
