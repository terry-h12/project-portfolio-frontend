import axios from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
import { profileDetails } from "../Components/Profile"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useNavigate, Link } from "react-router-dom"
import { AddHTTP } from '../Components/Utlis';
import LoginIcon from '@mui/icons-material/Login';

export default function Register() {
  const navigate = useNavigate(); 
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
    if (prop === "github") {
      event.target.value = AddHTTP(event.target.value)
    }
    setRegisterDetail({ ...registerDetail, [prop]: event.target.value });
  };
  
  const register = async () => {
    try {
      await axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/register/', registerDetail)
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  const [images, setImages] = useState([]);
  const onChange = (imageList: ImageListType, addUpdateIndex:  number[] | undefined) => {
    setImages(imageList as never[]);
    
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
      <Link to="/" id="RegoToLogin">
        <LoginIcon id="BackToLogin"/>
      </Link>
      <div id="regoPage">
        <div id="regoTitle">Register Account</div>
        <div id="regoForm">
          <TextField id="email" label="Email" variant="outlined" onChange={handleChange("email")} />   
          <TextField id="username" label="Username" variant="outlined" onChange={handleChange("username")} />   
          <TextField id="Password" label="Password" type="password" variant="outlined" onChange={handleChange("password")} />   
          <TextField id="firstname" label="First name" variant="outlined" onChange={handleChange("first_name")} />   
          <TextField id="lastname" label="Last name" variant="outlined" onChange={handleChange("last_name")} />   
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
                <span>Profile picture: </span>
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
          <TextField id="github" label="Github" variant="outlined" onChange={handleChange("github")} />   
          <TextField id="bio" multiline rows={5} label="Bio" variant="outlined" onChange={handleChange("bio")} />   
          <Button variant="outlined" onClick={register}>Register</Button>
        </div>
      </div>
      <div id="regoBackground"></div>
    </div>
  );
}
