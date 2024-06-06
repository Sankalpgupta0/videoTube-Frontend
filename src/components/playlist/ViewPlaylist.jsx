import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import VideoCard from '../video/VideoCard'
import { IoCopyOutline } from "react-icons/io5";

const ViewPlaylist = () => {
    const [videoDetails, setVideoDetails] = useState([])
    const [ownerDetails, setOwnerDetails] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [loading, setLoading] = useState(true)

    const { playlistId } = useParams()

    const getVideos = async () => {
        const url = `/api/playlist/${playlistId}`
        setLoading(true)
        await axios.get(url)
            .then(res => {
                try {
                    setPlaylistName(res.data.data.name);
                    const url3 = `/api/users/u/${res.data.data.owner}`
                    axios.get(url3)
                    .then(res => setOwnerDetails(res.data.data.user))
                    
                } catch(err) {
                    console.log(err);
                }
                    
                (res.data.data.videos).map(async (video, index) => {
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
    const getCurrentUser = async() => {
        const url = "/api/users/current-user"
        const response = await axios.get(url)
        setCurrentUser(response.data.data);
    }

    const copyToClipboard = () => {
        const textToCopy = `/home/playlist/${playlistId}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
            console.log(textToCopy);
            alert('Text copied to clipboard');
            })
            .catch(err => {
            console.error('Failed to copy text: ', err);
            });
        }

    useEffect(() => {
        getVideos()
        getCurrentUser()
    }, [])

    return (
        <>
        <h1 className='text-white text-center font-bold text-xl'>Owner : {ownerDetails.username}</h1>
        <p className='text-gray-300 text-center'>Playlist-Name : {playlistName}</p>
        <div 
        className='flex items-center justify-center hover:bg-black px-5 py-2 rounded-xl '
        onClick={copyToClipboard}
        >
            <p 
            className='text-gray-300 mx-10 text-center'
            id='textToCopy'>
                /home/playlist/{playlistId}
            </p>
            <IoCopyOutline color='white' />
        </div>
        <div className='grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 p-2 w-full h-[100vh] overflow-y-scroll'>
            {
                videoDetails.length == 0 ? <h1 className='text-2xl text-white text-nowrap text-center'>There are no videos in this playlist</h1> :
                    loading ? <h1 className='text-white text-2xl'>Loading</h1> :
                        videoDetails.map((video, index) => (
                            index < videoDetails.length / 2 ?
                                (
                                    <VideoCard
                                        key={index} 
                                        src={video.thumbnail}
                                        title={video.title}
                                        description={video.description}
                                        time={video.duration}
                                        userId={video.owner}
                                        id={video._id}
                                        inPlaylist={true}
                                        playlistId={playlistId}
                                        isOwner={ownerDetails._id == currentUser._id? true : false}
                                    />
                                )
                                : <div> </div>
                        ))
            }
        </div>
        </>
    )
}

export default ViewPlaylist