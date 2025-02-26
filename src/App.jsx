import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Tasks from './components/Tasks';
import { fetchUser } from './slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";


function App() {

  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
      <Routes>
      <Route path="/" element={user? <Navigate to={'/tasks'} /> : <Navigate to={'/login'} />} />
      <Route path="/login" element={user? <Navigate to={'/tasks'} /> : <Login />} />
      <Route path="/register" element={user? <Navigate to={'/tasks'} /> : <Register />} />
      <Route path="/tasks" element={user? <Tasks user={user}/> :<Navigate to={'/login'} />} />
    </Routes>
  )
}

export default App
