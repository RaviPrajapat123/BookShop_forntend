import React, { useState } from 'react'
import axios from 'axios';
function AddBook() {
    const [data,setData]=useState({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:""
    })
    const [errors, setErrors] = useState({});
     const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
 }
 const change=(e)=>{
    const {name, value}=e.target;
    setData({...data,[name]:value})
     if (errors[name]) {
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

 }
 const submit = async () => {
  try {
    const response = await axios.post("http://localhost:3000/add-book", data,{headers});

    if (response.data.success) {
      console.log(response.data.message);
      setErrors({});
   

      // navigate("/Login")
    } else {
      alert(response.data.message || "Book Added failed");
         setData({
  url: "",
  title: "",
  author: "",
  price: "",
  desc: "",
  language: ""
});
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
      console.error("Book Added Error:", error);
      alert("Something went wrong");
    }
  }
};
  return (

    <div className='h-[100%]  p-0 md:p-4'>
         <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Add Book</h1>
         <div className='p-4 bg-zinc-800 rounded '>
            <div>
               <label htmlFor='' className='text-zinc-400'>
                  Image
               </label>
               <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
               placeholder='url of image'
               name='url'
               value={data.url}
               onChange={change}
               ></input>
               {errors.url && <p className='text-red-500 text-sm mt-1'>{errors.url}</p>}
            </div>
            <div className='mt-4'>
               <label htmlFor='' className='text-zinc-400'>
                  Title of book
               </label>
               <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
               placeholder='title of book'
               name='title'
               value={data.title}
               onChange={change}
               ></input>
               {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title}</p>}

            </div>
            <div className='mt-4'>
               <label htmlFor='' className='text-zinc-400'>
                  Author of book
               </label>
               <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
               placeholder='Author of book'
               name='author'
               value={data.author}
               onChange={change}
               ></input>
               {errors.author && <p className='text-red-500 text-sm mt-1'>{errors.author}</p>}

            </div>
            <div className='mt-4 flex gap-4'>
              <div className='w-3/6'>
               <label htmlFor='' className='text-zinc-400'>
                  Language
               </label>
               <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
               placeholder='Language of book'
               name='language'
               value={data.language}
               onChange={change}
               ></input>
               {errors.language && <p className='text-red-500 text-sm mt-1'>{errors.language}</p>}

               </div>
              <div className='w-3/6'>
               <label htmlFor='' className='text-zinc-400'>
                  Price
               </label>
               <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
               placeholder='Price of book'
               name='price'
               value={data.price}
               onChange={change}
               ></input>
               {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price}</p>}

               </div>
            </div>
              <div className='mt-4'>
               <label htmlFor='' className='text-zinc-400'>
                  Description of book
               </label>
               <textarea className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
               placeholder='Description of book'
               name='desc'
               rows="5"
               value={data.desc}
               onChange={change}
               ></textarea>
               {errors.desc && <p className='text-red-500 text-sm mt-1'>{errors.desc}</p>}

            </div>
            <button className='mt-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300 px-2 cursor-pointer' onClick={submit}>Add Book</button>
         </div>
    </div>
  )
}

export default AddBook