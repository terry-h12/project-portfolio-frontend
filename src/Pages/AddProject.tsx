import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel  } from '@mui/material'
import '../App.css'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useNavigate } from "react-router-dom"
import { AddHTTP } from '../Components/Utlis';

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
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); 
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
    if (prop === "backend_repo" || prop === "frontend_repo" || prop === "website") {
      event.target.value = AddHTTP(event.target.value)
    }
    setProjectDetail({ ...projectDetail, [prop]: event.target.value });
  };

  useEffect(()=> {
    setProjectDetail((projectDetail) => ({...projectDetail, is_public: isPublic}))
  },[isPublic])

  const addProject = async () => {
    try {
      await axios.post('https://terry-h12-project-portfolio.herokuapp.com/project/create/', projectDetail, {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
    
  };
  
  useEffect(()=> {
    if (images[0] !== undefined) {
      setProjectDetail((projectDetail) => ({...projectDetail, image_url: images[0]["data_url"]}))
    } else {
      setProjectDetail((projectDetail) => ({...projectDetail, image_url: ""}))
    }
  }, [images])

  return(
    <div id="AddProjectPage"> 
      <div id="AddProjectTitle">Add New Project</div>
      <div id="AddProjectForm">
        <TextField id="title" label="Title " variant="outlined" onChange={handleChange("title")} />
        <TextField id="description" label="Description" multiline rows={3} variant="outlined" onChange={handleChange("description")} />
        <TextField id="frontend_repo" label="Frontend Repo " variant="outlined" onChange={handleChange("frontend_repo")} />
        <TextField id="backend_repo" label="Backend Repo " variant="outlined" onChange={handleChange("backend_repo")} />
        <TextField id="website" label="Website " variant="outlined" onChange={handleChange("website")} />
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
                    <Button size="small" variant="outlined" onClick={() => onImageRemove(index)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        <FormControlLabel control={<Checkbox defaultChecked onChange={() => setIsPublic(curr => !curr)} />} label="Display publicly?" />
        <Button variant="outlined" onClick={addProject} >Add project</Button>
      </div>
    </div>
  );
}
