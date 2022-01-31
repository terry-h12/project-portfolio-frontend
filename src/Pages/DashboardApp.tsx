import { 
  useState,
  useEffect 
} from 'react';
import axios from 'axios';
import { Link, 
  // useNavigate 
} from 'react-router-dom';

export default function Dashboard() {
  // interface profileDetails {
  //   email: string;
  //   username: string;
  //   password: string;
  //   first_name: string;
  //   last_name: string;
  //   profile_pic: string;
  //   github: string;
  //   bio: string;
  // }

  const [profileDetail, setProfileDetail] = useState({})
  const profile = async () => {
    axios.get(`https://terry-h12-project-portfolio.herokuapp.com/account/profile/?user_id=${window.localStorage.getItem('user_id')}`, {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response)
      setProfileDetail(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  useEffect(() => {
    console.log(profileDetail)
  },[profileDetail])


  return (
    <div>
      Dashboard
      <button onClick={profile}>profile</button> <br/>
      <Link to="/dashboard/addProject">
        Add New Project
      </Link>
    </div>
  );
}