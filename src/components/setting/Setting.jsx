import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Setting = () => {
    const [select, setSelect] = useState("dark");
    const navigate = useNavigate();

    const logoutHandler = async() => {
        const url = '/api/users/logout'
        const response = await axios.post(url)
        .then((res) => {
            console.log(res.data.message)
            navigate("/login")
        })
    }

    return (
        <div className='w-full h-[91vh] flex py-10 justify-center items-center' >
            <div className='w-2/3 h-2/4  bg-black/90 rounded-2xl '>
            <div className="theme flex justify-between mx-40 text-white my-10  text-xl items-center">
                <p>Theme</p>
                <select 
                name="theme" 
                value={select}
                onChange={(e) => {
                    setSelect(e.target.value)
                }}
                className='  outline-none border-none px-5 py-1 rounded-xl text-black text-xl'
                >
                    <option value="light" > Light</option>
                    <option value="dark" defaultChecked> Dark</option>
                </select>
            </div>
            <div className="deleteChannel text-white">
                <button className='bg-red-700 px-10 py-3 rounded-full mx-40 my-5 hover:bg-red-800'>
                    Clear watch History
                </button>
            </div>
            <div className="logout text-white">
                <button className='bg-red-700 px-10 py-3 rounded-full mx-40 hover:bg-red-800' onClick={logoutHandler}>
                    Log Out
                </button>
            </div>
            <div className="deleteChannel text-white">
                <button className='bg-red-700 px-10 py-3 rounded-full mx-40 my-5 hover:bg-red-800'>
                    Delete Channel
                </button>
            </div>
            </div>
        </div>
    )
}

export default Setting