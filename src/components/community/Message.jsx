import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Message = ({owner, content}) => {
    const [currentUser, setCurrentUser] = useState("")

    const getcurrentUser = async() => {
        const url = '/api/users/current-user'
        const response = await axios.get(url)
        console.log(response.data.data);
        setCurrentUser(response.data.data)
    }
    useEffect(() => {
        getcurrentUser()
    },[])

    return (
        <div className= {`w-full flex ${currentUser._id != owner ? "flex-row-reverse" : "flex-row"}` }>
            <div className='w-1/2 max-md:hidden'>

            </div>
            <div className={`text-white w-1/2 max-md:w-full h-fit flex flex-col px-10 py-5 max-md:px-1 my-1 rounded-2xl ${currentUser._id != owner ? "bg-gray-700" : "bg-green-700"}`}>
                <h1 className='ml-5'>
                    {content}
                </h1>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Message