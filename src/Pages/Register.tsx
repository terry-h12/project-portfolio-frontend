import axios from 'axios';
import { useState, ChangeEvent } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  interface RegisterDetails {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    profile_pic: string;
    github: string;
    bio: string;
  }

  const [registerDetail, setRegisterDetail] = useState<RegisterDetails>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_pic: "",
    github: "",
    bio: ""
  });
  const handleChange = (prop: keyof RegisterDetails) => (event: ChangeEvent<HTMLInputElement>) => {
    setRegisterDetail({ ...registerDetail, [prop]: event.target.value });
  };
  
  const register = async () => {
    axios.post('https://terry-h12-project-portfolio.herokuapp.com/account/register/', registerDetail)
    .then(function (response) {
      console.log(response);
      // if (response.data.response === "Registration successful!") navigate('/login');
      // else navigate('/register');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
      <h1>Rego Page</h1>
      <label>Email</label>
      <input type="text" onChange={handleChange("email")}></input><br/>
      <label>UserName</label>
      <input type="text" onChange={handleChange("username")}></input><br/>
      <label>Password</label>
      <input type="text" onChange={handleChange("password")}></input><br/>
      <label>First Name</label>
      <input type="text" onChange={handleChange("first_name")}></input><br/>
      <label>Last Name</label>
      <input type="text" onChange={handleChange("last_name")}></input><br/>
      <label>Profile Pic</label>
      <input type="text" onChange={handleChange("profile_pic")}></input><br/>
      <label>Github</label>
      <input type="text" onChange={handleChange("github")}></input><br/>
      <label>Bio</label>
      <input type="text" onChange={handleChange("bio")}></input><br/>
      <button onClick={register}>rego</button>
    </div>
  );
}