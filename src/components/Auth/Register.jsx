import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// TODO: show error message from backend into frontend

const Register = () => {
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [WhichMessage, setWhichMessage] = useState(false)
    // Show or hide password handler
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)

    const navigate = useNavigate();

    const notifyError = ({ message }) => {
        console.log(message);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            if (WhichMessage) {
                notifyError({ message: "Please Wait You will be redirected to login page once signup is successfully" })
            }
            try {
                const formData = new FormData();
                formData.append('fullName', fullname);
                formData.append('username', username);
                formData.append('password', password);
                formData.append('confirmPassword', confirmPassword);
                formData.append('email', email);
                formData.append('avatar', avatar);
                formData.append('coverImage', coverImage);

                const response = await axios.post('/api/users/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        setWhichMessage(true)
                        //NOTE: make it  so that the user is redirected to dashboard after registration
                        navigate('/login')
                    })
                    .catch(err => {
                        notifyError({ message: err.response.data.statusCode.message })
                        setWhichMessage(true)
                    })
                // console.log('Server response:', response?.data);
            } catch (error) {
                setWhichMessage(false)
            }
        } else {
            notifyError({ message: "passwords do not match" })
        }
    };

    const handleGoogleAuth = async (decode) => {
        console.log(decode);
        let username;
        for (let i = 0; i < decode.email.length; i++) {
            if (decode.email[i] === '@') {
                username = decode.email.substring(0, i);
                setUsername(username);
                break;
            }
        }
        //username and password are same in case of google auth
        setFullname(decode.name)
        setEmail(decode.email)
        setPassword(username)
        setConfirmPassword(username)
        try {
            const formData = new FormData();
            formData.append('fullName', decode.name);
            formData.append('username', username);
            formData.append('password', username);
            formData.append('confirmPassword', username);
            formData.append('email', decode.email);
            formData.append('avatar', avatar);
            formData.append('coverImage', coverImage);

            const response = await axios.post('/api/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    setWhichMessage(true)
                    //NOTE: make it  so that the user is redirected to dashboard after registration
                    navigate('/login')
                })
                .catch(err => {
                    notifyError({ message: err.response.data.statusCode.message })
                    setWhichMessage(true)
                })
            // console.log('Server response:', response?.data);
        } catch (error) {
            setWhichMessage(false)
        }
    }

    return (
        <>
            <form className='w-screen min-h-screen flex justify-center items-center loginBg ' onSubmit={handleSubmit}>
                <div className=' w-3/4 max-md:h-full max-lg:w-full h-4/5 bg-[#11161f]/80 md:rounded-2xl px-10 shadow-2xl shadow-gray-600'>
                    <h1 className='text-center text-white'>*This is a testing version. application is still under process some of the features might not work </h1>
                    <p className='text-center text-xl text-white font-bold my-10 max-md:my-5'>Register</p>
                    <p className='text-center text-gray-300'>Already a user please ! <Link to="/login" className=' underline text-white'>Login</Link></p>
                    <div className='flex max-md:flex-col gap-5 my-5 max-md:my-2'>
                        <div className='flex flex-col w-1/2 max-md:w-full '>
                            <p className='text-sm text-[#D9E8FCB0] pl-5'>Full Name <span className='text-red-500'>*</span></p>
                            <input
                                className='h-10 max-md:h-8 rounded-md text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24] outline-none border-none pl-5'
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col w-1/2 max-md:w-full'>
                            <p className='text-sm text-[#D9E8FCB0] pl-5'>Username <span className='text-red-500'>*</span></p>
                            <input
                                className='h-10 max-md:h-8 rounded-md text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]  outline-none border-none pl-5'
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='flex max-md:flex-col gap-5 my-5'>
                        <div className='flex flex-col w-1/2 max-md:w-full'>
                            <p className='text-sm text-[#D9E8FCB0] pl-5'>Avatar</p>
                            <label
                                htmlFor="avatar"
                                className=' rounded-md text-white bg-transparent hover:bg-[#ADC8EB24]  outline-none border-none ' >
                                Upload Your Avatar {avatar.name}
                            </label>
                            <input
                                name='avatar'
                                className='hidden'
                                type="file"
                                id='avatar'
                                accept='image/*'
                                // value={avatar} 
                                formEncType='multipart/form-data'
                                onInput={(e) => {
                                    const x = e.target.files[0];
                                    setAvatar(x);
                                }}
                            />
                        </div>
                        <div className='flex flex-col w-1/2 max-md:w-full'>
                            <p className='text-sm text-[#D9E8FCB0] pl-5'>Cover Image</p>
                            <label
                                htmlFor="coverImage"
                                className=' rounded-md text-white bg-transparent hover:bg-[#ADC8EB24]  outline-none border-none' >
                                Upload a cover image {coverImage.name}
                            </label>
                            <input
                                className='hidden'
                                name='coverImage'
                                type="file"
                                id='coverImage'
                                accept="image/*"
                                formEncType='multipart/form-data'
                                onInput={(e) => {
                                    const x = e.target.files[0]
                                    setCoverImage(x);
                                }}
                            />
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm text-[#D9E8FCB0] pl-5'>Email <span className='text-red-500'>*</span></p>
                        <input
                            className='h-10 max-md:h-8 rounded-md w-full text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]  outline-none border-none pl-5'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex max-md:flex-col gap-5 my-5'>
                        <div className='flex flex-col w-1/2 max-md:w-full relative'>
                            <p className='text-sm text-[#D9E8FCB0] pl-5'>Password <span className='text-red-500'>*</span></p>
                            <input
                                className='h-10 max-md:h-8 rounded-md text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]  outline-none border-none pl-5'
                                type={`${showPassword ? 'text' : 'password'}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className=' text-xl absolute right-2 top-1/2'
                                type='button'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        <div className='flex flex-col w-1/2 max-md:w-full relative'>
                            <p className='text-sm text-[#D9E8FCB0] pl-5'>conform Password <span className='text-red-500'>*</span></p>
                            <input
                                className='h-10 max-md:h-8 rounded-md text-white bg-[#ADC8EB24]/10 hover:bg-[#ADC8EB24]  outline-none border-none pl-5'
                                type={`${showConfPassword ? 'text' : 'password'}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                className=' text-xl absolute right-2 top-1/2'
                                type='button'
                                onClick={() => setShowConfPassword((prev) => !prev)}
                            >
                                {showConfPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        <button
                            className='px-10 py-5 rounded-lg text-gray-300 bg-[#11161f]/80 hover:text-white hover:bg-[#11161f]'
                            type='submit'
                        >Sign Up</button>
                    </div>
                    <div className="separator text-white text-xl">OR</div>
                    <div className=' flex justify-center'>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                // console.log(credentialResponse);
                                const decoded = jwtDecode(credentialResponse.credential);
                                handleGoogleAuth(decoded)
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                    <p className='text-gray-400'>All <span className='text-red-500'>*</span>  fields are required.</p>
                </div>

            </form>
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

export default Register