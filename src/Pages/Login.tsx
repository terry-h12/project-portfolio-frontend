// import { Link } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, 
  useNavigate 
} from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();  
  interface loginDetails {
    username: string;
    password: string;
  }
  const [loginDetail, setLoginDetail] = useState<loginDetails>({
    username: "",
    password: ""
  });
  const handleChange = (prop: keyof loginDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setLoginDetail({ ...loginDetail, [prop]: event.target.value });
  };
  //"username": "tezzza",
  // "password": "tezzzpassword",
  const login = async () => {
    axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/login/', {
      "username": loginDetail.username,
      "password": loginDetail.password
    })
    .then(function (response) {
      window.localStorage.setItem('token', response.data.token);
      // window.localStorage.setItem('user_id', response.data.user_id);
      // window.localStorage.setItem('username', response.data.username);
      // window.localStorage.setItem('is_org', response.data.is_org);
      // window.localStorage.setItem('profile_pic', response.data.profile_pic);
      // window.localStorage.setItem('email', response.data.email);
      // window.localStorage.setItem('first', response.data.first_name);
      // window.localStorage.setItem('last', response.data.last_name);
      if(response.data.response === "Successful login!"){
        navigate('/dashboard/profile')
      } 
      // else {
      //   navigate('/login')
      // }
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <label>UserName</label>
      <input type="text" onChange={handleChange("username")}></input><br/>
      <label>Password</label>
      <input type="text" onChange={handleChange("password")}></input><br/>
      <button onClick={login}>log</button>
     
      <Link to="/register">
        Get started
      </Link>
    </div>
  );
}