// import React, { useEffect, useState } from 'react'
// import Loader from '../components/Loader/Loader';
// import { AiFillDelete } from "react-icons/ai";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Cart() {

//   const navigate=useNavigate()
//   const [Cart, setCart] = useState();
//   const [Total, setTotal] = useState(0);
//   const [refresh, setRefresh] = useState(false);
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   }
//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get("http://localhost:3000/get-user-cart", { headers })
//       setCart(res.data.data)
//       console.log(res.data.data)
//     }
//     fetch()
//   }, [refresh])

//   const deleteItem = async (bookid) => {
//     const respones = await axios.put(`http://localhost:3000/remove-from-cart/${bookid}`, {}, { headers })
//     alert(respones.data.message)
//     setRefresh(!refresh);
//   }

//   useEffect(() => {
//     if (Cart && Cart.length > 0) {
//       let total = 0;
//       Cart.map((items) => {
//         total += items.price;
//       })
//       setTotal(total);
//       total = 0
//     }
//   }, [Cart])

//     const PlaceOrder=async()=>{
//       try{
//         const respones=await axios.post(`http://localhost:3000/place-order`,{order:Cart},{headers})
//         alert(respones.data.message)
//         navigate("/Profile/orderHistory")
//         setRefresh(!refresh);
//       }
//       catch(error){
//         console.log(error)
//       }
//     }

//   return (
//     <div className='bg-zinc-900 px-12 h-screen py-8'>
//       {!Cart && <Loader />}
//       {Cart && Cart.length === 0 && (
//         <div className='h-screen'>
//           <div className='h-[100%] flex items-center justify-center flex-col'>
//             <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>Empty Cart</h1>
//             <img src="/empty-cart-Photoroom.png" alt='empty Cart' className='lg:h-[50vh]' />
//           </div>
//         </div>
//       )}
//       {Cart && Cart.length > 0 && (
//         <>
//           <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
//           {Cart.map((items, i) => (
//             <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
//               key={i}>
//               <img src={items.url} alt='/' className='h-[10vh] md:h-[10vh] object-cover'></img>
//               <div className='w-full md:w-auto'>
//                 <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
//                 <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{items.desc.slice(0, 100)}...</p>
//                 <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{items.desc.slice(0, 65)}...</p>
//                 <p className='text-normal text-zinc-300 mt-2  block md:hidden'>{items.desc.slice(0, 100)}...</p>
//               </div>
//               <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
//                 <h2 className='text-zinc-100 text-3xl font-semibold flex'>
//                   ₹ {items.price}
//                 </h2>
//                 <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(items._id)}><AiFillDelete /></button>
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//       {Cart && Cart.length > 0 && (
//         <div className='mt-4 w-full flex items-center justify-end'>
//           <div className='p-4 bg-zinc-800 rounded'>
//             <h1 className='text-3xl text-zinc-200 font-semibold'>
//               Total Amount
//             </h1>
//             <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
//               <h2>{Cart.length} books</h2><h2>₹ {Total}</h2>
//             </div>
//             <div className='w-[100%] mt-3'>
//               <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300 duration-300'onClick={PlaceOrder}>Place your order</button>
//             </div>
//             </div>
//           </div>
//         )}
//         </div>
//       )
//       }

//       export default Cart



import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchCart = async () => {
     try {
    const res = await axios.get('http://localhost:3000/get-user-cart', { headers });
    console.log("Cart from backend:", res.data.data);
    setCart(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchCart();
  }, [refresh]);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const total = Cart.reduce((sum, item) => sum + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:3000/remove-from-cart/${bookid}`, {}, { headers });
    alert(response.data.message);
    setRefresh(!refresh);
  };

  // const PlaceOrder = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3000/place-order`,
  //       { order: Cart },
  //       { headers }
  //     );
  //     alert(response.data.message);
  //     setRefresh(!refresh);
  //     navigate('/Profile/orderHistory');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


 const PlaceOrder = async () => {
  try {
    const response = await axios.post('http://localhost:3000/place-order', { order: Cart }, { headers });
    alert(response.data.message);
    fetchCart();  // यहाँ नया cart लाना है ताकि UI अपडेट हो जाए
    navigate('/Profile/orderHistory');
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="bg-zinc-950 min-h-screen px-6 lg:px-12 py-8">
      {!Cart && <div className='w-full h-screen flex items-center justify-center'
      ><Loader /></div>}
      {Cart && Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center text-zinc-400">
          <img src="/empty-cart-Photoroom.png" alt="Empty Cart" className="h-64 mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold">Your Cart is Empty</h1>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl font-bold text-zinc-200 mb-6">Your Cart</h1>

          <div className="space-y-6">
            {Cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row bg-zinc-800 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full lg:w-32 h-40 object-cover rounded-md"
                />

                <div className="flex-1 px-0 lg:px-6 py-4 lg:py-0">
                  <h2 className="text-xl font-semibold text-zinc-100 mb-2">{item.title}</h2>
                  <p className="text-zinc-400 text-sm">{item.desc.slice(0, 120)}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">₹ {item.price}</span>
                    <button
                      className="text-red-600 bg-red-200 px-3 py-1 rounded-md hover:bg-red-300 transition"
                      onClick={() => deleteItem(item._id)}
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <div className="bg-zinc-800 p-6 rounded-xl w-full max-w-md shadow-lg">
              <h3 className="text-2xl text-white font-semibold mb-4">Cart Summary</h3>
              <div className="flex justify-between text-zinc-300 mb-4">
                <span>{Cart.length} book(s)</span>
                <span className="font-bold">₹ {Total}</span>
              </div>
              <button
                onClick={PlaceOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
