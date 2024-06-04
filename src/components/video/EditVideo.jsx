import React, { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditVideo = ({ tit, descprit, thumb }) => {
    const [title, setTitle] = useState(tit || "");
    const [descprition, setDescription] = useState(descprit || "");
    const [thumbnail, setThumbnail] = useState(thumb || '');

    const { videoId } = useParams()

    const EditVideo = async () => {
        const formData = new FormData()
        formData.append("title", title);
        formData.append('description', descprition);
        formData.append('thumbnail', thumbnail);

        const url = `/api/videos/${videoId}`
        try {
            const res = axios.patch(url, formData)
            console.log(res);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button className=" shadow-black inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px]  font-medium leading-none outline-none">
                    Edit video
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <AlertDialog.Title className="text-center m-0 text-[17px] font-medium">
                        Edit Video
                    </AlertDialog.Title>
                    <div
                        className='flex flex-col gap-y-4'
                    >
                        <div className='flex flex-col w-full max-md:w-full '>
                            <p className='text-sm  pl-5'>Title</p>
                            <input
                                className='h-10 w-full max-md:h-8 rounded-md outline-none border-none pl-5'
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Enter Title...'
                            />
                        </div>

                        <div className='flex flex-col w-full max-md:w-full '>
                            <p className='text-sm  pl-5'>Description</p>
                            <input
                                className='h-10 max-md:h-8 w-full rounded-md outline-none border-none pl-5'
                                type="text"
                                value={descprition}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Enter Description...'
                            />
                        </div>

                        <div className='flex flex-col w-full max-md:w-full '>
                            <p className='text-sm  pl-5'>Thumbnail</p>
                            <label
                                htmlFor="Thumbnail"
                                className='h-10 max-md:h-8 w-full rounded-md outline-none border-none pl-5 text-gray-400 cursor-pointer hover:bg-gray-100'
                            >
                                {thumbnail ? `${thumbnail.slice(64)}` : "Select Thumbnail for video"}
                                {/* Select Thumbnail for video */}
                            </label>
                            <input
                                id='Thumbnail'
                                className='hidden'
                                type="file"
                                accept='image/*'
                                formEncType='multipart/form-data'
                                onInput={(e) => {
                                    const x = e.target.files[0]
                                    setThumbnail(x);
                                }}
                            />
                        </div>
                        <div className="flex justify-end gap-[25px]">
                            <AlertDialog.Cancel asChild>
                                <button
                                    className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    Cancel
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button
                                    onClick={EditVideo}
                                    className=" inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    Save Changes
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
};

export default EditVideo