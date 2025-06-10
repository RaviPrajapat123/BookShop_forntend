import axios from 'axios'
import React,{useEffect, useState} from 'react'
import BookCard from '../BookCard/BookCard'

function Favourites() {
    const [favouriteBook,setFavouriteBook]=useState([])
     const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
 }
    useEffect(() => {
        const fetch=async()=>{
            const respones=await axios.get("http://localhost:3000/get-favourite-books",{headers})
            setFavouriteBook(respones.data.data)
        }
        fetch()
            }, [favouriteBook])
    
  return (
    <>
        {favouriteBook && favouriteBook.length===0 && <div className='text-5xl  fotn-semibold text-zinc-500 flex flex-col items-center justify-center w-full h-[100%]'>No Favourite Books
            <img src="./star1.png" alt='star' className="h-[20vh] my-8"></img>
            </div>}
        <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Favourites Books</h1>
    <div className='grid grid-cols-4 gap-4'>
        {favouriteBook && favouriteBook.map((item,i)=><div key={i} 
    ><BookCard data={item} favourite={true}/></div>)}</div>
    </>
  )
}

export default Favourites