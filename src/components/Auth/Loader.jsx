import React from 'react'

const Loader = ({from, to}) => {
    return (
        <div className='flex justify-center items-center'>
            <h1 className="text-xl font-semibold">Please Wait You will be redirected to {to} page once {from} successfully </h1>
        </div>
    )
}

export default Loader