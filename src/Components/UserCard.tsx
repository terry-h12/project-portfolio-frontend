import { Link } from "react-router-dom"
import { UserDetails } from "../Pages/SearchUser"
import Avatar from '@mui/material/Avatar';

export default function UserCard(props: {user: UserDetails}) {
  const user = props.user
  return(
    <div id="userCard">
      <div id="userCardPic">
        <Avatar alt={user.first_name} src={user.profile_pic} />
        <div id="userCardText">
          <Link to={`/dashboard/userPage/${user.pk}`}>
            {user.username}
          </Link>
          <div>
            {user.first_name} {user.last_name}
          </div>
        </div>
      </div>
    </div>
  ) 
}
