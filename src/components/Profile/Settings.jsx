import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
// import SideBar from './SideBar'
// import { Outlet } from 'react-router-dom'
function Settings() {
  const[value,setValue]=useState({address: ""})
  const [profileData,setProfileData]=useState()
   const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
 }
 
  useEffect(() => {
   const fetch=async()=>{
   const respones=  await axios.get("http://localhost:3000/get-user-information",{headers})
    setProfileData(respones.data.data)
    
    setValue({address: respones.data.address})
   }
   fetch()
   
 }, [])
 
 const change=(e)=>{
    const {name,value}=e.target;
    setValue({...value,[name]:value})
 }

 const submitAddress=async()=>{
  const response=await axios.put('http://localhost:3000/update-address',value,{headers})
  alert(response.data.message)
 }
  return (
    // <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
    <>
      {!profileData && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader/>
        </div>
      )}
      {profileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>UserName</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
            </div>
            <div className=''>
              <label htmlFor=''>Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.email}</p>
            </div>
            </div>
            <div className='mt-4 flex flex-col'>
              <label htmlFor=''>Address</label>
              <textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
               rows="5"
               placeholder='Address'
               name='address'
               value={value.address}
               onChange={change}
              ></textarea>
            </div>
            <div className='mt-4 flex justify-end'>
              <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300' onClick={submitAddress}>Updata</button>
            </div>
        </div>
      )
        
      }
    {/* </div> */}
    </>
  )
}

export default Settings