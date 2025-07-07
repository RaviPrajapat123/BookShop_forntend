// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'
// import axios from 'axios';
// import BookCard from '../BookCard/BookCard';
// import Loader from '../Loader/Loader';


// function RecentlyAdded() {
//   const [data,setData]=useState();
//   useEffect(()=>{
//     const fetch=async()=>{
//       const response=await axios.get("http://localhost:3000/get-recent-books")
//       setData(response.data.data)
//       console.log(response.data.data)
//     }
//     fetch()
//   },[])
//   return (
//     <div className='mt-8 px-4'>
//         <h4 className='text-3xl text-yellow-100'>Recently add books</h4>
//         {!data && 
//         <div className='flex items-center justify-center my-8'>
//         <Loader/>
//         </div>
//         }
//         <div className='my-8 grid  grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
//           {data && data.map((items,i)=>
//           <div key={i}><BookCard data={items}/>{" "}</div>
//           )}
//         </div>
//     </div>
//   )
// }

// export default RecentlyAdded



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

function RecentlyAdded() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-recent-books");
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recent books:", err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className='mt-12 px-4 md:px-12'>
      {/* Heading */}
      <h2 className='text-3xl md:text-4xl font-semibold text-yellow-100 border-b border-yellow-100 pb-2 w-fit'>
        Recently Added Books
      </h2>

      {/* Loader */}
      {loading && (
        <div className='flex items-center justify-center my-8'>
          <Loader />
        </div>
      )}

      {/* Books Grid */}
      {!loading && data && (
        <div className='my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}

      {/* No Books Found */}
      {!loading && (!data || data.length === 0) && (
        <p className='text-yellow-200 text-xl text-center my-8'>No recent books found.</p>
      )}
    </div>
  );
}

export default RecentlyAdded;
