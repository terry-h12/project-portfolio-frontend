import { 
  // Link,
  useNavigate, 
  Outlet } from 'react-router-dom';
import axios from 'axios';


export default function DashboardLayout() {
  const navigate = useNavigate();  
  const logout = async () => {
    axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/logout/', null, {
      headers:{
        'Authorization': `Token ${window.localStorage.getItem('token')}`
      },
    })
    .then(function (response) {
      console.log(response);
      if(response.data === "Successfully Logged Out"){
        navigate('/login');
        window.localStorage.removeItem('token');
      } else {
        navigate('/dashboard/profile')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <button onClick={logout}>logout</button>
      <Outlet />
    </>
  );
}