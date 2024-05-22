import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from './VideoCard'
import Footer from '../Home/Footer'

const GetAllVideos = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const getVideoData = async () => {
        let res = await axios.get('/api/videos')
        setVideos(res.data.data.videos)
        setLoading(false)
    }

    useEffect(() => {
        getVideoData()
    }, [])

    if (loading) {
        return <div className='text-center text-2xl text-white'>Loading...</div>
    }

    return (
        <>
            <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-[100vh] overflow-y-scroll'>
                {
                    videos.map((video) => {
                        return (
                            <VideoCard
                                key={video._id}
                                src={video.thumbnail}
                                title={video.title}
                                description={video.description}
                                time={video.duration}
                                userId={video.owner}
                                id={video._id}
                            />
                        )
                    })
                }
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default GetAllVideos