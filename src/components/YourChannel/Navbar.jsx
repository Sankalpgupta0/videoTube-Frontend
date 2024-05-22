import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Upload from '../video/Upload'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleOption } from '../../store+slice/videoOptions.slice'

const Navbar = () => {
    const [select, setSelect] = useState(localStorage.getItem("select") || 'uploads')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    return (
        <>
            <div className='flex justify-between px-20 items-center mt-10'>
                <p className='text-gray-300 text-center text-xl'>
                    <select
                        name="user-Choice"
                        value={select}
                        onChange={(e) => {
                            setSelect(e.target.value)
                            dispatch(toggleOption(e.target.value))
                        }}
                        className=' bg-transparent outline-none border-none'
                    >
                        <option value="uploads">Uploaded Videos</option>
                        <option value="likes">liked Videos</option>
                    </select>
                </p>
                <Upload />
            </div>
            <hr className='mt-10 text-white' />
        </>
    )
}

export default Navbar