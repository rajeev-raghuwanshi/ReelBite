import React from 'react'
import AuthForm from './AuthForm'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const UserRegister =() => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    const fullname = data.fullName;
    const email = data.email;
    const password = data.password;
    const res = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullname,
        email,
        password
    },{
      withCredentials : true, // why this is required, and if we use fetch 
    })
   console.log(res.data);
    console.log('User Register data', data)
    navigate('/');
    // hook up API call here
    alert('User registered (mock)')
  }

  return (
    <AuthForm
      title="User Register"
      submitLabel="Register"
      showName={true}
      onSubmit={handleSubmit}
      altRoute="/food-partner/register"
      altLabel="Register/Login as Food Partner"
    />
  )
}

export default UserRegister
