import { useParams } from "react-router-dom"
import Profile from "./Profile"
import ProjectList from "./ProjectList"

export default function UserPage() {
  const params = useParams();
  const userId = params.userId as string;
  return(
    <div id="dashboard">
      <div id="userProfile">
        <Profile userId={userId}/>
      </div>
      <ProjectList userId={userId}/>
    </div>
  )
}
