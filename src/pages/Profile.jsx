import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/Profile/SideBar'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'
function Profile() {
//  const isLoggedIn= useSelector()
const [profile ,setProfile]=useState()
 const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
 }
  useEffect(() => {
    const fetch =async()=>{
        const response=await axios.get("http://localhost:3000/get-user-information",{headers})
        setProfile(response.data.data)
    };
    fetch()
  }, [])
  
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col lg:flex-row py-8 gap-4 text-white'>
     {!profile && 
      <div className="w-full h-screen flex items-center justify-center">
     <Loader/>
     </div>
     }
      {profile && (
         <>
      <div className='w-full lg:w-1/6 h-auto  lg:h-screen'>
      <SideBar data={profile}/>
      <MobileNav/>
      </div>
      <div className='w-6/6'>
        <Outlet/>
       
      </div>
      </>
      )

      }
    </div>
      
     
  )
}

export default Profile