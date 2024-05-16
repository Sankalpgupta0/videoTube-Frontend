import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import VideoCard from '../video/VideoCard'

const ViewPlaylist = () => {
    const [videos, setVideos] = useState([])
    const [videoDetails, setVideoDetails] = useState({})

    const {playlistId} = useParams()

    const getVideos = async() => {
        const url = `/api/playlist/${playlistId}`
        await axios.get(url)
        .then(res => setVideos(res.data.data.videos))
    }
    const getVideoDetails = async(videoId) => {
        const url = `/api/videos/${videoId}`
        await axios.get(url)
        .then(res => setVideoDetails(res.data.data))
    }

    useEffect(() => {
        getVideos()
    },[])
    return (
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-screen overflow-y-scroll'>
            {
                videos.length == 0 ? <h1 className='text-2xl text-white text-nowrap text-center'>There are no videos in this playlist</h1> :
                videos.map((video,index) => {
                    getVideoDetails(video);
                    return (
                        <VideoCard 
                            key={index} 
                            src={videoDetails.thumbnail} 
                            title={videoDetails.title} 
                            description={videoDetails.description}
                            time={videoDetails.duration}
                            userId={videoDetails.owner}
                            id={videoDetails._id}
                        />
                    )
                })
            }
        </div>
    )
}

export default ViewPlaylist