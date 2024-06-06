import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import VideoCard from '../video/VideoCard'
import { useParams } from 'react-router-dom'

const Channel = () => {
    const [uploadedVideos, setUploadedVideos] = useState([])

    const {userId} = useParams()
    const getAllUserVideos = async () => {
        const url = `/api/dashboard/${userId}`
        const response = await axios.get(url)
        setUploadedVideos(response.data.data.videos)
    }

    useEffect(() => {
        getAllUserVideos()
    }, [])


    return (
        <>
            <div className='w-full h-[100vh] overflow-y-scroll'>
                <Navbar/>
                {
                        (<div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-[100vh] overflow-y-scroll'>
                            {
                                uploadedVideos.length == 0 ? <div className='text-centre text-nowrap text-gray-400 text-xl '>
                                    No Uploaded videos!
                                </div> :
                                    uploadedVideos.map((video) => {
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
                        </div>) 
                }
            </div>
        </>
    )
}

export default Channel