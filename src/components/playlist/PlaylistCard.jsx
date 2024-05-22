import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

const PlaylistCard = ({ list }) => {
    const navigate = useNavigate()
    const [video, setVideo] = useState("")

    const firstVideo = () => {
        const videoId = list.videos[0]
        const url = `/api/videos/${videoId}`
        axios.get(url)
            .then(res => {
                setVideo(res.data.data.thumbnail)
            })
    }

    useEffect(() => {
        list.videos[0] ? firstVideo() : ""
    }, [])

    return (
        <div className='w-full h-full'>
            <div
                className='w-full h-[400px] bg-[#1e1e1e] hover:bg-black rounded-lg p-5 cursor-pointer flex'
            >
                <div className='w-1/2 h-full  flex flex-col ' onClick={() => navigate(`/home/playlist/${list._id}`)}>
                    <img src={list.videos[0] ? video : "/defaultPlaylistImage.png"} className=' shadow-2xl rounded-xl aspect-square w-full' />
                    <h1 className='text-xl text-gray-300 text-center my-10'>{list.name}</h1>
                </div>
                <div className='w-1/2 h-full bg-black/50 text-white flex flex-col justify-center items-center'>
                    <p>{moment(list.createdAt).format('MMMM Do YYYY')}</p>
                    <p>Videos : {list.videos.length}</p>
                    <button onClick={() => navigate('/home')} className='text-gray-500 px-5 py-2 hover:bg-gray-900 rounded-full'>
                        Add new Videos ⊕
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaylistCard