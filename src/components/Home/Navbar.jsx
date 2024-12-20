import React, { useState } from 'react'
import { FaBarsProgress } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { toggle } from '../../store+slice/sidebar.slice';
import { FaSearch } from "react-icons/fa";
import { PiVideoLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setSearch } from '../../store+slice/videoOptions.slice';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const enableSeacher = useSelector(state => state.videoOptionsReducer.enableSeacher)

    return (
        <>
            <div className='w-screen h-[56px] bg-black/90 flex justify-between items-center px-10 fixed top-0 z-10' >
                <FaBarsProgress
                    className='max-md:hidden'
                    id='openSideBar'
                    color='gray'
                    size="30px"
                    onClick={
                        (e) => {
                            dispatch(toggle())
                        }
                    }
                />

                <FaBarsProgress
                    className='md:hidden'
                    id='openSideBar'
                    color='gray'
                    size="30px"
                    onClick={
                        (e) => {
                            navigate('/sidebar')
                        }
                    }
                />
                <div id='searchbar' className='w-1/2 flex items-center rounded-xl overflow-hidden bg-white px-3'>
                    <div className=''><FaSearch color='black' size={24} /></div>
                    <input
                        type="text"
                        placeholder='Search...'
                        className={`h-[40px] w-full px-5 border-none outline-none ${enableSeacher?"":" cursor-not-allowed"}`}
                        disabled={!enableSeacher}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </div>
                <h1
                    id="logo"
                    onClick={() => navigate('/')}
                    className='text-white text-xl flex items-center max-md:text-sm cursor-pointer max-sm:hidden'>
                    <PiVideoLight color='purple' size={30} className='mr-1'/> Video-Tube
                </h1>
            </div>
            <hr className='text-white ' />
        </>
    )
}

export default Navbar
