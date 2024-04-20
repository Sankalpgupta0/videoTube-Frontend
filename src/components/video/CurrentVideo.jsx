import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import CommentCard from './CommentCard';
import EditVideo from './EditVideo';
import DeleteVideo from './DeleteVideo';

const CurrentVideo = () => {
    const [video, setVideo] = useState({})
    const [user, setUser] = useState([]);
    const [subs, setSubs] = useState(0);
    const [loading, setLoading] = useState(true)
    const [like, setLike] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingCommnets] = useState(true)
    const [comment, setComment] = useState('')
    const [owner, setOwner] = useState(false)

    const {videoId} = useParams();
    
    const getVideoByVideoId = async() => {
        setLoading(true)
        const response = await axios.get(`/api/videos/${videoId}`)
        .then((res) => {
            setVideo(res.data.data);
            // console.log(res.data.data.owner);
            getUserByUserId(res.data.data.owner)
        })
        setLoading(false)
    }

    const getUserByUserId = async(userId) => {
        const url = `/api/users/u/${userId}`
        const response = await axios.get(url)
        .then((res) => {
            setUser(res.data.data.user)
            // console.log(res.data.data.user);
            // getSubscriberCount(res.data.data.user.fullName)
        })

    }

    const getSubscriberCount = async(username) => {
        // console.log(username);
        const url = `/api/users/c/${username}`
        const response = await axios.get(url)
        .then((res)=>{
            setSubs(res.data.data)
        })
    }
    
    const handleLike = async() => {
        const url = `/api/likes/toggle/v/${videoId}`
        const response = await axios.post(url)
        .then((res) => {
            setLike(res.data.data.isLiked);
        })
        .catch((err) => console.log(err))
    }

    const handleSubscriber = async() => {
        const resp = await axios.get(`/api/videos/${videoId}`)
        const url1 = `/api/subscriptions/c/${resp.data.data.owner}`
        const response = await axios.post(url1)
            setSubscribed(response.data.data.subscribed)
            const url = `/api/users/u/${resp.data.data.owner}`
            const respo = await axios.get(url)
            .then((res) => {
                // console.log(res.data.data.user.username);
                getSubscriberCount(res.data.data.user.username)
            })
    } 

    const getAllComments = async() => {
        setLoadingCommnets(true)
        const url = `/api/comments/${videoId}`
        const res = await axios.get(url)
        setComments(res.data.data.comments);
        setLoadingCommnets(false)
    }

    const getCurrentUser = async() => {
        const url = `/api/users/current-user`
        const res = await axios.get(url)
        
        const resp = await axios.get(`/api/videos/${videoId}`)

        const url2 = `/api/users/u/${resp.data.data.owner}`
        const response = await axios.get(url2)

        if(res.data.data._id == response.data.data.user._id)
            setOwner(true)
        else 
            setOwner(false)
    }

    useEffect(() => {
        getVideoByVideoId()
        getAllComments()
        handleSubscriber()
        handleLike(videoId)
        getCurrentUser()
    },[])

    const addComment = async () => {
        if(comment.trim().length === 0){
            alert("Please enter a comment berofe posting")
            return;
        }
        const url = `/api/comments/${videoId}`
        const data = {
            content: comment
        }
        const res = await axios.post(url, data)
        getAllComments();
        setComment("");
    }

    if(loading){
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
        {
            //give options of edit and  delete for creator only
            owner && <div className='h-20 w-full flex justify-between items-center'>
                <div>

                </div>
                <div className='flex justify-between gap-10 mx-10'>
                    <EditVideo tit={video.title} descprit={video.description}/> 
                    <DeleteVideo/>
                </div>
            </div>
        }
        <div className='w-full mt-10 overflow-y-scroll'>
            <video src={video.videoFile} className=' aspect-video' controls></video>
            <h1 className='text-center text-3xl text-gray-200'>{video.title}</h1>
            <p className='text-center text-gray-400'>{video.description}</p>
            <div className='w-full flex justify-between px-10 max-md:flex-col items-center'>
                <div className='flex gap-10 max-md:gap-2'>
                    <img src={user.avatar} className='h-12 rounded-full aspect-square'/>
                    <div className='text-white gap-10 max-md:gap-2'>
                        <h1 className='text-lg'>{user.fullName}</h1>
                        <p>{subs.subscribersCount}</p>
                    </div>
                    <button 
                    onClick={handleSubscriber}
                    className={`${subscribed ? "hover:bg-gray-500 bg-red-600" : "bg-gray-500 hover:bg-red-600"}  px-8 py-4 rounded-full  text-xl text-white`}>
                        {subscribed ? "subscribed" : "subscribe"}
                    </button>
                </div>
                <button className="" onClick={handleLike}>
                    {like ? <BiSolidLike size={30} color='white'/> : <BiLike color='white' size={30}/>}
                </button>
            </div>
        </div>

        <div className='mt-20 px-10'>
            <div className=''>
                <p className='text-sm text-[#D9E8FCB0] pl-5'>Add Comment</p>
                <input 
                type='text'
                className='max-lg:w-3/5 pl-5 outline-none border-none h-10 rounded-md w-3/4 max-md:w-full text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]' 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') addComment()
                }}
                />
                <button 
                onClick={addComment}
                className='bg-gray-400 h-10 w-10 rounded-lg hover:bg-gray-600 text-white'>
                    Add
                </button>
                <hr className='mt-5'/>
            </div>
            {
                loadingComments ? 
                <h1>Loading comments ...</h1>:
                <div className='mt-20 '>
                    {
                        comments.map((com) => {
                            return (
                                <CommentCard key={com._id} ownerId={com.owner} content={com.content} createdAt={com.createdAt} id={com._id}/>
                            )
                        })
                    }
                </div>
            }

        </div>
        </>
    )
}

export default CurrentVideo