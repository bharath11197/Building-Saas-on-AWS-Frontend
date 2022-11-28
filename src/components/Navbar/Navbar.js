import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosService from '../../axiosService';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const currentPath = useLocation();
  const handleLogout = async () => {
    try {
      const apiRes = await axiosService.post(`/user/logout`);
      if (apiRes.status === 200) {
        localStorage.clear();
        navigate('/signin');
      }
    } catch (e) {
      const errorMessage = e.response?.data?.error;
      console.log(errorMessage);
    }
  }
  return (
    <section className="navbar">
      <div className="navbar__left">
        <Link to='/' className='navbar__logo'>Blogger</Link>
      </div>
      <div className="navbar__right">
        <Link to='/create-blog' className={`navbar__right--link ${currentPath.pathname === "/create-blog" ? 'active' : ''}`}>Create Blog</Link>
        <span className='navbar__right--link' onClick={handleLogout}>LOGOUT</span>
      </div>
    </section >
  )
}

export default Navbar;