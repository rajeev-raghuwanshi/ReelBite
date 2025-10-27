import React from 'react'
import AuthForm from './AuthForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
   const navigate = useNavigate();
  const handleSubmit = async (data) => {
    const fullname = data.fullName;
    const email = data.email;
    const password = data.password;
    const res = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password
    },{
      withCredentials : true, // why this is required, and if we use fetch 
    })
   console.log(res.data);
     
    navigate('/');
    // hook up API call here
     
    console.log('User Login data', data)
    // hook up API call here
    alert('User login (mock)')
  }

  return (
    <AuthForm
      title="User Login"
      submitLabel="Login"
      showName={false}
      onSubmit={handleSubmit}
      altRoute="/food-partner/login"
      altLabel="Register/Login as Food Partner"
    />
  )
}

export default UserLogin
