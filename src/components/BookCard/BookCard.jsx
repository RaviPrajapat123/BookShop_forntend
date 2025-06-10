// import axios from 'axios'
// import React from 'react'
// import { Link } from 'react-router-dom'

// function BookCard({data,favourite}) {
//      const headers={
//   id:localStorage.getItem("id"),
//   authorization:`Bearer ${localStorage.getItem("token")}`,
//   bookid:data._id
//  }
//     const hadleRemoveBook=async()=>{
//             const response=await axios.put("http://localhost:3000/remove-book-from-favourite",{},{headers})
//             alert(response.data.message)
//     }
//   return (
//         <div className='bg-zinc-800 rounded p-4 flex flex-col'>
//         <Link to={`/view-book-details/${data._id}`}>

//             <div className=''>
//                 <div className='bg-zinc-900 rounded flex  items-center justify-center'>
//                     <img src={data.url} alt="/" className='h-[25vh]'/>
//                 </div>
//                     <h2 className='mt-4 text-xl text-white font-semibold'>{data.title}</h2>
//                     <p className='mt-2 text-zinc-400  font-semibold'>by {data.author}</p>
//                     <p className='mt-2 text-zinc-200  font-semibold text-xl'>₹ {data.price}</p>
//             </div>
//         </Link>
//                     {favourite && (<button className='bg-yellow-50  px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={hadleRemoveBook}>Remove from favourite</button>)}
//         </div>
// )
// }

// export default BookCard



import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ data, favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  }

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put("http://localhost:3000/remove-book-from-favourite", {}, { headers })
      alert(response.data.message)
    } catch (error) {
      console.error("Error removing from favourite", error)
      alert("Failed to remove from favourite")
    }
  }

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
      <Link to={`/view-book-details/${data._id}`} className="group">
        <div className="bg-zinc-200 flex items-center justify-center overflow-hidden h-[25vh] sm:h-[30vh] md:h-[30vh]">
          <img
            src={data.url}
            alt={data.title}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold truncate">{data.title}</h2>
          <p className="mt-1 text-zinc-400 font-medium truncate">by {data.author}</p>
          <p className="mt-2 text-yellow-400 font-bold text-lg sm:text-xl">₹ {data.price}</p>
        </div>
      </Link>

      {favourite && (
        <button
          onClick={handleRemoveBook}
          className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-semibold py-2 rounded-b-lg border-t border-yellow-400 transition-colors duration-300"
        >
          Remove from favourite
        </button>
      )}
    </div>
  )
}

export default BookCard
