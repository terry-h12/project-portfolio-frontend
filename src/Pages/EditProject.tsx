import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { ProjectDetails } from "./AddProject";
import { TextField, Button, Checkbox, FormControlLabel, CircularProgress  } from '@mui/material'
import '../App.css'
import { useParams, useNavigate } from "react-router-dom"
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { AddHTTP } from '../Components/Utlis';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditProject() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  
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
  const [images, setImages] = useState([]);
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
    const userProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/getproject/?project_id=${projectId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProjectDetails(resp.data)
        setIsPublic(resp.data.is_public)
        if (resp.data.image_url !== "") {
          const image = [
            {data_url: resp.data.image_url}
          ]
          setImages(image as never[])
        }
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }
    userProjects();
  }, [projectId])

  const edit = async () => { 
    try {
      await axios.put('https://terry-h12-project-portfolio.herokuapp.com/project/change/', changeDetails, 
      {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
      navigate(`/dashboard/viewproject/${projectId}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (prop: keyof ProjectDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    if (prop === "backend_repo" || prop === "frontend_repo" || prop === "website") {
      event.target.value = AddHTTP(event.target.value)
    }
    setProjectDetails({ ...projectDetails, [prop]: event.target.value });
  };
 
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
  };

  useEffect(()=> {
    if (images[0] !== undefined) {
      setProjectDetails((projectDetails) => ({...projectDetails, image_url: images[0]["data_url"]}))
    } else {
      setProjectDetails((projectDetails) => ({...projectDetails, image_url: ""}))
    }
  }, [images])

  const deleteProject = async () => { 
    try {
      await axios.delete('https://terry-h12-project-portfolio.herokuapp.com/project/delete/', {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        }, 
        data: {
          "project_id": projectId
        }
      })
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <div id="EditProjectPage">
      <div id="EditProjectTitle">Edit Project</div>
      {
        !loading ? 
        <div id="EditProjectForm">
          <TextField id="title" label="Title " variant="outlined" onChange={handleChange("title")} value={projectDetails.title}/>
          <TextField id="description" label="Description" multiline rows={4} variant="outlined" onChange={handleChange("description")} value={projectDetails.description}/>
          <TextField id="frontend_repo" label="Frontend Repo " variant="outlined" onChange={handleChange("frontend_repo")} value={projectDetails.frontend_repo} />
          <TextField id="backend_repo" label="Backend Repo " variant="outlined" onChange={handleChange("backend_repo")} value={projectDetails.backend_repo} />
          <TextField id="website" label="Website " variant="outlined" onChange={handleChange("website")} value={projectDetails.website} />
          <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <span>Upload Image: </span> 
                <Button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  variant="outlined"
                >
                  Click or Drop here
                </Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" width="70%" />
                    <div className="image-item__btn-wrapper">
                      <Button size="small" variant="outlined" onClick={() => onImageUpdate(index)}>Update</Button>
                      &nbsp;
                      <Button size="small" color="error" variant="outlined" onClick={() => onImageRemove(index)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <FormControlLabel control={<Checkbox checked={isPublic} onChange={() => setIsPublic(curr => !curr)} />} label="Public" />
          <div>
            <Button variant="outlined" onClick={edit}><EditIcon /> Edit</Button>
            <Button variant="outlined" onClick={deleteProject} color="error"><DeleteIcon /> Delete</Button>
          </div>
        </div>
        :
        <div id="loading">
          <CircularProgress />
        </div>
      }
    </div>
  )
}
