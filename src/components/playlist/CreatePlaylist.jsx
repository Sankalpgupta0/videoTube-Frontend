import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';

const CreatePlaylist = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const createPlaylist = async() => {
        setDescription("");
        setTitle("");
        const url = '/api/playlist'
        const data = {
            name: title,
            description
        }
        const response = await axios.post(url, data);
        console.log(response.data)
    }

    return (
        
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className="hover:bg-black px-5 py-2 rounded-full border-none outline-none">
                    Create New Playlist ⊕
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Create New Playlist
                    </AlertDialog.Title>
                    <div className='flex flex-col w-full max-md:w-full '>
                        <p className='text-sm  pl-5'>Title<span className='text-red-500'>*</span></p>
                        <input 
                        className='h-10 w-full max-md:h-8 rounded-md outline-none border-none pl-5'
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter Title...'
                        />
                    </div>

                    <div className='flex flex-col w-full max-md:w-full '>
                        <p className='text-sm  pl-5'>Description<span className='text-red-500'>*</span></p>
                        <input 
                        className='h-10 max-md:h-8 w-full rounded-md outline-none border-none pl-5'
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter Description...'
                        />
                    </div>

                    <div className="flex justify-end gap-[25px]">
                        <AlertDialog.Cancel asChild>
                            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button 
                            onClick={createPlaylist}
                            className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                create
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
};

export default CreatePlaylist;