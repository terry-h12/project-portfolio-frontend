import { Link } from "react-router-dom"
import { UserDetails } from "../Pages/SearchUser"
import Avatar from '@mui/material/Avatar';

export default function UserCard(props: {user: UserDetails}) {
  // console.log(props.user)
  const user = props.user
  return(
    <div>
      <Avatar alt={user.first_name} src={user.profile_pic} />
      <Link to={`/dashboard/userPage/${user.pk}`}>
        <h5>{user.username}</h5>
      </Link>
      {user.first_name} {user.last_name}
    </div>
  ) 
}