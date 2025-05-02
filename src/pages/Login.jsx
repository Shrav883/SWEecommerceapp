import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          console.log(response.data);
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-[350px] m-auto mt-14 gap-6 p-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-2 mb-4">
        <img src={assets.logo} alt="Showtime Logo" className="h-12 mb-2" />
        <h1 className="text-2xl font-semibold text-gray-800">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</h1>
      </div>
      {currentState === 'Login' ? '' : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Username"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPasword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] text-gray-600">
        <p className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
          >
            Don't have an account? Sign Up!
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
