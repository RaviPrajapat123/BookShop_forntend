import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
function App() {
  const dispatch=useDispatch()
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])
  return (
    <div>
      {/* <Router> */}
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route  path='/all-books' element={<AllBooks />} />
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/Profile' element={<Profile/>}>
          {role==="user" ? ( <Route index element={<Favourites/>}/>):  (<Route index element={<AllOrders/>}/>)}
          {role==="admin" && <Route path="add-book" element={<AddBook/>}/>
}
          <Route path="/Profile/orderHistory" element={<UserOrderHistory/>}/>
          <Route path="/Profile/settings" element={<Settings/>}/>
          </Route>
          <Route  path='/Login' element={<Login />} />
          <Route  path='/SignUp' element={<SignUp />} />
          <Route  path='/updateBook/:id' element={<UpdateBook />} />
          <Route path='view-book-details/:id' element={<ViewBookDetails/>}/>
        </Routes>
        <Footer />
      {/* </Router> */}


    </div>
  )
}

export default App