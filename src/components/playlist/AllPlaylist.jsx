import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import PlaylistCard from './PlaylistCard'

const AllPlaylist = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [playlist, setPlaylist] = useState([])

    const getcurrentUserPlaylist = async() => {
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
        getcurrentUserPlaylist()
    },[])

    return (
        <div className='w-full h-screen sticky'>
            <Navbar />
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-screen overflow-y-scroll '>
                {
                    playlist.map((list, index) => {
                        return <PlaylistCard key={index} list={list} />
                    })
                }
            </div>
        </div>
    )
}

export default AllPlaylist