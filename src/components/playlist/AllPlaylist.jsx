import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import PlaylistCard from './PlaylistCard'


const SkeletonStruct = () => {
    return(

        <div className='w-full h-[400px] bg-black rounded-lg p-5 cursor-pointer flex my-10'>
                <div className='w-1/2 h-full  flex flex-col ' >
                <img  className=' shadow-2xl rounded-xl aspect-square w-full' />
                <h1 className='text-xl text-gray-300 text-center my-10 py-2 rounded-full bg-gray-500'></h1>
                </div>
            <div className='w-1/2 h-full bg-black/50 text-white flex flex-col justify-center items-center'>
                <p className='py-2 rounded-full w-full bg-gray-500'></p>
                <p className='py-2 rounded-full bg-black'>Videos : 0</p>
                <button  className='text-gray-500 px-5 py-2 hover:bg-gray-900 rounded-full'>
                    Add new Videos ⊕
                </button>
            </div>
        </div>
    )
}

const Skeleton = () => {
    return (
        <div className='w-full my-10 px-10'>
            <button className=' h-[40px] w-[200px] rounded-full bg-black'></button>
            <hr />
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-fit min-h-screen overflow-y-scroll '>
                {
                    Array.from({length:2}).map((_, index) => (
                        <SkeletonStruct key={index}/>
                    ))
                }
            </div>
        </div>

    )
}

const AllPlaylist = () => {
    const [currentUser, setCurrentUser] = useState("")
    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(true)

    const getcurrentUserPlaylist = async () => {
        setLoading(true)
        const url = '/api/users/current-user'
        const response = await axios.get(url)
        // console.log(response.data.data);
        setCurrentUser(response.data.data)

        const url2 = `/api/playlist/user/${response.data.data._id}`
        const response2 = await axios.get(url2)
        // console.log(response2.data.data);
        setPlaylist(response2.data.data)
        setLoading(false)
    }

    useEffect(() => {
        getcurrentUserPlaylist()
    }, [])

    if (loading) {
        return <Skeleton />
    }
    return (
        <div className='w-full h-fit min-h-screen sticky'>
            <Navbar />
            <div className='grid grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-fit min-h-screen overflow-y-scroll '>
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