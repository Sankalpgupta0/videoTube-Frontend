import React, { useEffect, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';
import ChangePassword from './ChangePassword';


const UpdateInfo = ({toast}) => {
    const [fullname, setFullname] = useState( '')
    const [email, setEmail] = useState('')
    const [currentUser, setCurrentUser] = useState("")
    const [avatar, setAvatar] = useState('')
    const [coverImage, setCoverImage] = useState('')

    const getcurrentUser = async () => {
        const url = '/api/users/current-user'
        const response = await axios.get(url)
        // console.log(response.data.data);
        setCurrentUser(response.data.data)
        setFullname(response.data.data.fullName)
        setEmail(response.data.data.email)
        setAvatar(response.data.data.avatar)
        setCoverImage(response.data.data.coverImage)
    }

    useEffect(() => {
        getcurrentUser()
    }, [])
    const updateInfo = async() => {
        if(currentUser.avatar != avatar){
            const url = `/api/users/avatar`
            const formData = new FormData();
            formData.append("avatar", avatar)
            await axios.patch(url, formData)
            .then((res) => setAvatar(res.data.data.avatar))
        }
        if(currentUser.coverImage != coverImage){
            const url = `/api/users/cover-image`
            const formData = new FormData();
            formData.append("coverImage", coverImage)
            await axios.patch(url, formData)
            .then((res) => setCoverImage(res.data.data.coverImage))
        }
        if(currentUser.fullName != fullname || currentUser.email != email){
            const url = `/api/users/update-account`
            const data = {
                fullName : fullname,
                email : email
            }
            await axios.patch(url, data)
            .then((res) => {})
        }
    }

    return (
    <AlertDialog.Root >
        <AlertDialog.Trigger asChild>
            <button className="inline-flex h-[35px] max-sm:h-[60px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium m-10 ">
                Update Account Information
            </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal className="overflow-y-scroll">
            <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[85vh] overflow-y-scroll w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Update Account Information
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                    This action cannot be undone. Only Enter Info that you want to change !!!
                </AlertDialog.Description>
                <div className='w-full'>
                    <label className='flex items-center hover:bg-gray-300 p-5 rounded-xl cursor-pointer' htmlFor='avatar'>
                        <img src={avatar} className='h-[100px] max-sm:h-[50px]' />
                        <p className=' mx-10  max-sm:mx-5'>Change Avatar</p>
                    </label>
                    <input 
                    type="file" 
                    id='avatar' 
                    className='hidden'  
                    formEncType='multipart/form-data'
                    accept='image/*'
                    onInput={(e) => {
                        const x = e.target.files[0];
                        setAvatar(x);
                    }}
                    />

                    <label className='flex items-center hover:bg-gray-300 p-5 rounded-xl cursor-pointer' htmlFor='CoverImage'>
                        <img src={coverImage} className='h-[100px] max-sm:h-[50px]' />
                        <p className=' mx-10 max-sm:mx-5'>Change CoverImage</p>
                    </label>
                    <input 
                    type="file" 
                    id='CoverImage' 
                    className='hidden'  
                    onInput={(e) => {
                        const x = e.target.files[0];
                        setCoverImage(x);
                    }}
                    />

                    <div className='flex flex-col w-full my-5'>
                        <p className='text-sm pl-5'>Full Name</p>
                        <input
                            className='h-10 max-md:h-8 w-full  rounded-md  bg-gray-200 outline-none border-none pl-5'
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full my-5'>
                        <p className='text-sm pl-5'>email</p>
                        <input
                            className='h-10 max-md:h-8 w-full  rounded-md  bg-gray-200 outline-none border-none pl-5'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <ChangePassword toast={toast}/>
                    

                </div>

                <div className="flex justify-end gap-[25px]">
                    <AlertDialog.Cancel asChild>
                        <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                            Cancel
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                        onClick={updateInfo}
                        >
                            Update Info
                        </button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);
}
export default UpdateInfo;