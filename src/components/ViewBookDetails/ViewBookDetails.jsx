// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import axios from 'axios';
// import { GrLanguage } from "react-icons/gr";
// import { FaHeart } from "react-icons/fa";
// import Loader from '../Loader/Loader';
// import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteOutline } from "react-icons/md";

// function ViewBookDetails() {
//     const {id}=useParams()
//     // console.log("id=",id)
//       const [data,setData]=useState();
//      const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn)
//       const role= useSelector((state)=>state.auth.role)
//       // console.log("first",isLoggedIn)
//       // console.log("role",role)
//         useEffect(()=>{
//           const fetch=async()=>{
//             const response=await axios.get(`http://localhost:3000/get-book-by-id/${id}`)
//             setData(response.data.data)
//             // console.log("res=",response.data.data)
//           }
//           fetch()
//         },[])
//          const headers={
//   id:localStorage.getItem("id"),
//   authorization:`Bearer ${localStorage.getItem("token")}`,
//   bookid:id,
//  }
//         const handleFavourite=async()=>{
//             const respones=await axios.put(`http://localhost:3000/add-book-to-favourite`,{},{headers})
//             alert(respones.data.message)
//         }
//     const handleCart=async()=>{
//       const response=await axios.put("http://localhost:3000/add-to-cart",{},{headers})
//       alert(response.data.message)
//     }
//   return (
//         <>
//             {data &&  (<div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-center '>
//         <div className='   w-full lg:w-3/6 '>{" "}
//         <div className='flex flex-col lg:flex-row  justify-around bg-zinc-800 rounded p-12 '>
//           <img src={data.url} alt='/' className='  h-[50vh] md:h-[60vh] lg:h-[70vh] rounded '/>
//          {isLoggedIn ===true && role==="user" && (
//           <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start  mt-4 lg:mt-0 '>
//           <button className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex itmes-center justify-center' onClick={handleFavourite}><FaHeart /> <span className='ms-4 lg:hidden'>Favourate</span>
//             </button>
//             <button className='text-white rounded mt-8  md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-blue-500  flex items-center justify-center' onClick={handleCart}><FaShoppingCart /> <span className='ms-4 lg:hidden'>Add to cart</span></button>
//         </div>
//          )}
//          {isLoggedIn ===true && role==="admin" && (
//           <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start  mt-4 lg:mt-0 '>
//           <button className='bg-white rounded lg:rounded-full text-3xl p-3 text-black-500 flex itmes-center justify-center'><FaEdit /> <span className='ms-4 lg:hidden'>Edit</span>
//             </button>
//             <button className='text-white rounded lg:rounded-full text-3xl p-3 mt-8  md:mt-0lg:mt-8 bg-white  flex items-center justify-center'><MdDeleteOutline /> <span className='ms-4 lg:hidden'>Delete Book</span></button>
//         </div>
//          )}
//         </div>
//         </div>
//         <div className='p-4 w-full lg:w-3/6'>
//         <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
//         <p className=' text-zinc-400 mt-1'>by {data.author}</p>
//         <p className=' text-zinc-500 mt-4 text-xl'>by {data.desc}</p>
//         <p className='flex items-center justify-start text-zinc-400 mt-4'>
//             <GrLanguage className="me-3"/> {data.language}</p>
//         <p className=' text-zinc-100 mt-4 text-3xl font-semibold'>
//            Price : ₹ {data.price}</p>
//         </div>
//     </div>)}
//             {!data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/></div>}
//         </>
//   )
// }

// export default ViewBookDetails


import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { GrLanguage } from "react-icons/gr"
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'

function ViewBookDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const navigate=useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-book-by-id/${id}`)
        setData(response.data.data)
      } catch (error) {
        console.error("Error fetching book details:", error)
      }
    }
    fetchData()
  }, [id])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }

  const handleFavourite = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/add-book-to-favourite`, {}, { headers })
      alert(response.data.message)
    } catch (error) {
      console.error("Error adding favourite:", error)
    }
  }

  const handleCart = async () => {
    try {
      const response = await axios.put("http://localhost:3000/add-to-cart", {}, { headers })
      alert(response.data.message)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const deleteBox=async()=>{
    let a=confirm("Do you want delete book Confirm")
    if(a){

      const response=await axios.delete("http://localhost:3000/delete-book",{headers})
      alert(response.data.message)
      navigate('/all-books')
    }
  }
  return (
    <>
      {!data && (
        <div className='h-screen bg-zinc-900 flex items-center justify-center'>
          <Loader />
        </div>
      )}

      {data && (
        <div className='px-4 sm:px-8 md:px-12 lg:px-16 py-8 bg-zinc-900 min-h-screen flex flex-col lg:flex-row gap-10 items-center'>
          {/* Left side: Image + Buttons */}
          <div className='w-full lg:w-1/2 bg-zinc-800 rounded-xl p-6 sm:p-8 flex flex-col items-center shadow-lg'>
            <img
              src={data.url}
              alt={data.title}
              className='rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-cover mb-6'
            />

            {/* Buttons for Users */}
            {isLoggedIn && role === "user" && (
              <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center'>
                <button
                  onClick={handleFavourite}
                  className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition duration-300 shadow-md flex-1 sm:flex-none'
                  aria-label="Add to Favourite"
                >
                  <FaHeart size={20} /> 
                  <span className='hidden sm:inline'>Favourite</span>
                </button>
                <button
                  onClick={handleCart}
                  className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition duration-300 shadow-md flex-1 sm:flex-none'
                  aria-label="Add to Cart"
                >
                  <FaShoppingCart size={20} /> 
                  <span className='hidden sm:inline'>Add to Cart</span>
                </button>
              </div>
            )}

            {/* Buttons for Admin */}
            {isLoggedIn && role === "admin" && (
              <div className='flex flex-col gap-4 w-full sm:w-auto sm:flex-row sm:gap-6 justify-center'>
                <Link to={`/updateBook/${id}`}
                  className='flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-6 py-3 rounded-full transition duration-300 shadow-md flex-1 sm:flex-none'
                  aria-label="Edit Book"
                >
                  <FaEdit size={20} /> 
                  <span className='hidden sm:inline'>Edit</span>
                </Link>
                <button
                  className='flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-full transition duration-300 shadow-md flex-1 sm:flex-none'
                  aria-label="Delete Book" onClick={deleteBox}
                >
                  <MdDeleteOutline size={22} /> 
                  <span className='hidden sm:inline'>Delete Book</span>
                </button>
              </div>
            )}
          </div>

          {/* Right side: Book Details */}
          <div className='w-full lg:w-1/2 text-zinc-300'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3'>{data.title}</h1>
            <p className='text-lg sm:text-xl text-zinc-400 mb-2'>by <span className='italic'>{data.author}</span></p>
            <p className='text-base sm:text-lg text-zinc-400 mb-6 leading-relaxed'>{data.desc}</p>

            <p className='flex items-center text-zinc-400 mb-6 space-x-2 text-sm sm:text-base'>
              <GrLanguage size={18} />
              <span>{data.language}</span>
            </p>

            <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-100'>
              Price: <span className='text-green-400'>₹ {data.price}</span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewBookDetails
