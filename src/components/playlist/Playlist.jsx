import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import PlaylistCard from './PlaylistCard'
import { Outlet } from 'react-router-dom'

const Playlist = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [playlist, setPlaylist] = useState([])

    const getcurrentUser = async() => {
        const url = '/api/users/current-user'
        const response = await axios.get(url)
        // console.log(response.data.data);
        setCurrentUser(response.data.data)

        const url2 = `/api/playlist/user/${response.data.data._id}`
        const response2 = await axios.get(url2)
        // console.log(response2.data.data);
        setPlaylist(response2.data.data)
    }

    useEffect(() => {
        getcurrentUser()
    },[])

    return (
        <div className='w-full min-h-[100vh] sticky'>
            <Outlet/>
        </div>
    )
}

export default Playlist