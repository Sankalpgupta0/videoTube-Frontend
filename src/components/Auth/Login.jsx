import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store+slice/auth.slice.js'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [isUsername, setIsUsername] = useState(true);
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const loginStatus = useSelector((state) => state.AuthReducer.status)
    // function setCookie(name, value, days, path, domain, secure, sameSite) {
    //     let expires = "";
    //     if (days) {
    //         let date = new Date();
    //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //         expires = "; expires=" + date.toUTCString();
    //     }

    //     let cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires;

    //     if (path) {
    //         cookie += "; path=" + path;
    //     }
    //     if (domain) {
    //         cookie += "; domain=" + domain;
    //     }
    //     if (secure) {
    //         cookie += "; Secure";
    //     }
    //     if (sameSite) {
    //         cookie += "; SameSite=" + sameSite;
    //     }

    //     document.cookie = cookie;
    // }

    const notifyError = ({ message }) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const notifyLogin = ({ message }) => {
        console.log(message);
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    useEffect(() => {
        if (usernameOrEmail.includes('@')) {
            setIsUsername(false)
        } else {
            setIsUsername(true)
        }
    }, [usernameOrEmail])

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true)
        const url = '/api/users/login';
        let data;
        if (isUsername) {
            data = {
                username: usernameOrEmail,
                password,
            }
        } else {
            data = {
                email: usernameOrEmail,
                password,
            }
        }

        axios.post(url, data)
            .then((res) => {
                // ways to set cookies from frontend
                /* 1. Using the browser's built-in functionality */
                // document.cookie =  `accessToken : ${res.data.data.accessToken}`;
                // document.cookie = `refreshToken : ${res.data.data.refreshToken}`;

                /* 2. Using js-cookies library */
                // setCookie("accessToken", res.data.data.accessToken, import.meta.env.VITE_ACCESS_TOKEN_EXPIRY);
                // setCookie("refreshToken", res.data.data.refreshToken,import.meta.env.VITE_REFRESH_TOKEN_EXPIRY);
                dispatch(login())
                navigate('/');
                notifyLogin({ message: res.data.message })
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data.statusCode);
                setLoading(false)
                notifyError({ message: err.response.data.statusCode.message })
            })
        setLoading(false);

    }

    const handleGoogleAuthLogin = async (decode) => {
        console.log(decode);
        setLoading(true)
        //username and password are same in case of google auth
        let username;
        setUsernameOrEmail(decode.email)
        for (let i = 0; i < decode.email.length; i++) {
            if (decode.email[i] === '@') {
                username = decode.email.substring(0, i);
                setPassword(username);
                break;
            }
        }
        const url = '/api/users/login';
        let data = {
            email: decode.email,
            password: username
        }

        axios.post(url, data)
            .then((res) => {
                dispatch(login())
                navigate('/');
                notifyLogin({ message: res.data.message })
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.response.data.statusCode);
                setLoading(false)
                notifyError({ message: err.response.data.statusCode.message })
            })
        setLoading(false);
    }



    if (loading) {
        return <Loader from="Login" to="Home" />;
    }

    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center loginBg'>
                <form
                    method='POST'
                    onSubmit={loginUser}
                    className=' w-3/4 max-md:h-full max-lg:w-full h-3/4 bg-[#11161f]/80 md:rounded-2xl px-20 max-lg:px-10 max-md:px-2 shadow-2xl shadow-gray-600'>
                    <p className='text-center text-xl text-white font-bold my-10'>Login</p>
                    <p className='text-center text-gray-300'>Don't have a Account please ! <Link to="/Register" className=' underline text-white'>Register</Link></p>

                    <div className='flex w-full justify-end items-center gap-5 my-10 max-md:flex-col'>
                        <p className='text-sm text-[#D9E8FCB0] pl-5'>username Or Email <span className='text-red-500'>*</span></p>
                        <input
                            type={`${isUsername ? 'text' : 'email'}`}
                            className='max-lg:w-3/5 pl-5 outline-none border-none h-10 rounded-md w-3/4 max-md:w-full text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]'
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)} />
                    </div>
                    <div className='flex w-full justify-end items-center gap-5 my-10 relative max-md:flex-col'>
                        <p className='text-sm text-[#D9E8FCB0] pl-5'>Password <span className='text-red-500'>*</span></p>
                        <input
                            type={`${showPassword ? 'text' : 'password'}`}
                            className='max-lg:w-3/5 pl-5 outline-none border-none h-10 rounded-md w-3/4 max-md:w-full text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className=' text-xl absolute right-2'
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button
                            className='px-10 py-5 rounded-lg text-gray-300 bg-[#11161f]/80 hover:text-white hover:bg-[#11161f]'
                            type='submit'
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="separator text-white text-xl">OR</div>
                    <div className=' flex justify-center'>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                // console.log(credentialResponse);
                                const decoded = jwtDecode(credentialResponse.credential);
                                handleGoogleAuthLogin(decoded)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <p className='text-gray-400'>All <span className='text-red-500'>*</span> fields are required.</p>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Slide
            />
        </>
    )
}

export default Login