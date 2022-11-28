import { ref, set } from 'firebase/database';
import React, { useContext, useState } from 'react'
import { database } from '../Firebase-Seed';
import { UserContext } from '../Router';
import CircularProgress from '@mui/material/CircularProgress';

function Navbar() {
  const { user, data, getData } = useContext(UserContext)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)

  function follow(FollowUser) {
    setLoading(true)
    set(ref(database, `users/${user?.id}/Following`), data?.users[user?.id]?.Following ? [
      ...data?.users[user?.id]?.Following, { Bio: FollowUser.Bio, Email: FollowUser.Email, ProfilePhoto: FollowUser.ProfilePhoto, Username: FollowUser.Username, id: FollowUser.id, uid: FollowUser.uid }
    ] : [
      { Bio: FollowUser.Bio, Email: FollowUser.Email, ProfilePhoto: FollowUser.ProfilePhoto, Username: FollowUser.Username, id: FollowUser.id, uid: FollowUser.uid }
    ])
    set(ref(database, `users/${FollowUser?.id}/Followers`), data?.users[FollowUser?.id]?.Followers ? [
      ...data?.users[FollowUser?.id]?.Followers, { Bio: user.Bio, Email: user.Email, ProfilePhoto: user.ProfilePhoto, Username: user.Username, id: user.id, uid: user.uid }
    ] : [
      { Bio: user.Bio, Email: user.Email, ProfilePhoto: user.ProfilePhoto, Username: user.Username, id: user.id, uid: user.uid }
    ])
    set(ref(database, `users/${FollowUser?.id}/Notifications`), [...data?.users[user?.id]?.Notifications, {Category: "Follow", Text: `${user?.Username} Followed You`, UserId: user?.id}])
    setTimeout(() => {
      getData()
      setLoading(false)
    }, 300);
  }

  function isFollowing(followUser) {
    let newfollowingdata = []
    data?.users[user?.id]?.Following?.filter((FollowingUsers) => {
      newfollowingdata.push(FollowingUsers.id)
    })
    return newfollowingdata.includes(followUser.id)
  }

  return (
    <div className='h-auto w-full px-7 flex items-center'>
      <h1 className='text-whitebg font-bold mr-[110px] text-[17px] flex gap-2 items-center py-5 justify-start'><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/chat-circle-blue-512.png" className='w-8 h-8 rounded-full' draggable="false" />MeetMax</h1>
      <div className="relative mr-auto w-[600px] flex flex-col">
        {user && <input onChange={(e) => setSearch(e.target.value)} type="text" className='w-full py-2 mr-auto rounded-xl border border-darktext bg-transparent text-sm px-10 outline-none text-white' onFocus={() => setModal(true)} placeholder='Search For User' />}
        {user && <h1 className='absolute right-2 text-lg top-1 cursor-pointer z-20 text-white ' onClick={() => setModal(false)}>X</h1>}
        <div className={`w-full absolute ${modal ? "h-[250px] py-3 px-3 overflow-y-auto" : "h-0"} top-full left-0 gap-3 flex flex-col transition-all duration-1000 bg-darkbg rounded-xl z-10`}>
          {data?.users?.filter((datauser) => {
            return datauser?.uid !== user?.uid
          }).map((filteredData) => {
            return filteredData
          }).filter((dt) => {
            if (search === "") {
              return dt
            } else if (dt.Username.toLowerCase().includes(search.toLowerCase())) {
              return dt
            }
          }).map((userdata) => {
            console.log(userdata)
            return (
              <div key={userdata.uid} className={`w-full h-auto py-2 ${modal ? "flex" : "hidden"} gap-3 px-3 py-2 w-full bg-darkprimary rounded-xl items-center`}>
                <img src={userdata?.ProfilePhoto} className="h-10 w-10 rounded-full" />
                <h1 className='text-lg text-white font-medium mr-auto'>{userdata?.Username}</h1>
                <button
                  className={`px-3 py-2 bg-blue ${isFollowing(userdata) ? "opacity-25 pointer-events-none":""} rounded-xl text-white text-sm hover:opacity-75`}
                  onClick={() => follow(userdata)}>
                  {loading ? <CircularProgress size={21} /> : isFollowing(userdata) ? "Following":"Follow"}
                </button>
              </div>
            )
          })}
        </div>
      </div>
      {user ? <div className="w-auto flex gap-3 h-auto text-white items-center relative"><span className='py-2 pl-5 pr-20 bg-darkprimary rounded-xl'>{user?.Username} </span><img src={user?.ProfilePhoto} alt={user?.Username} className="w-10 h-10 rounded-xl absolute right-0" /></div> : null}
    </div>
  )
}

export default Navbar