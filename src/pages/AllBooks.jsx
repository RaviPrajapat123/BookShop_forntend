// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import axios from 'axios';
// import Loader from '../components/Loader/Loader'
// import BookCard from '../components/BookCard/BookCard'
// function AllBooks() {
//     const [data,setData]=useState();
//     useEffect(()=>{
//       const fetch=async()=>{
//         const response=await axios.get("http://localhost:3000/get-all-book")
//         setData(response.data.data)
//         console.log(response.data.data)
//       }
//       fetch()
//     },[])
//   return (
    
//     <div className='bg-zinc-900 h-auto px-12 py-8'>
//       <h4 className='text-3xl text-yellow-100'>All books</h4>
//         {!data && 
//        <div className='w-full h-screen flex items-center justify-center'
//       ><Loader /></div>
//         }
//         <div className='my-8 grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
//           {data && data.map((items,i)=>
//           <div key={i}><BookCard data={items}/>{" "}</div>
//           )}
//         </div>
//     </div>
//   )
// }

// export default AllBooks

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import { motion } from 'framer-motion';

function AllBooks() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const booksPerPage = 8;

  // Fetch all books
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-all-book");
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books", err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Filter data based on search only
  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [search, data]);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredData.length / booksPerPage);

  return (
    <div className="bg-zinc-900 min-h-screen px-6 md:px-12 py-8 text-white">
      <h4 className="text-3xl text-yellow-100 mb-6">All Books</h4>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or author"
        className="w-full max-w-md px-4 py-2 rounded-lg mb-6 text-zinc-800 bg-zinc-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loader */}
      {loading && (
        <div className="w-full h-64 flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* No Results Message */}
      {!loading && filteredData.length === 0 && (
        <div className="text-center text-zinc-300 text-lg my-12">No books found.</div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading &&
          currentBooks.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <BookCard data={item} />
            </motion.div>
          ))}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBooks;
