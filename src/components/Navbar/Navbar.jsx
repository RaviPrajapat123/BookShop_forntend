// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FaGripLines } from "react-icons/fa";
// import { useState } from 'react';
// import { useSelector } from 'react-redux';

// function Navbar() {
//   const links = [
//     {
//       title: "Home",
//       link: "/"
//     },
//     {
//       title: "All Books",
//       link: "/all-books"
//     },
//     {
//       title: "Cart",
//       link: "/cart"
//     },
//     {
//       title: "Profile",
//       link: "/profile"
//     },
//     {
//       title: "Admin Profile",
//       link: "/profile"
//     },
//   ]
//   const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
//   const role=useSelector((state)=>state.auth.role)
//   if(isLoggedIn===false){
//     links.splice(2, 2)
//   }

//   if(isLoggedIn==true && role==="user"){
//     links.splice(4, 1)
//   }
//   if(isLoggedIn==true && role==="admin"){
//     links.splice(3, 1)
//   }
//   const [MobileNav,setMobileNav]=useState("hidden")
//   return (
//     <>
//     <nav className=' relative z-50 flex items-center justify-between bg-zinc-800 text-white px-4 py-4'>
//       <Link to="/" className='flex items-center '>
//         <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo'></img>
//         <h1 className='text-2xl font-semibold'>BookHeaven</h1>
//       </Link>
//       <div className='nav-links-bookheaven block md:flex items-center gap-4'>
//         <div className='hidden md:flex gap-4'>
//           {links.map((items, i) => (
//             <div key={i}>
//               {items.title === "Profile" || items.title === "Admin Profile" ? (
//                 <Link to={items.link}
//                 className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
//                 key={i}>
//                 {items.title}
//                 </Link>
//               ):(
//                       <Link
//              to={items.link} className='hover:text-blue-500 transition-all duration-300' key={i}>
//               {items.title}

//             </Link>
//               )}
//           </div>

//           ))}
//         </div>

//         {isLoggedIn===false && (
//         <div className='hidden md:flex gap-4'>
//           <Link to="/Login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
//           <Link to="/SignUp" className='px-4 py-1 bg-blue-500  rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
//         </div>)}
//         <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={()=>MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden")}>
//           <FaGripLines />
//         </button>
//       </div>
//     </nav>
//     <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex  flex-col items-center justify-center`}>
      
//           {links.map((items, i) => (

//             <Link
//              to={items.link} className={`${MobileNav} text-white text-4xl mb-8 font semibold hover:text-blue-500 transition-all duration-300`} key={i}
//              onClick={()=>MobileNav==="hidden"? setMobileNav("block"):setMobileNav("hidden")}
//              >
//               {items.title}

//             </Link>

//           ))}
         
//           {isLoggedIn===false && (
//             <>
//             <Link to="/Login" className={`${MobileNav} px-8 text-3xl font-semibold mb-8 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 hover:text-zinc-800 transition-all duration-300`}>LogIn</Link>
//           <Link to="/SignUp" className={`${MobileNav} text-3xl font-semibold px-8 mb-8 py-2 bg-blue-500  rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
//           </>
//           )}
        
        
//     </div>
//     </>
//   )
// }

// export default Navbar



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  const authLinks = isLoggedIn
    ? role === "admin"
      ? [...baseLinks, { title: "Cart", link: "/cart" }, { title: "Admin Profile", link: "/profile" }]
      : [...baseLinks, { title: "Cart", link: "/cart" }, { title: "Profile", link: "/profile" }]
    : baseLinks;

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className='relative z-50 flex items-center justify-between bg-zinc-800 text-white px-4 py-4'>
        <Link to="/" className='flex items-center'>
          <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
          <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </Link>

        <div className='hidden md:flex items-center gap-6'>
          {authLinks.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className={`${
                item.title.includes("Profile")
                  ? 'px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800'
                  : 'hover:text-blue-500'
              } transition-all duration-300`}
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <>
              <Link to="/Login" className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</Link>
              <Link to="/SignUp" className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className='block md:hidden text-white text-2xl hover:text-zinc-400'
          onClick={toggleMobileNav}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`${mobileNavOpen ? 'block' : 'hidden'} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {authLinks.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className='text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300'
            onClick={toggleMobileNav}
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link to="/Login" className='px-8 text-3xl font-semibold mb-8 py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300' onClick={toggleMobileNav}>LogIn</Link>
            <Link to="/SignUp" className='text-3xl font-semibold px-8 mb-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' onClick={toggleMobileNav}>SignUp</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
