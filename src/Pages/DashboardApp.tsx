// import { 
//   useState,
//   useEffect 
// } from 'react';
// import axios from 'axios';
import { Link, 
  // useNavigate 
} from 'react-router-dom';
import Button from '@mui/material/Button';
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
      {/* Dashboard */}
      {/* <button onClick={profile}>profile</button> <br/> */}
      {/* <br/>
      <br/> */}
      {/* <Profile profile={profileDetail}/> */}
      {/* <Link to="/dashboard/profile">
        <button>Profile</button>
      </Link> */}
      <div id="dashboard">
        <div id="userProfile">
          <Profile userId={userId}/>
          <Link to="/dashboard/editProfile" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Edit Profile</Button>
            {/* <Button variant="outlined">Change Password</Button> */}
          </Link>
          <Link to="/dashboard/addProject" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Add Project</Button>
          </Link>
        </div>
        <ProjectList userId={userId}/>
      </div>
      
    </div>
  );
}