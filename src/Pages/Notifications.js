import React, { useContext, useEffect } from 'react'
import RightBar from '../Components/RightBar'
import { FiSettings } from "react-icons/fi"
import { UserContext } from '../Router'

function Notifications() {
  const {user, data, getData} = useContext(UserContext)
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
    <div className='w-full h-auto flex text-[#fff]'>
      <div className="h-auto px-10 py-10 flex flex-col gap-5 w-full rounded-t-xl items-center bg-darkprimary pt-7">
        <div className="w-full h-full px-5 py-3 min-h-screen bg-darkbg rounded-xl">
          <h1 className='font-semibold text-md flex items-center justify-between py-3'>Notifications <span className='cursor-pointer animate-pulse duration-300 transition-all hover:scale-95'><FiSettings/></span></h1>
          <hr/>
          {data?.users[user?.id]?.Notifications?.map((Notification) => {
          return (
          <>
          <h1 className='font-semibold text-lg flex items-center py-3'>
            {Notification?.Category === "Hi" ? "👋" : Notification?.Category === "Follow" ? "🥳":null}
            <span className=''>
              <img src={data?.users[Notification?.UserId]?.ProfilePhoto} className="w-10 h-10 rounded-full mx-3" />
            </span>
            <span className='text-sm font-medium'>{Notification?.Text}</span>
          </h1>
          <hr/>
          </> 
          )})}
        </div>
      </div>
      <RightBar/>
    </div>
    </>
  )
}

export default Notifications