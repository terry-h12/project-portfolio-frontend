import { 
  useState,
  useEffect 
} from 'react';
import axios from 'axios';
import { Link, 
  // useNavigate 
} from 'react-router-dom';

// import Profile from '../Components/Profile';
import ProjectCard from '../Components/ProjectCard';

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
  const [projects, setProjects] = useState<projectDetails[]>([]);
  useEffect(() => {
    const userId = window.localStorage.getItem('user_id')
    const userProjects = async () => {
      try {
        const resp = await axios.get(`https://terry-h12-project-portfolio.herokuapp.com/project/profileprojects/?user_id=${userId}`, {
          headers:{
            'Authorization': `Token ${window.localStorage.getItem('token')}`
          },
        })
        setProjects(resp.data.results)
        console.log(resp.data)
      } catch (err) {
        console.log(err)
      }
    }

    // console.log(profileDetail)
    // profile();
    userProjects();
  },[])


  return (
    <div>
      Dashboard
      {/* <button onClick={profile}>profile</button> <br/> */}
      <br/>
      <Link to="/dashboard/addProject">
        Add New Project
      </Link>
      {/* <Profile profile={profileDetail}/> */}
      <Link to="/dashboard/profile">
        <button>Profile</button>
      </Link>
      {projects.map((project, index) => {
        return (<ProjectCard key={index} project={project}/>)
      })}
    </div>
  );
}