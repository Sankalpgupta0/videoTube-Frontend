import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Home = () => {
  const open = useSelector((state) => state.sidebarReducer.open);
  return (  
    <>
      <Navbar/>
      <div className='flex w-screen pt-[56px]'>
        <div className={`${open? "w-[24%] " : "w-[6%] "} fixed max-md:hidden`}>
          <Sidebar/>
        </div>
        <div className={`${open? "w-[76%] ml-[24%] " : "w-[94%] ml-[6%]"} bg-black/90 max-md:w-[100%] max-md:ml-[0%] sticky`}>
          <Outlet/> 
        </div>
      </div>
    </>
  )
}

export default Home