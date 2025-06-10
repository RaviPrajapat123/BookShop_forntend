import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
function SignUp() {
  const navigate=useNavigate()
  const[values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:""
  })
  const [errors, setErrors] = useState({});

  const change=(e)=>{
    const {name ,value}=e.target;
    setValues({...values,[name]:value})
    
  }

const submit = async () => {
  try {
    const response = await axios.post("http://localhost:3000/sign-up", values);

    if (response.data.success) {
      alert("Signup successful!");
      setErrors({});
      navigate("/Login")
    } else {
      alert(response.data.message || "Signup failed");
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Yup validation ke errors ko frontend ke liye format karna
      const formattedErrors = {};
      error.response.data.errors.forEach(err => {
        const [field] = err.split(' ');
        formattedErrors[field.toLowerCase()] = err;
      });
      setErrors(formattedErrors);
    } else if (error.response) {
      alert(error.response.data.error || error.response.data.message);
    } else {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  }
};


  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
        <div className='bg-zinc-800  rounded-lg px-8  py-5 w-full md:w-3/6  lg:w-2/6'>
          <p className='text-zinc-200 text-xl'>Sign UP</p>
          <div className='mt-4'>
            <div>
              <label htmlFor='' className='text-zinc-400'>Username</label>
              <input type='text'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={values.username}
              onChange={change}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

            </div>
          </div>
          <div className='mt-4'>
            <div>
              <label htmlFor='' className='text-zinc-400'>Email</label>
              <input type='email'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='xyz@gmail.com'
              name='email'
              required
               value={values.email}
              onChange={change}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className='mt-4'>
            <div>
              <label htmlFor='' className='text-zinc-400'>Password</label>
              <input type='password'
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='password'
              name='password'
              required
               value={values.password}
              onChange={change}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>
          <div className='mt-4'>
            <div>
              <label htmlFor='' className='text-zinc-400'>Address</label>
              <textarea
              className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
              placeholder='address'
              name='address'
              // cols={5}
              rows={5}
              required
               value={values.address}
              onChange={change}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600' onClick={submit}>Sign Up</button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-500  font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center justify-center text-zinc-500 '>Already an account? &nbsp; 
            <Link to={"/Login"} className='hover:text-blue-500'><u>LogIn</u></Link>
          </p>
        </div>
    </div>
  )
}

export default SignUp