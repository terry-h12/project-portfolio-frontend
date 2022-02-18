import { 
  Link,
  useNavigate, 
  Outlet } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

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
      <Link to='/dashboard' style={{ textDecoration: 'none' }}>
        <Button variant="outlined">Dashboard</Button>
      </Link>
      {/* <button onClick={logout}>logout</button> */}
      <Button variant="outlined" onClick={logout}>Logout</Button>
      <Outlet />
    </>
  );
}