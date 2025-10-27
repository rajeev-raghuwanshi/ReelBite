import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import UserRegister from '../components/UserRegister'
import UserLogin from '../components/UserLogin'
import PartnerRegister from '../components/PartnerRegister'
import PartnerLogin from '../components/PartnerLogin'
import Home from '../general/Home'
import CreatFood from '../food-partner/CreatFood'
import ReelsPage from '../general/ReelsPage'    
import Profile from '../food-partner/Profile'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/user/register" replace />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<PartnerRegister />} />
                <Route path="/food-partner/login" element={<PartnerLogin />} />
                <Route path="/reels" element={<ReelsPage />} />
                <Route path="/creat-food" element={<CreatFood/>} />
                <Route path='/food-partner/:id' element = {<Profile></Profile>} ></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes