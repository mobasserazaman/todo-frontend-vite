import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { Link } from "react-router-dom";


export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, error } = useSelector(state => state.auth);
  console.log(user);
  console.log(error);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-8 w-96 my-25">
        <h2 className="text-2xl font-bold text-center text-gray-800">TODO App</h2>
        <p className="text-sm text-gray-500 text-center mb-6">By Mobassera Zaman</p>

        {error.type === "login" && <p className="text-red-500 text-center mb-4">{error.message}</p>}

        <form onSubmit={handleLogin} className="space-y-4">

          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>

  )
}

