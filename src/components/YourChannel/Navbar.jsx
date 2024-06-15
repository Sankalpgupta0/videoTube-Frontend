import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Upload from '../video/Upload'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleOption } from '../../store+slice/videoOptions.slice'
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
    const [select, setSelect] = useState(localStorage.getItem("select") || 'uploads')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [currentUser, setCurrentUser] = useState('')
    const [ChannelInfo, setChannelInfo] = useState('')

    const getCurrentUser = async() => {
        const url = "/api/users/current-user"
        const response = await axios.get(url)
        setCurrentUser(response.data.data);
        getChannelInfo(response.data.data.username)
    }
    const getChannelInfo = async (username) => {
        const url = `/api/users/c/${username}`
        const res = await axios.get(url)
        setChannelInfo(res.data.data)
    }

    const notifyError = ({ message }) => {
        console.log(message);
        toast.error(message, {
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
        getCurrentUser()
    },[])

    return (
        <>
            <div className='w-full h-fit relative'>
                <img src={currentUser.coverImage} alt="coverImage" className='w-full h-full aspect-[3/1]'/>
                <div className='w-1/2 h-1/3 max-md:w-3/4 max-md:h-1/2  absolute bottom-0 left-0 flex'>
                    <div className='h-full'>
                        <img src={currentUser.avatar} alt="" className=' aspect-square rounded-full h-full mx-10' />
                    </div>
                    <div className=' items-center justify-center flex flex-col'>
                        <p className='text-gray-400'><span className=' font-semibold text-gray-300'>{currentUser.fullName}</span> - {currentUser.username}</p>
                        <p className='font-bold text-white'>Subscribers : {ChannelInfo.subscribersCount}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between px-20 items-center mt-10'>
                <p className='text-gray-300 text-center text-xl'>
                    <select
                        name="user-Choice"
                        value={select}
                        onChange={(e) => {
                            setSelect(e.target.value)
                            dispatch(toggleOption(e.target.value))
                        }}
                        className=' bg-transparent outline-none border-none'
                    >
                        <option value="uploads">Uploaded Videos</option>
                        <option value="likes">liked Videos</option>
                    </select>
                </p>
                <Upload toast={notifyError}/>
            </div>
            <hr className='mt-10 text-white' />

            <ToastContainer
                className={`mt-[60px]`}
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
        </>
    )
}

export default Navbar