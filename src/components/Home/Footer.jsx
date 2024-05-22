import React from 'react'
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";

const Footer = () => {
    return (
        <div className='flex justify-center items-center gap-5 mt-10'>
            <button className='hover:bg-gray-600 rounded-lg'>
                <MdSkipPrevious size={60} color='white' />
            </button>

            <button className='hover:bg-gray-600 rounded-lg'>
                <MdSkipNext size={60} color='white' />
            </button>
        </div>
    )
}

export default Footer