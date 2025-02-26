import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../slices/authSlice';
import { Link } from 'react-router-dom';


export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector(state => state.auth);
  const [registered, setRegistered] = useState(false);

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(register({ username, password }));
    if(register.fulfilled.match(result)){
      setRegistered(true);
      setPassword("");
      setUsername("");
    }
  }
  
  if(error.type === "register") setRegistered(false);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-8 w-96 my-25">
        <h2 className="text-2xl font-bold text-center text-gray-800">TODO App</h2>
        <p className="text-sm text-gray-500 text-center mb-6">By Mobassera Zaman</p>

        {error.type === "register" && <p className="text-red-500 text-center mb-4">{error.message}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
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
            Register
          </button>
        </form>

       {registered && <p className="text-sm text-gray-500 text-center mt-4">
          User successfully registered.{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>}
      </div>
    </div>

  )
}

