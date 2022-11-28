import React, { useContext, useState } from 'react'
import { BsGrid } from "react-icons/bs"
import { SlPeople } from "react-icons/sl"
import { RiMessage2Line } from "react-icons/ri"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BiUser } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from "../Router"

function Navbar() {
    const {user} = useContext(UserContext)
    const location = useLocation();
    const navigate = useNavigate()
    const [navlinksusestate, setNavlinksusestate] = useState([
        {
            link: "/",
            title: "Feed",
            icon: <BsGrid size={20}/>,
            active: true,
        },
        {
            link: "/Community",
            title: "My community",
            icon: <SlPeople size={20}/>,
            active: false,
        },
        {
            link: "/Messages",
            title: "Messages",
            icon: <RiMessage2Line size={20}/>,
            active: false,
        },
        {
            link: "/Notifications",
            title: "Notifications",
            icon: <IoMdNotificationsOutline size={20}/>,
            active: false,
        },
        {
            link: "/Profile",
            title: "Profile",
            icon: <BiUser size={20}/>,
            active: false,
        },
        {
            link: "/Logout",
            title: "Logout",
            icon: <FiLogOut size={20}/>,
            active: false,
        },
])

  return (
    <>
    {user ? (
        <div className='w-[300px] h-full flex flex-col items-center overflow-hidden'>
        <ul className='text-darktext font-[300] w-full text-[15px] flex flex-col items-center gap-4'>
            {user && navlinksusestate?.map((nav, i) => {
                return (
                    <li key={i} onClick={() => {navigate(`${nav.link}`)}} className={`flex gap-4 items-center cursor-pointer transition-all duration-100 py-2 w-[75%] px-3 rounded-md ${location.pathname !== nav.link ? "hover:opacity-75":"bg-navactive text-activetext"} text-activetext`}>{nav.icon} <span>{nav.title}</span></li>
                )
            })}
        </ul>
    </div>
    ):null}
    </>
  )
}

export default Navbar