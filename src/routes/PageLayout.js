import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const PageLayout = ({ Component }) => {
  return (
    <>
      <Navbar />
      <Component />
    </>
  )
}

export default PageLayout;