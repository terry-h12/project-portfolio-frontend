// import { 
//   useState,
//   useEffect 
// } from 'react';
// import axios from 'axios';
import { Link, 
  // useNavigate 
} from 'react-router-dom';

// import Profile from '../Components/Profile';
// import ProjectCard from '../Components/ProjectCard';
import Profile from '../Components/Profile';
import ProjectList from '../Components/ProjectList';

export interface projectDetails {
  account_id: number;
  description: string;
  image_url: string;
  is_public: boolean;
  pk: number;
  profile_pic: string;
  time_created: string;
  title: string;
  username: string;
}

export default function DashboardApp() {
  // const [profileDetail, setProfileDetail] = useState<profileDetails>({
  //   email: "",
  //   username: "",
  //   password: "",
  //   first_name: "",
  //   last_name: "",
  //   profile_pic: "",
  //   github: "",
  //   bio: "",
  // })
  
  const userId = window.localStorage.getItem('user_id') as string;


  return (
    <div>
      Dashboard
      {/* <button onClick={profile}>profile</button> <br/> */}
      <br/>
      <Link to="/dashboard/addProject">
        Add New Project
      </Link><br/>
      {/* <Profile profile={profileDetail}/> */}
      {/* <Link to="/dashboard/profile">
        <button>Profile</button>
      </Link> */}
      
      <Link to="/dashboard/searchUsers">
        Users
      </Link>
      
      <Profile userId={userId}/>
      <Link to="/dashboard/editProfile">
        <button>Edit Profile</button>
      </Link>
      <button>Change Passowrd</button>
      <ProjectList userId={userId}/>
    </div>
  );
}