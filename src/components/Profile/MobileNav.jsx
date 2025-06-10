import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux';

function MobileNav() {
      const role=useSelector((state)=>state.auth.role)
    
  return (
     <>
     {role==="user" && (
        <div className='w-full lg:hidden flex items-center justity-between mt-4'>
          <Link to="/Profile" className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'>Favourites</Link>

            <Link to="/Profile/orderHistory" className='text-zinc-100  font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all'>Order History</Link>

            <Link to="/Profile/settings" className='text-zinc-100  font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all'>Settings</Link>
    </div>
    
     )}
     {role==="admin" && (
        <div className='w-full lg:hidden flex items-center justity-between mt-4'>
          <Link to="/Profile" className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300'>All Orders</Link>

            <Link to="/Profile/add-book" className='text-zinc-100  font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all'>Add Book</Link>

    </div>
    
     )}
     </>
  )
}

export default MobileNav