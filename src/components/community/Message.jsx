import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const Message = ({ owner, content, date="" }) => {
    const [currentUser, setCurrentUser] = useState("")
    const navigate = useNavigate()
    const getcurrentUser = async () => {
        const url = '/api/users/current-user'
        const response = await axios.get(url)
        // console.log(response.data.data);
        setCurrentUser(response.data.data)
    }
    useEffect(() => {
        getcurrentUser()
    }, [])

    return (
        <div className={`w-full flex ${currentUser._id != owner ? "flex-row-reverse" : "flex-row"}`}>
            <div className='w-2/5 max-md:hidden'>

            </div>
            <div className={`text-white w-3/5 max-md:w-full overflow-x-hidden  h-fit flex flex-col px-5 py-2 max-md:px-1 my-1 rounded-2xl  ${currentUser._id != owner ? "bg-gray-700" : "bg-green-700"}`}>
                <h1 className='ml-5 textOverflowHor'>
                    {content}
                </h1>
                <div className=' flex justify-between my-2'> 
                    <p className='text-xs text-gray-200 cursor-pointer' onClick={() => navigate(`/home/channel/${owner}`)}>by: {owner}</p>
                    <p className='text-xs text-gray-200'>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
            </div>
        </div>
    )
}

export default Message