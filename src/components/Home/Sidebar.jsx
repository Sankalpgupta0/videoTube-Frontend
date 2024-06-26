import React from "react";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { RiFolderHistoryFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdPlaylistAddCircle } from "react-icons/md";
import axios from 'axios'

const Sidebar = () => {
    const open = useSelector((state) => state.sidebarReducer.open);

    return (
        <div className={`w-full h-screen flex`}>

            {/* make side bar sticky or fixed */}

            <div className={`${open ? "w-1/4" : "w-full"}  h-full bg-black/90 flex flex-col items-center gap-5`}>
                <NavLink
                    className={` hover:bg-black px-2 py-5 rounded-lg`}
                    to={"/home"}
                >
                    <FaHome size={30} color="white" />
                </NavLink>

                <NavLink
                    className=" hover:bg-black px-2 py-5 rounded-lg"
                    to={"/home/yourchannel"}
                >
                    <CgProfile size={30} color="white" />
                </NavLink>

                <NavLink
                    className=" hover:bg-black px-2 py-5 rounded-lg"
                    to={"/home/history"}
                >
                    <RiFolderHistoryFill size={30} color="white" />
                </NavLink>

                <NavLink
                    className=" hover:bg-black px-2 py-5 rounded-lg"
                    to={"/home/community"}
                >
                    <IoChatbubbleEllipsesSharp size={30} color="white" />
                </NavLink>

                <NavLink
                    className=" hover:bg-black px-2 py-5 rounded-lg"
                    to={"/home/playlist"}
                >
                    <MdPlaylistAddCircle size={30} color="white" />
                </NavLink>

                <NavLink
                    className=" hover:bg-black px-2 py-5 rounded-lg"
                    to={"/home/Setting"}
                >
                    <IoMdSettings size={30} color="white" />
                </NavLink>

            </div>
            <div
                className={`${open ? "" : "hidden"} text-gray-400  text-xl bg-black/90 w-3/4 h-full flex flex-col items-start  gap-5`}
            >
                <NavLink
                    className=" ml-5 px-2 py-5 hover:text-white"
                    to={"/home"}>
                    Home
                </NavLink>

                <NavLink
                    className={ ({isActive}) => isActive? "ml-5 px-2 py-5 font-extrabold text-white" : "ml-5 px-2 py-5 hover:text-white"}
                    to={"/home/yourchannel"}>
                    Your channel
                </NavLink>

                <NavLink
                    className={ ({isActive}) => isActive? "ml-5 px-2 py-5 font-extrabold text-white" : "ml-5 px-2 py-5 hover:text-white"}
                    to={"/home/history"}>
                    History
                </NavLink>

                <NavLink
                    className={ ({isActive}) => isActive? "ml-5 px-2 py-5 font-extrabold text-white" : "ml-5 px-2 py-5 hover:text-white"}
                    to={"/home/community"}>
                    Community
                </NavLink>

                <NavLink
                    className={ ({isActive}) => isActive? "ml-5 px-2 py-5 font-extrabold text-white" : "ml-5 px-2 py-5 hover:text-white"}
                    to={"/home/playlist"}>
                    Your Playlist
                </NavLink>

                <NavLink
                    className={ ({isActive}) => isActive? "ml-5 px-2 py-5 font-extrabold text-white" : "ml-5 px-2 py-5 hover:text-white"}
                    to={"/home/Setting"}>
                    Setting
                </NavLink>

            </div>
        </div>
    );
};

export default Sidebar;
