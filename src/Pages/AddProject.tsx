// import { Link, 
//   // useNavigate 
// } from 'react-router-dom';
import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel  } from '@mui/material'
import '../App.css'
import ImageUploading from 'react-images-uploading';
// import { ConnectingAirportsOutlined } from '@mui/icons-material';

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
  // const [image, setImage] = useState<File>();
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
    try {
      // console.log(projectDetail.image_url)
      const resp = await axios.post('https://terry-h12-project-portfolio.herokuapp.com/project/create/', projectDetail, {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    }
  }
  // const maxNumber = 69;
  const [images, setImages] = useState([]);
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    
  };
  
  useEffect(()=> {
    if (images[0] !== undefined) {
      setProjectDetail((projectDetail) => ({...projectDetail, image_url: images[0]["data_url"]}))
    } else {
      setProjectDetail((projectDetail) => ({...projectDetail, image_url: ""}))
    }
  },[images])

  return(
    <div> 
      {/* <Link to="/dashboard/profile">
        Profile
      </Link> <br/> */}
      <h1>Add New Project</h1>
      {/* <label>Title</label>
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
      <label>Public?</label> */}
      {/* <input type="text" onChange={handleChange("is_public")}></input><br/> */}
      <div id="addProjectForm">
        <TextField id="title" label="Title " variant="standard" onChange={handleChange("title")} />
        <TextField id="description" label="Description " variant="standard" onChange={handleChange("description")} />
        <TextField id="backend_repo" label="Backend Repo " variant="standard" onChange={handleChange("backend_repo")} />
        <TextField id="frontend_repo" label="Frontend Repo " variant="standard" onChange={handleChange("frontend_repo")} />
        <TextField id="website" label="Website " variant="standard" onChange={handleChange("website")} />
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
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                variant="outlined"
              >
                Click or Drop here
              </Button>
              {/* &nbsp; */}
              {/* <Button variant="outlined" onClick={onImageRemoveAll}>Remove all images</Button> */}
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
        <FormControlLabel control={<Checkbox defaultChecked onChange={() => setIsPublic(curr => !curr)} />} label="Public" />
        <Button variant="outlined" onClick={addProject} >Add project</Button>
      </div>
      
      
      {/* <input
        type="file"
        // name="myImage"
        
        onChange={(event) => {
          console.log(event);
          // setSelectedImage(event.target.files[0]);
        }}
      />

      <Button
        variant="outlined"
        component="label"
      >
        Upload File
        <input
          type="file"
          accept="image/jpeg"
          onChange={(event) => {
            console.log(event.target.files![0]);
            // setSelectedImage(event.target.files[0]);
            setImage(event.target.files![0])
          }}
          hidden
          // style = {{ display: 'none' }}
        />
      </Button> */}



      
      {/* <input type="checkbox" onChange={() => setIsPublic(curr => !curr)} checked={isPublic}></input><br/> */}
      

      {/* <button onClick={addProject}>Add project</button> */}
    </div>
  );
}