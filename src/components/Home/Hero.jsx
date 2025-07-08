import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='min-h-[75vh] md:bg-gradient-to-r from-zinc-900 to-zinc-800 px-6 lg:px-24 flex flex-col md:flex-row items-center justify-between'>
      
      {/* Left Section */}
      <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
        <h1 className='text-4xl lg:text-6xl font-bold text-yellow-100 leading-tight'>
          Discover Your <span className='text-yellow-300'>Next Great Read</span>
        </h1>
        <p className='mt-4 text-lg lg:text-xl text-zinc-300'>
          Uncover captivating stories, enriching knowledge,<br className='hidden md:block' /> and endless inspiration in our curated collection of books.
        </p>
        <div className='mt-8'>
          <Link
            to="/all-books"
            className='text-yellow-100 text-lg lg:text-xl font-semibold border-2 border-yellow-100 px-8 py-3 rounded-full hover:bg-yellow-100 hover:text-zinc-900 transition-all duration-500 shadow-md hover:shadow-xl'
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className='w-full lg:w-1/2 mt-10 md:mt-0 flex items-center justify-center'>
        <img
          src="book.png"
          alt="Books"
          className='w-full max-w-md rounded-lg  hover:scale-105 transition-transform duration-300'
        />
      </div>
    </div>
  );
}

export default Hero;
