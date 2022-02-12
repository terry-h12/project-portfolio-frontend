import { Link, 
  // useNavigate 
} from 'react-router-dom';
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

export interface ProjectDetails {
  title: string;
  image_url: string;
  description: string;
  is_public: boolean;
  backend_repo: string;
  frontend_repo: string;
  website: string;
  account_id: string;
}

export default function AddProject() {
  const [isPublic, setIsPublic] = useState(true);
  
  const [projectDetail, setProjectDetail] = useState<ProjectDetails>({
    title: "",
    image_url: "",
    description: "",
    is_public: isPublic,
    backend_repo: "",
    frontend_repo: "",
    website: "",
    account_id: `${window.localStorage.getItem('username')}`,
  });

  const handleChange = (prop: keyof ProjectDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setProjectDetail({ ...projectDetail, [prop]: event.target.value });
  };

  useEffect(()=> {
    // console.log(isPublic)
    setProjectDetail((projectDetail) => ({...projectDetail, is_public: isPublic}))
  },[isPublic])

  const addProject = async () => {
    axios.post('https://terry-h12-project-portfolio.herokuapp.com/project/create/', projectDetail, {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <div> 
      <Link to="/dashboard/profile">
        Profile
      </Link> <br/>
      <h1>Add New Project</h1>
      <label>Title</label>
      <input type="text" onChange={handleChange("title")}></input><br/>
      <label>Description</label>
      <input type="text" onChange={handleChange("description")}></input><br/>
      <label>Backend Repo</label>
      <input type="text" onChange={handleChange("backend_repo")}></input><br/>
      <label>Frontend Repo</label>
      <input type="text" onChange={handleChange("frontend_repo")}></input><br/>
      <label>Website</label>
      <input type="text" onChange={handleChange("website")}></input><br/>
      <label>Image</label>
      <input type="text" onChange={handleChange("image_url")}></input><br/>
      <label>Public?</label>
      {/* <input type="text" onChange={handleChange("is_public")}></input><br/> */}
      <input type="checkbox" onChange={() => setIsPublic(curr => !curr)} checked={isPublic}></input><br/>
      <button onClick={addProject}>Add project</button>
    </div>
  );
}