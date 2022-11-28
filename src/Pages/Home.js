import React, { useContext, useEffect, useState } from 'react'
import LeftBar from "../Components/RightBar"
import { UserContext } from "../Router"
import CircularProgress from '@mui/material/CircularProgress';
import { ref, set } from 'firebase/database';
import { database } from '../Firebase-Seed';
import sendSvg from "./send.svg"

function Home() {
  const {user, data, getData} = useContext(UserContext)
  const [post, setPost] = useState({Title: "", Photo:""})
  const [loading, setLoading] = useState(false)
  const [cmnt, setcomment] = useState("")
  
  useEffect(() => {
    getData()
  }, [])

  function createPost(e) {
    e.preventDefault()
    setLoading(true)
    set(ref(database, `/users/${user?.id}/posts`), data?.users[user.id]?.posts ? [
      ...data?.users[user.id]?.posts, post
    ] : [
      post
    ])
    setTimeout(() => {
        setPost({Title: "", Photo: ""})
        setLoading(false)
      }, 500);
    getData()
  }

  function postreply(iduser, postindex) {
    if(Comment !== "") {
    set(ref(database, `/users/${iduser.id}/posts/${postindex}/replies/`), data?.users[iduser.id]?.posts[postindex]?.replies ? [
      ...data?.users[iduser.id]?.posts[postindex]?.replies, {Username: user?.Username, ProfilePhoto: user?.ProfilePhoto, Comment: cmnt}
    ] : [
      {Username: user?.Username, ProfilePhoto: user?.ProfilePhoto, Comment: cmnt}
    ])
    setcomment("")
  }
  getData()
  }

  return (
    <>
    <div className='w-full h-auto flex items-center text-[#fff]'>
      <div className="h-full flex flex-col gap-5 w-full rounded-t-xl items-center bg-darkprimary pt-7">
        <form onSubmit={(e) => createPost(e)} className="w-[600px] h-auto py-5 px-3 bg-darkbg rounded-xl gap-3 flex flex-col">
          <label className='flex items-center justify-center'>
            <img src={user.ProfilePhoto} className="w-10 h-10 rounded-full mr-auto"/>
            <input value={post?.Title}  type="text" required onChange={(e) => setPost(item => ({...item, Title:e.target.value}))} className='py-3 px-3 w-[90%] rounded-xl outline-none text-white bg-darkprimary text-sm' placeholder='What&#39;s Happening?'/>
          </label>
          <input value={post?.Photo} type="text" onChange={(e) => setPost(item => ({...item, Photo:e.target.value}))} className='py-3 px-3 w-full rounded-xl outline-none text-white bg-darkprimary text-sm' placeholder='Image Url'/>
          <button type="submit" className="w-full py-3 text-[14px] rounded-lg text-white bg-blue cursor-pointer outline-none flex items-center justify-center hover:opacity-80">{!loading ? "Post":<CircularProgress size={21}/>}</button>
        </form>
        <div className="h-auto w-full min-h-screen items-center flex flex-col gap-3">
        {data?.users?.map((allusers) => {
            return (
              <div key={allusers?.Username}>
              {allusers?.posts?.map((post, i) => {
                return(
                  <div key={`${allusers.uid}${post.id}${i}`} className='w-[600px] pt-5 py-3 px-3 bg-darkbg rounded-xl flex flex-col'>
                  <div className="h-auto w-full flex gap-3 items-center">
                    <img src={allusers.ProfilePhoto} className="w-10 h-10 rounded-full" />
                    <h1 className='text-white/60'>{allusers.Username}</h1>
                  </div>
                  <h1 className='w-full h-auto py-3 text-sm font-semibold text-white'>{post.Title}</h1>
                  {post.Photo && <img src={post.Photo} className="w-full rounded-xl"/>}
                  <div onSubmit={(e) => postreply(allusers, i, e)} className="w-full pt-3 flex items-center justify-between gap-3">
                  <input value={cmnt} onChange={(e) => setcomment(e.target.value)} type="text" className='w-full py-2 mr-auto rounded-xl border border-darktext bg-transparent text-sm px-10 outline-none text-white' placeholder='Write Your Comment!'/>
                  <button className='w-[37px] h-[37px]'><img src={sendSvg} onClick={() => postreply(allusers, i)} className="rounded-xl p-2 cursor-pointer hover:opacity-70 bg-blue"/></button>
                  </div>
                  {post?.replies?.map((rply) => (
                      <div key={rply.Comment} className='w-full h-auto flex gap-3 py-2 px-3 bg-darkprimary mt-2 rounded-xl flex-wrap items-center'>
                        <img src={rply.ProfilePhoto} className="w-10 h-10 rounded-full"/>
                        <h1 className='text-sm w-[90%] text-white/60'>{rply.Username}</h1>
                        <h1 className='w-full h-auto text-sm px-3 textdarktext'>{rply.Comment}</h1>
                      </div>
                  ))}
                  </div>
                )})}
              </div>
            )
          })}
      </div>
      </div>
      <LeftBar/>
    </div>
    </>
  )
}

export default Home