import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import axios from 'axios';

const ChangePassword = ({toast}) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const updatePassword = async() => {
        const url = `/api/users/change-password`
        const data = {
            oldPassword: oldPassword,
            newPassword : newPassword
        }
        await axios.post(url, data)
        .then((res) => console.log(res))
        .catch((err) => {
            // console.log(err);
            toast(``)
        })
    }
    return (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium my-5 hover:bg-gray-400">
                Change Password
            </button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Change Password
                </Dialog.Title>
                
                <div className='flex flex-col w-full '>
                        <p className='text-sm pl-5'>Old Password</p>
                        <input
                            className='h-10 max-md:h-8 w-full  rounded-md  bg-gray-200 outline-none border-none pl-5'
                            type="text"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col w-full '>
                        <p className='text-sm pl-5'>new Password</p>
                        <input
                            className='h-10 max-md:h-8 w-full  rounded-md  bg-gray-200 outline-none border-none pl-5'
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div> 
                <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                        <button 
                        onClick={updatePassword}
                        className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                            Update Password
                        </button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button
                        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);
}

export default ChangePassword;