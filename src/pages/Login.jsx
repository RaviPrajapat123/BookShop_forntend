// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import {authActions} from "../store/auth"
// import {useDispatch} from "react-redux"
// function Login() {
//   const navigate = useNavigate();
//    const dispatch=useDispatch()
//   const [data, setData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/sign-in", data);
//       if (res.data.success) {
//         alert("Login successful");
//         console.log(res.data)
//         dispatch(authActions.login())
//         dispatch(authActions.changeRole(res.data.role))
//         localStorage.setItem("id",res.data.id)
//         localStorage.setItem("token",res.data.token)
//         localStorage.setItem("role",res.data.role)
//         navigate("/profile"); // ya home page
//       } else {
//         alert(res.data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
//       <div className="bg-zinc-800 rounded-lg px-6 py-6 w-full sm:w-5/6 md:w-4/6 lg:w-2/6 max-w-md">
//         <p className="text-zinc-200 text-2xl font-semibold text-center">LogIn</p>

//         <div className="mt-6">
//           <label className="block text-zinc-400 mb-1">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={data.username}
//             onChange={handleChange}
//             required
//             className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your username"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="block text-zinc-400 mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//             required
//             className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter your password"
//           />
//         </div>

//         <div className="mt-6">
//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
//           >
//             Log In
//           </button>
//         </div>

//         <p className="mt-4 text-center text-zinc-500 font-medium">Or</p>
//         <p className="mt-3 text-center text-zinc-500">
//           Don't have an account?{" "}
//           <Link to="/SignUp" className="text-blue-400 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    setError(''); // clear error on input change
  };

  const handleLogin = async () => {
    if (!data.username || !data.password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/sign-in", data);
      setLoading(false);
      if (res.data.success) {
        alert("Login successful");
        dispatch(authActions.login());
        dispatch(authActions.changeRole(res.data.role));
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/profile"); // or home page
      } else {
        setError(res.data.error || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-6 py-8 w-full sm:w-5/6 md:w-4/6 lg:w-2/6 max-w-md shadow-lg">
        <h1 className="text-zinc-200 text-3xl font-semibold text-center mb-6">Log In</h1>

        <div>
          <label htmlFor="username" className="block text-zinc-400 mb-1 font-medium">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            required
            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            autoComplete="username"
            disabled={loading}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="password" className="block text-zinc-400 mb-1 font-medium">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        {error && <p className="mt-4 text-red-500 text-center font-medium">{error}</p>}

        <div className="mt-7">
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded transition 
              ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-blue-700"}`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </div>

        <p className="mt-6 text-center text-zinc-500 font-medium">Or</p>

        <p className="mt-3 text-center text-zinc-500">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
