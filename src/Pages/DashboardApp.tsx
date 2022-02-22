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
  const userId = window.localStorage.getItem('user_id') as string;

  return (
    <div id="dashboard">
      <div id="userProfile">
        <Profile userId={userId}/>
      </div>
      <ProjectList userId={userId}/>
    </div>
  );
}
