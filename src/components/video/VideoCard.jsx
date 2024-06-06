import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import RevomeVideoFromPlaylist from '../playlist/RevomeVideoFromPlaylist.jsx';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ src, title, description, userId, time, id, inPlaylist = false, playlistId = "", isOwner = false }) => {
    const [user, setUser] = useState([]);
    const getUserByUserId = async (userId) => {
        const url = `/api/users/u/${userId}`
        const response = await axios.get(url)
            .then((res) => setUser(res.data.data.user))
    }

    useEffect(() => {
        userId && getUserByUserId(userId);
    }, [userId])

    const navigate = useNavigate()

    return (
        <div className='w-full hover:bg-black cursor-pointer'>
            <div className='w-full h-fit  p-3 text-gray-300'>
                <img 
                src={src} 
                alt={title} 
                className=' aspect-video rounded-lg' 
                onClick={() => navigate(`/home/${id}`)}
                />
                <div className='h-full flex items-center gap-5'>
                    <img 
                    src={user.avatar} 
                    className='h-8 rounded-full aspect-square z-10' 
                    onClick={() => navigate(`/home/channel/${user._id}`)}
                    />
                    <div className='w-full'>
                        <h1 className=''>{title}</h1>
                        <p className='textOverflow'> {description}</p>
                        <div className='flex justify-between mt-2 w-full'>
                            <p onClick={() => navigate(`/home/channel/${user._id}`)}>BY: {user.fullName ? `${user.fullName}` : "YOU"}</p>
                            <p>{parseInt(time / 60)}:{(time % 60).toFixed(0)} min</p>
                        </div>
                    </div>
                    {
                        isOwner && inPlaylist && <RevomeVideoFromPlaylist videoId={id} playlistId={playlistId} />
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoCard