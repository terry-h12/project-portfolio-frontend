// import { Link } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, CircularProgress } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../App.css'; 

export default function Login() {
  const [loading, setLoading] = useState(false);
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

  const login = async () => {
    setLoading(true)
    try {
      const resp = await axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/login/', loginDetail)
      setLoading(false);
      const data = resp.data
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user_id', data.user_id);
      window.localStorage.setItem('username', data.username);
      if(data.response === "Successful login!"){
        navigate('/dashboard')
      }
    } catch (err) {
      setLoading(false);
      console.log(err)
    }
  }
  
  const ColourButton = styled(Button)<ButtonProps>(() => ({
    color: "#FBFBFB",
    backgroundColor: "#00C0D0",
    '&:hover': {
      backgroundColor: "#8DE0E0",
    },
  }));

  const ColourRegoButton = styled(Button)<ButtonProps>(() => ({
    color: "#FBFBFB",
    backgroundColor: "#9EE362",
    '&:hover': {
      backgroundColor: "#BBF0D6",
    },
  }));

  return (
    <>
      <div id="loginPage">
        <div id="loginTitle">Login</div>
        <div id="loginForm">
          <TextField id="username" label="Username" variant="outlined" onChange={handleChange("username")} />
          <TextField id="password" label="Password" variant="outlined" type="password" onChange={handleChange("password")} />
        </div>
        <ColourButton variant="contained" onClick={login} id="LoginButton">Login</ColourButton>
        <hr className="solid" />
        <Link to="/register" style={{ textDecoration: "none" }}>
          <ColourRegoButton id="LoginButton">Create Account</ColourRegoButton>
        </Link>
        {
          loading ? <div id="loading"><CircularProgress /></div> : <></>
        }
      </div>
      <div id="loginBackground">
        <div id="loginInfo">Project Portfolio Manager</div>
        <div id="loginText">A project by Terence Huang</div>
      </div>
    </>
  );
}
