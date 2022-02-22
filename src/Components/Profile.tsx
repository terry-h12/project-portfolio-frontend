import { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CircularProgress } from '@mui/material'
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
  const [loading, setLoading] = useState(true);
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
        setProfileDetail(resp.data)
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }
    profile();
  }, [userId])
  return(
    <div>
      <div id="profileCard">
        <div id="profileCardInfo">
          <Avatar alt={profileDetail.first_name} src={profileDetail.profile_pic} />
          <div id="userCardText">
            <div id="profileUsername">
              {
                userId === window.localStorage.getItem('user_id') ?
                <Link to="/dashboard/editProfile">
                  {profileDetail.username}
                </Link>  : 
                <>{profileDetail.username}</>
              }
            </div>
            <div>{profileDetail.first_name} {profileDetail.last_name}</div>
          </div>
          <div id="github">
            <a href={profileDetail.github} target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
          </div>
        </div>
        { 
          !loading ? <div id="profileBio">{profileDetail.bio}</div> :
          <div id="loading">
            <CircularProgress />
          </div>
        }
      </div>
    </div>
  )
}
