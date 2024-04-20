import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const VideoCard = ({src, title, description, userId, time, id}) => {
    const [user, setUser] = useState([]);
    const getUserByUserId = async(userId) => {
        const url = `/api/users/u/${userId}`
        const response = await axios.get(url)
        .then((res) => setUser(res.data.data.user))
    }

    useEffect(() => {
        userId && getUserByUserId(userId);
    },[userId])



    return (
        <Link to={`/home/${id}`} className='w-full hover:bg-black cursor-pointer'>
            <div className='w-full h-fit  p-3 text-gray-300'>
                <img src={src} alt={title} className=' aspect-video rounded-lg'/>
                <div className='h-full flex items-center gap-5'>
                    <img src={user.avatar} className='h-8 rounded-full aspect-square'/>
                    <div className='w-full'>
                        <h1 className=''>{title}</h1>
                        <p className='textOverflow'> {description}</p>
                        <div className='flex justify-between mt-2 w-full'>
                            <p>BY: {user.fullName? `${user.fullName}` : "YOU" }</p>
                            <p>{(time/60).toFixed(0)} min</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard