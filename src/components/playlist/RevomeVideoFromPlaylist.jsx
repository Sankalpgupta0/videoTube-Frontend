import React from 'react'
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RevomeVideoFromPlaylist = ({ videoId, playlistId }) => {
    const navigate = useNavigate();
    return (
        <div className='hover:bg-gray-300 rounded-full hover:text-black z-10'
            onClick={() => {
                const url = `/api/playlist/remove/${videoId}/${playlistId}`
                axios.patch(url)
                    .then(() => {
                        alert(`video removed successfully`)
                    })
                    .finally(() => navigate(`/home/playlist/${playlistId}`))
            }}>
            <MdOutlineRemoveCircleOutline size={30} />
        </div>
    )
}

export default RevomeVideoFromPlaylist