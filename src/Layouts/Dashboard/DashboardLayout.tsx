import { 
  // Link,
  useNavigate, 
  Outlet, 
  Link} from 'react-router-dom';
import axios from 'axios';

export default function DashboardLayout() {
  const navigate = useNavigate();  
  const logout = async () => {
    try {
      const resp = await axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/logout/', null, {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
      console.log(resp.data)
      if(resp.data === "Successfully Logged Out"){
        navigate('/login');
        window.localStorage.removeItem('token');
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Link to='/dashboard'>
        <button>Dashboard</button>
      </Link>
      <button onClick={logout}>logout</button>
      <Outlet />
    </>
  );
}