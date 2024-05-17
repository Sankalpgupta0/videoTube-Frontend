import React, { useEffect, useState } from 'react'
import Message from './Message'
import axios from 'axios'
import Input from './Input'

const Chat = () => {
    const [messages, setMessages] = useState([])

    const getMessages = () => {
        axios.get('/api/tweets')
        .then(res => setMessages(res.data.data.tweets))
    }
    useEffect(() => {
        getMessages()
    },[])
    return (
        <div className='w-full h-[95vh] px-10 ' >
            <div className='h-4/5 w-full overflow-y-scroll'>
                {
                    messages.map((message, index) => (
                        <Message 
                        key={index} 
                        owner={message.owner} 
                        content={message.content} 
                        />
                    ))
                }
            </div>
            <Input/>
        </div>
    )
}

export default Chat