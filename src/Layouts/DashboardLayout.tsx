import { Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import "../App.css"
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

export default function DashboardLayout() {
  const navigate = useNavigate();  
  const logout = async () => {
    try {
      const resp = await axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/logout/', null, {
        headers:{
          'Authorization': `Token ${window.localStorage.getItem('token')}`
        },
      })
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
      <Button variant="outlined" onClick={logout} className="dashboardLayout"><LogoutIcon/>Logout</Button>
      <Link to='/dashboard' style={{ textDecoration: "none" }}>
        <Button variant="outlined"><DashboardIcon/>Dashboard</Button>
      </Link>
      <Link to="/dashboard/searchUsers" style={{ textDecoration: "none" }}>
        <Button variant="outlined"><SearchIcon/> Users</Button>
      </Link>
      <Link to="/dashboard/about" style={{ textDecoration: "none" }}>
        <Button variant="outlined"><InfoIcon/> About</Button>
      </Link>
      <Outlet />
    </>
  );
}
