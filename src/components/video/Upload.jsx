import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [descprition, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [uploading, setUploading] = useState(false);

    const uploadVideo = async(e) => {
        e.preventDefault();
        setUploading(true);
        if (title.trim().length === 0 || videoFile == null || thumbnail == null) {
            alert("All * fields must be filled out");
            setUploading(false); // Ensure uploading is set to false if validation fails
            return; // Exit the function early
        }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('descprition', descprition);
            formData.append('videoFile', videoFile);
            formData.append('thumbnail', thumbnail);
            
            try {
                const url = '/api/videos'
                const response = await axios.post(url, formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data.data.video);
            } catch (error) {
                console.log(error);
            } finally {
                setUploading(false);
            }

        }

    if(uploading) {
        return (
            <div className='w-screen h-screen absolute text-center bg-black/70 z-20 top-0 left-0 text-white text-3xl'>Uploading under process please wait... <br /> Do not touch key or process may be reverted ...</div>
        );
    }

    return (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
            <button className=" shadow-black inline-flex h-[35px] items-center justify-center rounded-full bg-white px-[15px]  font-medium leading-none outline-none">
                Upload
            </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-center m-0 text-[17px] font-medium">
                    Upload Video
                </AlertDialog.Title>
                <div  
                className='flex flex-col gap-y-4'
                >
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
                        <p className='text-sm  pl-5'>Video<span className='text-red-500'>*</span></p>
                        <label 
                        htmlFor="videoFile"
                        className='h-10 max-md:h-8 w-full rounded-md text-gray-400 outline-none border-none pl-5 cursor-pointer hover:bg-gray-100'
                        >
                            {videoFile? `${videoFile.name}` : "Select file to upload" }
                            {/* Select file to upload */}
                        </label>
                        <input 
                        id='videoFile' 
                        className='hidden'
                        type="file" 
                        accept='video/*'
                        // value={videoFile} 
                        formEncType='multipart/form-data'
                        onInput={(e) => {
                            const x = e.target.files[0]
                            console.log(x);
                            setVideoFile(x);
                        }}
                        />
                    </div>

                    <div className='flex flex-col w-full max-md:w-full '>
                        <p className='text-sm  pl-5'>Thumbnail<span className='text-red-500'>*</span></p>
                        <label 
                        htmlFor="Thumbnail"
                        className='h-10 max-md:h-8 w-full rounded-md outline-none border-none pl-5 text-gray-400 cursor-pointer hover:bg-gray-100'
                        >
                            {thumbnail? `${thumbnail.name}` : "Select Thumbnail for video" }
                            {/* Select Thumbnail for video */}
                        </label>
                        <input 
                        id='Thumbnail' 
                        className='hidden'
                        type="file" 
                        accept='image/*'
                        // value={thumbnail} 
                        formEncType='multipart/form-data'
                        onInput={(e) => {
                            const x = e.target.files[0]
                            setThumbnail(x);
                        }}
                        />
                        <p className='text-gray-500'><span className='text-red-500'>*</span>Uplaod videos of size below 100 mb</p>
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
                            onClick={uploadVideo} 
                            className=" inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                Upload
                            </button>
                        </AlertDialog.Action>
                    </div>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
    )
};

export default Upload;