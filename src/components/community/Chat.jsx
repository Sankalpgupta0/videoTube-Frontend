import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import axios from 'axios'


const Chat = () => {
    const [msgFromDB, setMsgFromDB] = useState([])
    const [msgFromSockets, setMsgFromSockets] = useState([])
    const [input, setInput] = useState("")
    const [currentUser, setCurrentUser] = useState('')
    const socketRef = useRef(null);
    const msgEndRef = useRef(null);

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
        if(input.trim() == ""){
            console.log("input field is empty");
            return
        }
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
        socketRef.current = new WebSocket(`wss://videotube-backend-i2ho.onrender.com?_id=${userId}`);
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

    useEffect(() => {
        msgEndRef.current?.scrollIntoView()
    },[msgFromSockets])
    
    return (
        <div className='w-full inputHeight ' >
            <div className='h-[90%] w-full overflow-y-scroll'>
                {
                    msgFromDB.map((message, index) => {
                        // console.log(message);
                        return(
                            <Message
                                key={index}
                                owner={message.owner}
                                content={message.content}
                                date = {message.createdAt}
                            />
                        )
                    })
                }
                <h1 className='text-white text-center'>{msgFromSockets.length > 0?"NEW MESSAGES" : ""}</h1>
                {
                    msgFromSockets.map((message, index) => {
                        // console.log(message);
                        message = JSON.parse(message)
                        return(
                            <Message
                                key={index}
                                owner={message.owner}
                                content={message.content}
                                date={Date.now()}
                            />
                        )
                        })
                }
                <div ref={msgEndRef} className='h-[10px]'></div>
            </div>

            <div
                onKeyDown={(e) => {
                    if (e.key == "Enter")
                        sendMsg()
                }}
                className='w-full h-[10%]  absolute bottom-0 px-10 max-md:px-0 '
            >
                <div className='w-full h-full flex rounded-2xl overflow-hidden'>
                    <input
                        type="text"
                        className='w-[90%] max-md:w-[80%] h-full bg-white px-5 py-5 text-xl border-none outline-none '
                        placeholder='Enter your thoughts...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={sendMsg}
                        className='w-[10%] max-md:w-[20%] rounded-tr-2xl rounded-br-2xl h-full bg-green-500 text-center hover:bg-green-700 text-white text-xl font-extrabold'>
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat