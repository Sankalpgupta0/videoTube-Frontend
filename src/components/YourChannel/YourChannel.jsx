import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import VideoCard from '../video/VideoCard'
import { useSelector } from 'react-redux'

const YourChannel = () => {
    const [uploadedVideos, setUploadedVideos] = useState([])
    const [likedVideos, setLikedVideos] = useState([])

    const options = useSelector(state => state.videoOptionsReducer.options);

    const getAllUserVideos = async () => {
        const url = '/api/dashboard/videos'
        const response = await axios.get(url)
        setUploadedVideos(response.data.data.videos)
    }

    const getAllLikedVideos = async () => {
        const url = `/api/likes/videos`
        const response = await axios.get(url)
        setLikedVideos(response.data.data);
    }

    useEffect(() => {
        getAllUserVideos()
        getAllLikedVideos()
    }, [])


    return (
        <>
            <div className='w-full h-screen overflow-y-scroll'>
                <Navbar />
                    {
                        options == 'uploads' ?
                            (<div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-screen overflow-y-scroll'>
                                {
                                    uploadedVideos.length == 0? <div className='text-centre text-nowrap text-gray-400 text-xl '>
                                        You have  no videos yet! Start uploading by clicking on the "Upload" button in the navbar.
                                    </div> : 
                                    uploadedVideos.map((video) => {
                                        return (
                                            <VideoCard
                                                key={video._id}
                                                src={video.thumbnail}
                                                title={video.title}
                                                description={video.description}
                                                time={video.duration}
                                                // userId={video.owner}
                                                id={video._id}
                                            />
                                        )
                                    })
                                }
                                
                                
                            </div>) : (<div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-screen overflow-y-scroll'>
                                {
                                    likedVideos.length == 0?<div className='text-centre text-nowrap text-gray-400 text-xl '>
                                    No liked Videos
                                </div>:
                                    likedVideos.map((video) => {
                                        return (
                                            <VideoCard
                                                key={video._id}
                                                src={video.likedVideo.thumbnail}
                                                title={video.likedVideo.title}
                                                description={video.likedVideo.description}
                                                time={video.likedVideo.duration}
                                                userId={video.likedVideo.owner}
                                                id={video.likedVideo._id}
                                            />
                                        )
                                    })
                                }
                            </div>)
                    }
                </div>
        </>
    )
}

export default YourChannel