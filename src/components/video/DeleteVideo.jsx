import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const DeleteVideo = () => {
    const { videoId } = useParams()
    const navigate = useNavigate()
    const handleDelete = async () => {
        const url = `/api/videos/${videoId}`
        const res = await axios.delete(url)
        navigate('/')
    }
    return (
        <button
            className=" shadow-black inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px]  font-medium leading-none outline-none"
            onClick={handleDelete}
        >
            Delete Video
        </button>
    )
}

export default DeleteVideo