import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from './VideoCard'
import { useSelector } from 'react-redux'

const GetAllVideos = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredVideos, setFilteredVideos] = useState([])

    const search = useSelector((state) => state.videoOptionsReducer.search)

    const getVideoData = async () => {
        let res = await axios.get('/api/videos')
        setVideos(res.data.data.videos)
        setLoading(false)
    }

    useEffect(() => {
        getVideoData()
    }, [])

    const getSearchedVideo = () => {
        const filterVideo = videos.filter(video =>
            video.title.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredVideos(filterVideo);
    }
    useEffect(() => {
        getSearchedVideo()
    }, [search])

    if (loading) {
        return <div className='text-center text-2xl text-white'>Loading...</div>
    }

    return (
        <>
            <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-[100vh] overflow-y-scroll'>
                {search.length == 0 ?
                    videos.map((video) => {
                        // console.log(video.title);
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
                    }) : filteredVideos.map((video) => {
                        console.log(video.title);
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