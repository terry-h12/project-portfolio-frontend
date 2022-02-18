// import { profileDetails } from "../Pages/DashboardApp"
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

export interface profileDetails {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  github: string;
  bio: string;
}

export default function Profile(props: {userId: string}) {
  const userId = props.userId
  // console.log(userId)
  // console.log(props.profile)
  // const profile = props.profile
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
  useEffect(() => {
  const profile = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/account/profile/?user_id=${userId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        // console.log(resp.data)
        setProfileDetail(resp.data)
        // console.log(profileDetail)
      } catch (err) {
        console.log(err)
      }
    }
    profile();
  }, [userId])
  return(
    <div>
      <Avatar alt={profileDetail.first_name} src={profileDetail.profile_pic} />
      <h2>{profileDetail.username}</h2>
      <div>{profileDetail.first_name} {profileDetail.last_name}</div>
      <div>{profileDetail.bio}</div>
    </div>
  )
}