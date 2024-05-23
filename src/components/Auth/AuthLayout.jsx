import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({ children }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    let authStatus = localStorage.getItem("isLogin")
    const navigationFunction = () => {
        if (authStatus === "true") {
        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        navigationFunction()
        setLoader(false)
    }, [authStatus, navigate])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}