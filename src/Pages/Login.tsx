// import { Link } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import '../App.css'; 

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
  // "password": "tezpass",
  const login = async () => {
    try {
      const resp = await axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/login/', loginDetail)
      console.log(resp.data)
      const data = resp.data
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user_id', data.user_id);
      window.localStorage.setItem('username', data.username);
      if(data.response === "Successful login!"){
        navigate('/dashboard')
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <h1>Login</h1>
      {/* <label>UserName</label>
      <input type="text" onChange={handleChange("username")}></input><br/>
      <label>Password</label>
      <input type="text" onChange={handleChange("password")}></input><br/> */}
      
      <div id="loginForm">
        <TextField id="username" label="Username" variant="standard" onChange={handleChange("username")} />
        <TextField id="password" label="Password" variant="standard" type="password" onChange={handleChange("password")} />
        <Button variant="outlined" onClick={login} >Login</Button>
      </div>
     
      {/* <button onClick={login}>log</button> */}
      
      <Link to="/register">
        Get started
      </Link>
    </div>
  );
}