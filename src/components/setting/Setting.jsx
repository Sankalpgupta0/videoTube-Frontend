import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { logout } from '../../store+slice/auth.slice.js';
import { useDispatch } from 'react-redux';
import UpdateInfo from './UpdateInfo.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { setCurrentUrl } from '../../store+slice/videoOptions.slice.js';

const Setting = () => {
    const [select, setSelect] = useState("dark");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        const url = '/api/users/logout'
        const response = await axios.post(url)
            .then((res) => {
                console.log(res.data.message)
                dispatch(logout())
                navigate("/login")
            })
    }

    const notifyError = ({ message }) => {
        toast.error("Invalid old password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    useEffect(() => {
        dispatch(setCurrentUrl())
    },[])

    return (
        <div className='w-full h-[100vh] py-10 flex justify-center items-center ' >
            <div className='w-2/3 h-2/3 bg-black/90 max-md:w-full rounded-2xl px-5 flex flex-col'>
                <UpdateInfo toast={notifyError}/>
                <div className="theme flex justify-between px-10 text-white my-10  text-xl items-center">
                    <p>Theme</p>
                    <select
                        name="theme"
                        value={select}
                        onChange={(e) => {
                            setSelect(e.target.value)
                        }}
                        className='  outline-none border-none px-5 py-1 rounded-xl text-black text-xl'
                    >
                        <option value="light" > Light</option>
                        <option value="dark" defaultChecked> Dark</option>
                    </select>
                </div>

                <div className="deleteChannel text-white">
                    <button
                        className='bg-red-700 w-full px-10 py-3 rounded-full my-5 hover:bg-red-800'>
                        Clear watch History
                    </button>
                </div>

                <div className="logout text-white">
                    <button className='bg-red-700 w-full px-10 py-3 rounded-full hover:bg-red-800' onClick={logoutHandler}>
                        Log Out
                    </button>
                </div>
                <div className="deleteChannel text-white">
                    <button className='bg-red-700 w-full px-10 py-3 rounded-full  my-5 hover:bg-red-800'>
                        Delete Channel
                    </button>
                </div>

            </div>
            <ToastContainer
                className={`my-[60px]`}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Slide
            />
        </div>
    )
}

export default Setting