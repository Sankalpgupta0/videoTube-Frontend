import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import axios from 'axios'


const Chat = () => {
    const [msgFromDB, setMsgFromDB] = useState([])
    const [msgFromSockets, setMsgFromSockets] = useState([])
    const [input, setInput] = useState("")
    const [currentUser, setCurrentUser] = useState('')
    const socketRef = useRef(null);

    const getMessages = () => {
        axios.get('/api/tweets')
            .then(res => setMsgFromDB(res.data.data.tweets))
    }

    const getcurrentUser = async () => {
        const url = '/api/users/current-user'
        const response = await axios.get(url)
        // console.log(response.data.data);
        setCurrentUser(response.data.data)
        connectSocket({userId:response.data.data._id})
    }

    const sendMsg = () => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(input);
            // console.log(`Sent message => ${input}`);
            setInput('');
        } else {
            console.error('WebSocket is not open');
        }
    };

    const connectSocket = ({userId}) => {
        // Create a WebSocket connection
        socketRef.current = new WebSocket(`${import.meta.env.VITE_SERVER}/home/community?_id=${userId}`);
        console.log("connected");

        // Handle incoming messages
        socketRef.current.onmessage = (event) => {
            // console.log(event);
            setMsgFromSockets((prevMsgs) => [...prevMsgs, event.data]);
            // console.log(`Received message => ${event.data}`);
        };

        // Handle WebSocket connection close
        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Handle WebSocket connection errors
        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };

    useEffect(() => {
        getcurrentUser()
        getMessages()
    }, [])
    return (
        <div className='w-full inputHeight ' >
            <div className='h-[90%] w-full overflow-y-scroll'>
                {
                    msgFromDB.map((message, index) => (
                        <Message
                            key={index}
                            owner={message.owner}
                            content={message.content}
                        />
                    ))
                }
                {
                    msgFromSockets.map((message, index) => {
                        message = JSON.parse(message)
                        return(
                            <Message
                                key={index}
                                owner={message.owner}
                                content={message.content}
                            />
                        )
                        })
                }
            </div>

            <div
                onKeyDown={(e) => {
                    if (e.key == "Enter")
                        sendMsg()
                }}
                className='w-full h-[10%]  absolute bottom-0 px-10 '
            >
                <div className='w-full h-full flex rounded-2xl overflow-hidden'>
                    <input
                        type="text"
                        className='w-[90%] h-full bg-white px-5 py-5 text-xl border-none outline-none '
                        placeholder='Enter your thoughts...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={sendMsg}
                        className='w-[10%] rounded-tr-2xl rounded-br-2xl h-full bg-green-500 text-center hover:bg-green-700 text-white text-xl font-extrabold'>
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat