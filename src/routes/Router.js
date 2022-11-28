import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BlogDetails from '../components/BlogDetails/BlogDetails';
import CreateBlog from '../components/CreateBlog/CreateBlog';
import Home from '../components/Dashboard/Home';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import PageLayout from './PageLayout';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><PageLayout Component={Home} /></ProtectedRoute>} />
      <Route path='/view-blog/:blogId' element={<ProtectedRoute><PageLayout Component={BlogDetails} /></ProtectedRoute>} />
      <Route path='/create-blog/' element={<ProtectedRoute><PageLayout Component={CreateBlog} /></ProtectedRoute>} />
      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
    </Routes>
  )
}

export default Router;
