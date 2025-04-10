import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Movie from './pages/Movie'
import Home from './pages/home'
import About from './pages/About'
import Cart from './pages/cart'
import Login from './pages/login'
import Orders from './pages/orders'
import Selectseat from './pages/selectseat'
import Contact from './pages/contact'
import Navbar from './components/Navbar'
import MyProfile from './pages/MyProfile'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/movie' element={<Movie/>} />
        <Route path='/movie/:id' element = {<Movie/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/selectseat/:id' element={<Selectseat/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/about' element={<About />} />
      </Routes>
      <footer className="text-center mt-12 py-4 border-t">
        <p>E-Commerce Project :: Shravani Kardekar</p>
      </footer>
    </div>

  )
}

export default App
