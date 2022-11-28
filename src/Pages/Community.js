import { ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RightBar from '../Components/RightBar'
import { database } from '../Firebase-Seed';
import { UserContext } from '../Router';
import CircularProgress from '@mui/material/CircularProgress';

function Community() {
  const {user, data, getData} = useContext(UserContext)
  const [page, setPage] = useState("Followers")
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [page])

  function CreateMessage() {
    setloading(true)
    setTimeout(() => {
      setloading(false)
      getData()
      setTimeout(() => {
        navigate("/Messages")
      }, 300);
    }, 300);
  }

  return (
    <div className='w-full h-auto flex items-center text-[#fff] '>
       <div className="h-full min-h-screen flex flex-col gap-5 w-full rounded-t-xl items-center bg-darkprimary pt-7">
        <div className="w-[95%] py-4 bg-darkbg rounded-xl px-5 flex gap-5">
          <button disabled={page === "Followers"} onClick={() => setPage("Followers")} className={`h-[45px] ${page === "Followers" ? "bg-blue":"border-darkprimary border"} outline-none px-20 rounded-xl cursor-pointer`}>{data?.users[user?.id]?.Followers ? data?.users[user?.id]?.Followers?.length : "0"} Followers</button>
          <button disabled={page === "Following"} onClick={() => setPage("Following")} className={`h-[45px] ${page === "Following" ? "bg-blue":"border-darkprimary border"} outline-none px-20 rounded-xl cursor-pointer`}>{data?.users[user?.id]?.Following ? data?.users[user?.id]?.Following?.length : "0"} Following</button>
        </div>
        {page === "Followers" ? (
          <div className="w-[95%] h-auto flex flex-row gap-5 flex-wrap">
          {data?.users[user?.id]?.Followers?.map((alluser) => {
            return (
              <div className='h-auto flex-shrink-0 w-[25%] rounded-xl items-center justify-between flex flex-col px-3 py-3 bg-darkbg'>
                <div className="w-full h-auto flex gap-3 items-center pb-2">
                <img src={alluser.ProfilePhoto} className="w-14 h-14 rounded-full"/>
                <h1 className='w-full flex-wrap'>{alluser.Username}<br/><span className='text-white/50 text-sm w-full flex-wrap'>{alluser.Bio}</span></h1>
                </div>
                <button className="w-full h-[40px] bg-blue rounded-xl hover:opacity-90" onClick={() => CreateMessage(alluser)}>{loading ? <CircularProgress size={21}/>:"Send Message"}</button>
              </div>
            )
          })}
        </div>
        ):(
          <div className="w-[95%] h-auto flex flex-row gap-5 flex-wrap">
          {data?.users[user?.id]?.Following?.map((alluser) => {
            return (
              <div key={alluser.ProfilePhoto} className='h-auto flex-shrink-0 w-[25%] rounded-xl items-center justify-between flex flex-col px-3 py-3 bg-darkbg'>
                <div className="w-full h-auto flex gap-3 items-center pb-2">
                <img src={alluser.ProfilePhoto} className="w-14 h-14 rounded-full"/>
                <h1 className='w-full flex-wrap'>{alluser.Username}<br/><span className='text-white/50 text-sm w-full flex-wrap'>{alluser.Bio}</span></h1>
                </div>
                <button className="w-full h-[40px] bg-blue rounded-xl hover:opacity-90" onClick={() => CreateMessage()}>{loading ? <CircularProgress size={21}/>:"Send Message"}</button>
              </div>
            )
          })}
        </div>
        )}
       </div>
      <RightBar/>
    </div>
  )
}

export default Community