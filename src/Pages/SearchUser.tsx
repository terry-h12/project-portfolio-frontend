import { useEffect, useState } from 'react'
import axios from 'axios'
import UserCard from '../Components/UserCard'
import { TextField, CircularProgress } from '@mui/material'

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
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("")
  useEffect(() => {
    const users = async () => {
        try {
          const resp = await axios.get('https://terry-h12-project-portfolio.herokuapp.com/account/users/', {
            headers:{
              'Authorization': `Token ${window.localStorage.getItem('token')}`
            },
          })
          let users = resp.data.results
          setUsers(users)
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err)
        }
      }
      users();
    }, [])
  
  return(
    <div>
      <div id="userSearchbar">
        <TextField placeholder="Search Username" onChange={event => setQuery(event.target.value)} />
      </div>
      <div id="userList">
        {
          !loading ?
          users.filter(user => !query || user.username.toLowerCase().includes(query.toLowerCase())
          ).map((user, index) => {
            return (<UserCard key={index} user={user}/>)
          }):
          <div id="loading">
            <CircularProgress />
          </div>
        }
      </div>
    </div>
  )
}
