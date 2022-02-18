import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

import { profileDetails } from "../Components/Profile"
import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageUploading from 'react-images-uploading';

export default function Register() {
  // interface RegisterDetails {
  //   email: string;
  //   username: string;
  //   password: string;
  //   first_name: string;
  //   last_name: string;
  //   profile_pic: string;
  //   github: string;
  //   bio: string;
  // }

  const [registerDetail, setRegisterDetail] = useState<profileDetails>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_pic: "",
    github: "",
    bio: ""
  });
  const handleChange = (prop: keyof profileDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterDetail({ ...registerDetail, [prop]: event.target.value });
  };
  
  const register = async () => {
    try {
      const resp = await axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/register/', registerDetail)
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  const [images, setImages] = useState([]);
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    
  };
  
  useEffect(()=> {
    if (images[0] !== undefined) {
      setRegisterDetail((registerDetail) => ({...registerDetail, profile_pic: images[0]["data_url"]}))
    } else {
      setRegisterDetail((registerDetail) => ({...registerDetail, profile_pic: ""}))
    }
  },[images])

  return (
    <div>
      <h1>Rego Page</h1>
      {/* <label>Email</label>
      <input type="text" onChange={handleChange("email")}></input><br/>
      <label>UserName</label>
      <input type="text" onChange={handleChange("username")}></input><br/>
      <label>Password</label>
      <input type="text" onChange={handleChange("password")}></input><br/>
      <label>First Name</label>
      <input type="text" onChange={handleChange("first_name")}></input><br/>
      <label>Last Name</label>
      <input type="text" onChange={handleChange("last_name")}></input><br/>
      <label>Profile Pic</label>
      <input type="text" onChange={handleChange("profile_pic")}></input><br/>
      <label>Github</label>
      <input type="text" onChange={handleChange("github")}></input><br/>
      <label>Bio</label>
      <input type="text" onChange={handleChange("bio")}></input><br/> */}
      <div id="regoForm">
        <TextField id="email" label="Email" variant="standard" onChange={handleChange("email")} />   
        <TextField id="username" label="Username" variant="standard" onChange={handleChange("username")} />   
        <TextField id="Password" label="Password" type="password" variant="standard" onChange={handleChange("password")} />   
        <TextField id="firstname" label="First name" variant="standard" onChange={handleChange("first_name")} />   
        <TextField id="lastname" label="Last name" variant="standard" onChange={handleChange("last_name")} />   
        {/* <TextField id="profilepic" label="profile_pic" variant="standard" onChange={handleChange("profile_pic")} /> */}
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
        <TextField id="github" label="Github" variant="standard" onChange={handleChange("github")} />   
        <TextField id="bio" label="Bio" variant="standard" onChange={handleChange("bio")} />   
        <Button variant="outlined" onClick={register}>Register</Button>
      </div>
      {/* <button onClick={register}>rego</button> */}
    </div>
  );
}