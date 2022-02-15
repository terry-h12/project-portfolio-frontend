

import { useParams } from "react-router-dom"
import Profile from "./Profile"
import ProjectList from "./ProjectList"



export default function UserPage() {
  const params = useParams();
  // console.log(params.userId)
  const userId = params.userId as string;
  return(
    <div>
      <Profile userId={userId}/>
      <ProjectList userId={userId}/>
    </div>
  )
}