import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
// to format createdAt
import moment from 'moment'

const CommentCard = ({ownerId, content, createdAt, id}) => {

    const [user, setUser] = useState([]);
    const [like, setLike] = useState(false);

    const getUserByUserId = async(userId) => {
        const url = `/api/users/u/${userId}`
        const response = await axios.get(url)
        .then((res) => {
            setUser(res.data.data.user)
            // console.log(res.data.data.user);
        })
    }
    const handleLike = async() => {
        const url = `/api/likes/toggle/c/${id}`
        const response = await axios.post(url)
            setLike(response.data.data.isLiked);

    }

    useEffect(() => {
        getUserByUserId(ownerId);
    },[ownerId])

    return (
        <div className='my-5 flex gap-5'>
            <img src={user.avatar} alt='userImage' className='h-12 aspect-square rounded-full' />
            <div className='text-gray-300'>
                <h2>{user.username}</h2>
                <p>{content}</p>
                <div className='text-gray-500 flex gap-10'>
                    <p>Commented at: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    <button onClick={handleLike}>
                        {like? <BiSolidLike color='white' size={24}/> : <BiLike color='white' size={24}/>}
                    </button>
                </div>      
            </div>
        </div>
    )
}

export default CommentCard