import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../video/VideoCard.jsx'

const History = () => {
    const [history, setHistory] = useState([])

    const GetHistory = async () => {
        const url = '/api/users/history'
        const response = await axios.get(url)
        setHistory(response.data.data)
    }

    useEffect(() => {
        GetHistory()
    }, [])
    return (
        <div className='w-full h-[100vh] grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2  overflow-y-scroll'>
            {
                history.map((video, index) => {
                    return <VideoCard
                        key={video._id}
                        src={video.thumbnail}
                        title={video.title}
                        description={video.description}
                        time={video.duration}
                        userId={video.owner._id}
                        id={video._id}
                    />
                })
            }
        </div>
    )
}

export default History