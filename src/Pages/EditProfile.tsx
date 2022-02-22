
import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { profileDetails } from '../Components/Profile'
import { TextField, Button } from '@mui/material'
import "../App.css"
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { AddHTTP } from '../Components/Utlis';

export default function EditProfile () {
  const navigate = useNavigate();  
  const [profileDetail, setProfileDetail] = useState<profileDetails>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_pic: "",
    github: "",
    bio: "",
  })

  const handleChange = (prop: keyof profileDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    if (prop === "github") {
      event.target.value = AddHTTP(event.target.value)
    }
    setProfileDetail({ ...profileDetail, [prop]: event.target.value });
  };

  useEffect(() => {
    const profile = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/account/profile/?user_id=${window.localStorage.getItem('user_id')}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProfileDetail(resp.data)
        if (resp.data.profile_pic !== "") {
          const image = [
            {data_url: resp.data.profile_pic}
          ]
          setImage(image as never[])
        }
      } catch (err) {
        console.log(err)
      }
    }
    profile();
  }, [])

  const editProfile = async () => {
    try {
      await axios.put(`https://terry-h12-project-portfolio.herokuapp.com/account/updateaccount/`, profileDetail, {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const changePassword = async () => {
    if (profileDetail.password !== undefined) {
      try {
        await axios.put(`https://terry-h12-project-portfolio.herokuapp.com/account/changepassword/`, { "password": profileDetail.password }, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        navigate('/dashboard')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const [image, setImage] = useState([]);
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImage(imageList as never[]);
  };

  useEffect(()=> {
    if (image[0] !== undefined) {
      setProfileDetail((profileDetail) => ({...profileDetail, profile_pic: image[0]["data_url"]}))
    } else {
      setProfileDetail((profileDetail) => ({...profileDetail, profile_pic: ""}))
    }
  }, [image])

  return(
    <div>
      <div id="editProfilePage">
        <div id="editProfile">
          <div id="EditProfileTitle">Edit Profile</div>
          <div id="editProfileForm">
            <TextField id="first_name" label="First name" variant="outlined" onChange={handleChange("first_name")} value={profileDetail.first_name} />
            <TextField id="last_name" label="Last name" variant="outlined" onChange={handleChange("last_name")} value={profileDetail.last_name} />
            <TextField id="bio" label="Bio" variant="outlined" multiline rows={5} onChange={handleChange("bio")} value={profileDetail.bio} />
            <TextField id="github" label="Github" variant="outlined" onChange={handleChange("github")} value={profileDetail.github} />
            <ImageUploading
            multiple
            value={image}
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
            <Button variant="outlined" onClick={editProfile} >Change profile</Button>
          </div>
        </div>
        <div id="changePasswordBackground">
         <div id="PasswordTitle">Change Password</div>
          <div id="changePassword">
            <TextField id="password" type="password" label="New password" variant="outlined" onChange={handleChange("password")} />
            <Button variant="outlined" onClick={changePassword} >Change password</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

