
import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'

import { profileDetails } from '../Components/Profile'

export default function EditProfile () {
  
  const [profileDetail, setProfileDetail] = useState<profileDetails>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_pic: "",
    github: "",
    bio: "",
    // account_id: "",
  })

  const handleChange = (prop: keyof profileDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setProfileDetail({ ...profileDetail, [prop]: event.target.value });
  };

  // const test = {
  //   first_name: "tezzz",
  //   last_name: "huu",
  //   profile_pic: "newpic",
  //   github: "git",
  //   bio: "newbio",
  // }

  // const
  useEffect(() => {
    const profile = async () => {
        try {
          const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/account/profile/?user_id=${window.localStorage.getItem('user_id')}`, {
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
    }, [])

    const editProfile = async () => {
      try {
        const resp = await axios.put(`https://terry-h12-project-portfolio.herokuapp.com/account/updateaccount/`, profileDetail, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        console.log(resp.data)
        // setProfileDetail(resp.data)
        // console.log(profileDetail)
      } catch (err) {
        console.log(err)
      }
    }

    const changePassword = async () => {
      if (profileDetail.password !== undefined) {
        console.log(profileDetail.password)
        try {
          const resp = await axios.put(`https://terry-h12-project-portfolio.herokuapp.com/account/changepassword/`, { "password": profileDetail.password }, {
            headers:{
              'Authorization': `Token ${window.localStorage.getItem('token')}`
            },
          })
          console.log(resp.data)
          // setProfileDetail(resp.data)
          // console.log(profileDetail)
        } catch (err) {
          console.log(err)
        }
      }
    }

  return(
    <div>
      <h2>{profileDetail.username}</h2>
      {/* <input type="text" onChange={handleChange("first_name")} value={profileDetail.username}></input><br/> */}
      <label>Name</label>
      <input type="text" onChange={handleChange("first_name")} value={profileDetail.first_name}></input> 
      <input type="text" onChange={handleChange("last_name")} value={profileDetail.last_name}></input><br/>
      <label>Bio</label>
      <input type="text" onChange={handleChange("bio")} value={profileDetail.bio}></input><br/>
      <label>Github</label>
      <input type="text" onChange={handleChange("github")} value={profileDetail.github}></input><br/>
      {/* <label>Email</label>
      <input type="text" onChange={handleChange("email")} value={profileDetail.email}></input><br/> */}
      <label>Profile pic</label>
      <input type="text" onChange={handleChange("profile_pic")} value={profileDetail.profile_pic}></input><br/>
      <button onClick={editProfile}>Change profile</button>

      <h2>Change Password</h2>
      <label>Password</label>
      <input type="text" onChange={handleChange("password")} placeholder="New password"></input><br/>
      <button onClick={changePassword}>Change password</button>
    </div>
  )
}