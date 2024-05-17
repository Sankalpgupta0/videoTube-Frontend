import React, { useState } from 'react'
import axios from 'axios'

const Input = () => {
    const [input, setInput] = useState("")

    const handleTweets = async() => {
        const url = `/api/tweets`
        const data = {
            content : input
        }
        const res = await axios.post(url, data)
        setInput("")
    }

    return (
        <div 
        onKeyDown={(e) => {
            if(e.key == "Enter")
                handleTweets()
        }}
        className='w-full h-[70px]   absolute bottom-5 mt-10'
        >
        <p className='text-gray-300'><span className='text-red-500'>*</span>All Chats are completely anonymous</p>
        <div className='w-full h-[50px] flex rounded-2xl overflow-hidden'>
            <input 
            type="text" 
            className='w-[80%] h-[50px] bg-white px-5 py-5 text-xl border-none outline-none ' 
            placeholder='Enter your thoughts...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button 
            onClick={handleTweets}
            className='w-[10%] h-[50px] bg-green-500 text-center hover:bg-green-700 text-white text-xl font-extrabold'>
                Post
            </button>
        </div>
        </div>
    )
}

export default Input