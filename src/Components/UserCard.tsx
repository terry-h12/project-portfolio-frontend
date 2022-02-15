import { Link } from "react-router-dom"
import { UserDetails } from "../Pages/SearchUser"

export default function UserCard(props: {user: UserDetails}) {
  // console.log(props.user)
  const user = props.user
  return(
    <div>
      <Link to={`/dashboard/userPage/${user.pk}`}>
        <h5>{user.username}</h5>
      </Link>
      {user.first_name} {user.last_name}
    </div>
  ) 
}