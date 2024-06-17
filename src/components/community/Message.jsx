import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Message = ({ owner, content }) => {
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
                <p className='text-xs text-gray-200 cursor-pointer my-2' onClick={() => navigate(`/home/channel/${owner}`)}>by: {owner}</p>
                <div> 

                </div>
            </div>
        </div>
    )
}

export default Message