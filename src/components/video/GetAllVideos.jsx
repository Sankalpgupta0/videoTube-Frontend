import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from './VideoCard'
import { useSelector } from 'react-redux'


const Skeleton = () => {

    return (
            <div className='w-full h-fit  p-3 text-gray-300'>
                <div className=' aspect-video h-[150px] bg-black rounded-lg my-1'>
                </div>
                <div className='h-full flex items-center gap-5'>
                    <img
                        className='h-8 rounded-full aspect-square bg-black z-10'
                    />
                    <div className='w-full'>
                        <h1 className='w-full py-2 rounded-full bg-black my-1'></h1>
                        <p className='textOverflow w-full py-2 rounded-full bg-black my-1'></p>
                        <div className='flex justify-between mt-2 w-full  my-1'>
                            <p className='w-full py-2 rounded-full '>BY</p>
                            <p>00:00 min</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const SkeletonList = () => {
    return (
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-[100vh] overflow-y-scroll'>
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} />
            ))}
        </div>
    );
};


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
        return <SkeletonList/>
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