import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import VideoCard from '../video/VideoCard'

const ViewPlaylist = () => {
    const [videoDetails, setVideoDetails] = useState([])
    const [loading, setLoading] = useState(true)

    const {playlistId} = useParams()

    const getVideos = async() => {
        const url = `/api/playlist/${playlistId}`
        setLoading(true)
        await axios.get(url)
        .then(res => {
            (res.data.data.videos).map(async(video, index) => {
                const url2 = `/api/videos/${video}`
                axios.get(url2)
                .then(res => {
                    setVideoDetails(prevVideoDetails => [...prevVideoDetails, res.data.data]);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            })
        })

            setLoading(false)
    }

    useEffect(() => {
        getVideos()
    },[])

    return (
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-screen overflow-y-scroll'>
            {
                videoDetails.length == 0 ? <h1 className='text-2xl text-white text-nowrap text-center'>There are no videos in this playlist</h1> :
                loading? <h1 className='text-white text-2xl'>Loading</h1> :
                videoDetails.map((video,index) => (
                    index<videoDetails.length/2 ?
                    (
                        <VideoCard 
                            key={index} 
                            src={video.thumbnail} 
                            title={video.title} 
                            description={video.description}
                            time={video.duration}
                            userId={video.owner}
                            id={video._id}
                        />
                    ) 
                    :<div> </div>
                ))
            }
        </div>
    )
}

export default ViewPlaylist