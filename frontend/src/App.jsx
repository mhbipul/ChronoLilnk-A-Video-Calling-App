import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import  {Toaster} from "react-hot-toast"
import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import { axiosInstance } from './lib/axios.js'

const App = () => {
  //axios
  //set up  react query / transtack
  const {data,r} = useQuery({queryKey:['todos'],
    queryFn : async()=>{
      const res = await axiosInstance.get("/auth/me")
      return res.data 
    },
    //using retry-> false for loading only once..
    retry : false, // auth check
  });
  console.log(data);

  return (
    <div className=' h-screen' data-theme="night">
      <Toaster />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/call' element={<CallPage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />

      </Routes>
      
      </div>
    
  )
}

export default App