import React, { useContext, useState } from 'react'
import { UserContext } from '../Router';

function RightBar() {
  const {user, data} = useContext(UserContext)
  const [search, setSearch] = useState("")

  return (
    <div className='h-full w-[400px] px-7 flex flex-col bg-darkbg overflow-hidden'>
       <input onChange={(e) => setSearch(e.target.value)} type="text" className='w-full py-2 mr-auto rounded-xl border border-darktext bg-transparent text-sm px-10 outline-none text-white' placeholder='Search Friends!'/>
       <h1 className='pt-5 pb-3 font-medium tracking-wide text-sm'>Friends</h1>
       <ul className='flex flex-col'>
        {data?.users[user?.id]?.Following?.filter((friend) => {
          return friend?.uid !== user?.uid
        }).filter((data) => {
          if(search === "") {
            return data
        } else if (data.Username.toLowerCase().includes(search.toLowerCase())) {
            return data
        }
        }).map((Friend) => (
          <div key={Friend?.Username} className="h-full py-2 px-2 flex items-center gap-3 hover:bg-darkprimary rounded-xl transition-all duration-150 cursor-pointer">
            <img src={Friend.ProfilePhoto} className="h-10 w-10 rounded-full"/>
            <h1>{Friend?.Username}</h1>
          </div>
        ))}
       </ul>
    </div>
  )
}

export default RightBar