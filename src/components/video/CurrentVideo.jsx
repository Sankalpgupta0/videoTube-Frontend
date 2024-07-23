import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import CommentCard from './CommentCard';
import EditVideo from './EditVideo';
import DeleteVideo from './DeleteVideo';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCurrentUrl } from '../../store+slice/videoOptions.slice';

const Skeleton = () => {
    return(
        <div className='w-full aspect-video bg-black my-20 h-screen VideoSkeleton'>

        </div>
    )
}
const CurrentVideo = () => {
    const [video, setVideo] = useState({})
    const [user, setUser] = useState([]);
    const [subs, setSubs] = useState(0);
    const [loading, setLoading] = useState(true)
    const [like, setLike] = useState(false)
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingCommnets] = useState(true)
    const [comment, setComment] = useState('')
    const [owner, setOwner] = useState(false)

    const [currentUser, setCurrentUser] = useState("")
    const [playlist, setPlaylist] = useState([])
    const [playlistLoading, setPlaylistLoading] = useState(false)
    const [ChannelInfo, setChannelInfo] = useState('')

    const { videoId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notifyError = ({ message }) => {
        console.log(message);
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    
    const getVideoByVideoId = async () => {
        setLoading(true)
        const response = await axios.get(`/api/videos/${videoId}`)
            .then((res) => {
                setVideo(res.data.data);
                // console.log(res.data.data.owner);
                getUserByUserId(res.data.data.owner)
            })
        setLoading(false)
    }

    const getUserByUserId = async (userId) => {
        const url = `/api/users/u/${userId}`
        const response = await axios.get(url)
            .then((res) => {
                setUser(res.data.data.user)
                // console.log(res.data.data.user);
                // getSubscriberCount(res.data.data.user.fullName)
            })

    }

    const handleLike = async () => {
        const url = `/api/likes/toggle/v/${videoId}`
        const response = await axios.post(url)
        getvideoIsLiked()
    }

    const getvideoIsLiked = async () => {
        const url = `/api/likes/isLiked/v/${videoId}`
        const response = await axios.get(url)
        setLike(response.data.data ? true : false)
    }

    const ToggleSubscriber = async () => {
        const resp = await axios.get(`/api/videos/${videoId}`)
        const url1 = `/api/subscriptions/c/${resp.data.data.owner}`
        const response = await axios.post(url1)
        getChannelInfo()
    }

    const getChannelInfo = async () => {
        const url = `/api/videos/${videoId}`
        const response = await axios.get(url)
        const url1 = `/api/users/u/${response.data.data.owner}`
        const resp = await axios.get(url1)
        const url2 = `/api/users/c/${resp.data.data.user.username}`
        const res = await axios.get(url2)
        setChannelInfo(res.data.data)
    }

    const getAllComments = async () => {
        setLoadingCommnets(true)
        const url = `/api/comments/${videoId}`
        const res = await axios.get(url)
        setComments(res.data.data.comments);
        setLoadingCommnets(false)
    }

    const getCurrentUser = async () => {
        const url = `/api/users/current-user`
        const res = await axios.get(url)

        const resp = await axios.get(`/api/videos/${videoId}`)

        const url2 = `/api/users/u/${resp.data.data.owner}`
        const response = await axios.get(url2)

        if (res.data.data._id == response.data.data.user._id)
            setOwner(true)
        else
            setOwner(false)
    }

    const addVideoToHistory = () => {
        const url = `/api/users/AddToHistory/${videoId}`
        const res = axios.patch(url)
    }


    const addComment = async () => {
        if (comment.trim().length === 0) {
            alert("Please enter a comment berofe posting")
            return;
        }
        const url = `/api/comments/${videoId}`
        const data = {
            content: comment
        }
        await axios.post(url, data)
        .catch(err => notifyError({message:err.response.data.message}))

        getAllComments();
        setComment("");
    }

    const StartVideo = (e) => {
        const currentTime = localStorage.getItem(`${videoId}`) || 0;
        e.currentTarget.currentTime = currentTime;
    }

    const getcurrentUserPlaylist = async () => {
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
        dispatch(setCurrentUrl())
        getvideoIsLiked()
        getChannelInfo()
        getcurrentUserPlaylist()
        addVideoToHistory()
        getVideoByVideoId()
        getAllComments()
        getCurrentUser()
    }, [])


    if (loading) {
        return (
            <Skeleton />
        )
    }

    return (
        <div className='w-full min-h-screen'>
            {
                //give options of edit and  delete for creator only
                owner && <div className='h-20 w-full flex justify-between items-center'>
                    <div>

                    </div>
                    <div className='flex justify-between gap-10 mx-10'>
                        <EditVideo tit={video.title} descprit={video.description} thumb={video.thumbnail} />
                        <DeleteVideo />
                    </div>
                </div>
            }

            <div className='w-full mt-10 overflow-y-scroll'>
                <video
                    src={video.videoFile}
                    className=' aspect-video max-h-screen'
                    controls
                    onTimeUpdate={e => localStorage.setItem(`${videoId}`, (e.currentTarget.currentTime))}
                    onPlay={StartVideo}
                >

                </video>
                <h1 className='text-center text-3xl text-gray-200'>{video.title}</h1>
                <p className='text-center text-gray-400'>{video.description}</p>
                <div className='w-full flex justify-between px-10 max-md:flex-col items-center'>
                    <div className='flex gap-10 max-md:gap-2'>
                        <img
                            src={user.avatar}
                            className='h-12 rounded-full aspect-square cursor-pointer'
                            onClick={() => navigate(`/channel/${user._id}`)}
                        />
                        <div
                            className='text-white gap-10 max-md:gap-2 cursor-pointer'
                            onClick={() => navigate(`/channel/${user._id}`)}
                        >
                            <h1 className='text-lg'>{user.fullName}</h1>
                            <p>{ChannelInfo.subscribersCount}</p>
                        </div>

                        {/* subscribe section */}
                        <button
                            onClick={ToggleSubscriber}
                            className={`${ChannelInfo.isSubscribed ? "hover:bg-gray-500 bg-red-600" : "bg-gray-500 hover:bg-red-600"}  px-8 py-4 rounded-full  text-xl text-white`}>
                            {ChannelInfo.isSubscribed ? "subscribed" : "subscribe"}
                        </button>
                    </div>

                    {/* playlist section */}
                    <button
                        onClick={() => setPlaylistLoading(true)}
                        className='hover:bg-black text-white text-lg px-5 py-2 rounded-full bg-transparent border-none outline-none'>
                        Add video to playlist
                    </button>

                    {
                        playlistLoading ? <div className='top-0 left-0 absolute z-10 h-screen w-screen flex justify-center items-center'>
                            <div className=' w-fit h-fit bg-black flex justify-center items-center flex-col rounded-xl'>
                                {
                                    playlist.map((list, index) => {
                                        return <div className='flex justify-between gap-y-10 hover:bg-gray-800 px-5 py-2 rounded-xl'>
                                            <div className=''>
                                                <h1 className='text-white text-xl'>{list.name}</h1>
                                                <p className='text-xs  '>{list._id}</p>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    const url = `/api/playlist/add/${videoId}/${list._id}`
                                                    axios.patch(url)
                                                        .then(() => alert(`Video is added to ${list.name} playlist`))
                                                        .catch(() => alert(`video already exists in the playlist`))

                                                }}
                                                className='text-white p-5 rounded-2xl hover:bg-gray-500 '>
                                                Add
                                            </button>
                                        </div>
                                    })
                                }
                                <button className='bg-gray-800 hover:bg-black px-10 py-5 rounded-full text-white text-2xl my-5' onClick={() => setPlaylistLoading(false)}>
                                    Close
                                </button>
                            </div>

                        </div> : ""
                    }

                    {/* like section */}
                    <button className="" onClick={handleLike}>
                        {like ? <BiSolidLike size={30} color='white' /> : <BiLike color='white' size={30} />}
                    </button>
                </div>
            </div>

            {/* comment section */}
            <div className='mt-20 px-10'>
                <div className=''>
                    <p className='text-sm text-[#D9E8FCB0] pl-5'>Add Comment</p>
                    <input
                        type='text'
                        className='max-lg:w-3/5 pl-5 outline-none border-none h-10 rounded-md w-3/4 max-md:w-full text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addComment()
                        }}
                    />
                    <button
                        onClick={addComment}
                        className='bg-gray-400 h-10 w-10 rounded-lg hover:bg-gray-600 text-white'>
                        Add
                    </button>
                    <hr className='mt-5' />
                </div>
                {
                    loadingComments ?
                        <h1>Loading comments ...</h1> :
                        <div className='mt-20 '>
                            {
                                comments.map((com) => {
                                    return (
                                        <CommentCard
                                            key={com._id}
                                            ownerId={com.owner}
                                            content={com.content}
                                            createdAt={com.createdAt}
                                            id={com._id}
                                        />
                                    )
                                })
                            }
                        </div>
                }

            </div>
            <ToastContainer
                className={`mt-[60px]`}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Slide
            />
        </div>
    )
}

export default CurrentVideo