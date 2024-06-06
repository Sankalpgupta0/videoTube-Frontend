import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Navbar = () => {
    const [user, setUser] = useState('')
    const [ChannelInfo, setChannelInfo] = useState('')
    const {userId} = useParams()
    const getUser = async() => {
        const url = `/api/users/u/${userId}`
        const res = await axios.get(url)
        console.log(res.data.data.user);
        setUser(res.data.data.user)
        getChannelInfo(res.data.data.user.username)
    }

    const getChannelInfo = async (username) => {
        const url = `/api/users/c/${username}`
        const res = await axios.get(url)
        setChannelInfo(res.data.data)
    }

    useEffect(() => {
        getUser()
    },[])

    return (
        <>
            <div className='w-full h-fit relative'>
                <img src={user.coverImage} alt="coverImage" className='w-full h-full aspect-[3/1]'/>
                <div className='w-1/2 h-1/3 max-md:w-3/4 max-md:h-1/2  absolute bottom-0 left-0 flex'>
                    <div className='h-full'>
                        <img src={user.avatar} alt="" className=' aspect-square rounded-full h-full mx-10' />
                    </div>
                    <div className=' items-center justify-center flex flex-col'>
                        <p className='text-gray-400'><span className=' font-semibold text-gray-300'>{user.fullName}</span> - {user.username}</p>
                        <p className='font-bold text-white'>Subscribers : {ChannelInfo.subscribersCount}</p>
                    </div>
                </div>
            </div>
            
            <hr className='mt-10 text-white' />
        </>
    )
}

export default Navbar