import { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import UserCard from '../Components/UserCard'

export interface UserDetails {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  github: string;
  bio: string;
  pk: string;
}

export default function SearchUser() {
  const [users, setUsers] = useState<UserDetails[]>([])
  useEffect(() => {
    const users = async () => {
        try {
          const resp = await axios.get('https://terry-h12-project-portfolio.herokuapp.com/account/users/', {
            headers:{
              'Authorization': `Token ${window.localStorage.getItem('token')}`
            },
          })
          console.log(resp.data)
          // resp.data.results
          let users = resp.data.results

          // const curr_user = window.localStorage.getItem('user_id');

          // Removes the current user from the list
          users.forEach((user: UserDetails, index: number) => {
            if (user.pk.toString() === window.localStorage.getItem('user_id')) {
              delete users[index]
            } 
          })
        
          // for(let i = 0; i < res.length; i++) {
          //   console.log(res[i].pk)
          // }
          // delete res[window.localStorage.getItem('user_id')]
          // res = res.filter(user => user !== window.localStorage.getItem('user_id'))
          // console.log(users)
          setUsers(users)
          // setProfileDetail(resp.data)
          // console.log(profileDetail)
        } catch (err) {
          console.log(err)
        }
      }
      users();
    }, [])
  
  return(
    <div>
      {users.map((user, index) => {
        return (<UserCard key={index} user={user}/>)
      })}
    </div>
  )
}

