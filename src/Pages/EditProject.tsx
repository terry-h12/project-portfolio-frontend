import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
// import { useLocation } from "react-router-dom"
import { ProjectDetails } from "./AddProject";
import { TextField, Button, Checkbox, FormControlLabel  } from '@mui/material'
import '../App.css'
import { useParams } from "react-router-dom"

// export class CheckboxComponent {
//   checkMe = "N";
//   isChecked = true;
// }

export default function EditProject() {
  const { projectId } = useParams();
  const[projectDetails, setProjectDetails] = useState<ProjectDetails>( {
    title: "",
    image_url: "",
    description: "",
    is_public: false,
    backend_repo: "",
    frontend_repo: "",
    website: "",
    account_id: `${window.localStorage.getItem('username')}`,
  });

  const [isPublic, setIsPublic] = useState(false);

  const changeDetails = {
    title: projectDetails.title,
    image_url: projectDetails.image_url,
    description: projectDetails.description,
    backend_repo: projectDetails.backend_repo,
    frontend_repo: projectDetails.frontend_repo,
    website: projectDetails.website,
    account_id: `${window.localStorage.getItem('username')}`,
    project_id: projectId,
    is_public: isPublic,
  }
  useEffect(() => {
    // const userId = window.localStorage.getItem('user_id')
    const userProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/getproject/?project_id=${projectId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        // setUserProjects(resp.data.results)
        // console.log(resp.data)
        setProjectDetails(resp.data)
        setIsPublic(resp.data.is_public)
      } catch (err) {
        console.log(err)
      }
    }
    userProjects();
  }, [projectId])

  const edit = async () => { 
    // console.log(isPublic)
    try {
      const resp = await axios.put('https://terry-h12-project-portfolio.herokuapp.com/project/change/', changeDetails, 
      {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
      // setUserProjects(resp.data.results)
      console.log(resp)
      // setProjectDetail(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (prop: keyof ProjectDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    // setNewProjectDetail({ ...newProjectDetail, [prop]: event.target.value });
    setProjectDetails({ ...projectDetails, [prop]: event.target.value });
  };

  return(
    <div>
      <h1>Edit Project</h1>
      {/* <label>Title</label>
      <input type="text" onChange={handleChange("title") } value={projectDetails.title}></input><br/>
      <label>Description</label>
      <input type="text" onChange={handleChange("description")} value={projectDetails.description}></input><br/>
      <label>Backend Repo</label>
      <input type="text" onChange={handleChange("backend_repo")} value={projectDetails.backend_repo}></input><br/>
      <label>Frontend Repo</label>
      <input type="text" onChange={handleChange("frontend_repo")} value={projectDetails.frontend_repo}></input><br/>
      <label>Website</label>
      <input type="text" onChange={handleChange("website")} value={projectDetails.website}></input><br/>
      <label>Image</label>
      <input type="text" onChange={handleChange("image_url")} value={projectDetails.image_url}></input><br/>
      <label>Public?</label>
      <input type="checkbox" onChange={() => setIsPublic(curr => !curr)} checked={isPublic}></input><br/> */}
      <div id="addProjectForm">
        <TextField id="title" label="Title " variant="standard" onChange={handleChange("title")} value={projectDetails.title}/>
        <TextField id="description" label="Description " variant="standard" onChange={handleChange("description")} value={projectDetails.description}/>
        <TextField id="backend_repo" label="Backend Repo " variant="standard" onChange={handleChange("backend_repo")} value={projectDetails.backend_repo} />
        <TextField id="frontend_repo" label="Frontend Repo " variant="standard" onChange={handleChange("frontend_repo")} value={projectDetails.frontend_repo} />
        <TextField id="website" label="Website " variant="standard" onChange={handleChange("website")} value={projectDetails.website} />
        <TextField id="image" label="Image " variant="standard" onChange={handleChange("image_url")} value={projectDetails.image_url} />
        <FormControlLabel control={<Checkbox checked={isPublic} onChange={() => setIsPublic(curr => !curr)} />} label="Public" />
        <Button variant="outlined" onClick={edit}>Edit project</Button>
      </div>

      <button onClick={edit}>Change</button>
    </div>
  )
}