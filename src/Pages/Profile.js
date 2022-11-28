import { ref, set } from 'firebase/database'
import React, { useContext, useState } from 'react'
import { database } from '../Firebase-Seed'
import { UserContext } from '../Router'
import CircularProgress from '@mui/material/CircularProgress';
import RightBar from '../Components/RightBar'

function Profile() {
  const { data, user, getData } = useContext(UserContext)
  const [post, setPost] = useState({Title: "", Photo:""})
  const [loading, setLoading] = useState(false)

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

  return (
    <>
    <div className='w-screen flex items-center text-[#fff] overflow-y-auto'>
      <div className="h-full flex flex-col gap-5 w-full rounded-t-xl items-center overflow-hidden">
        <div className="h-auto w-full flex flex-col relative">
          <img src="https://www.freewebheaders.com/wp-content/gallery/mountains-snow/snow-mountains-header-7052.jpg" className='w-full rounded-t-xl rounded-b-sm'/>
          <img src={data?.users[user?.id]?.ProfilePhoto} className="absolute w-32 h-32 rounded-full border-4 border-darktext top-[300px] left-3"/>
        </div>
        <h1 className='w-full px-4 h-auto pt-10 font-semibold text-lg'>{data?.users[user?.id]?.Username}</h1>
        <h1 className='w-full px-4 h-auto text-white/50 pb-5 text-sm'>{data?.users[user?.id]?.Bio}</h1>
        <div className="w-full h-auto bg-darkprimary flex flex-col items-center rounded-xl py-7 px-7">
        <form onSubmit={(e) => createPost(e)} className="w-[600px] h-auto py-5 px-3 bg-darkbg rounded-xl gap-3 flex flex-col">
          <label className='flex items-center justify-center'>
            <img src={user.ProfilePhoto} className="w-10 h-10 rounded-full mr-auto"/>
            <input value={post?.Title}  type="text" required onChange={(e) => setPost(item => ({...item, Title:e.target.value}))} className='py-3 px-3 w-[90%] rounded-xl outline-none text-white bg-darkprimary text-sm' placeholder='What&#39;s Happening?'/>
          </label>
          <input value={post?.Photo} type="text" onChange={(e) => setPost(item => ({...item, Photo:e.target.value}))} className='py-3 px-3 w-full rounded-xl outline-none text-white bg-darkprimary text-sm' placeholder='Image Url'/>
          <button type="submit" className="w-full py-3 text-[14px] rounded-lg text-white bg-blue cursor-pointer outline-none flex items-center justify-center hover:opacity-80">{!loading ? "Post":<CircularProgress size={21}/>}</button>
        </form>
        {data?.users[user?.id]?.posts?.map((post, i) => {
        return (
          <div key={`${user?.uid}${post.id}${i}`} className='w-[600px] h-auto pt-5 py-3 px-3 bg-darkbg rounded-xl flex flex-col my-5'>
          <div className="h-auto w-full flex gap-3 items-center">
            <img src={data?.users[user?.id]?.ProfilePhoto} className="w-10 h-10 rounded-full" />
            <h1 className='text-white/60'>{data?.users[user?.id]?.Username}</h1>
          </div>
          <h1 className='w-full h-auto py-3 text-sm font-semibold text-white'>{post.Title}</h1>
          {post.Photo && <img src={post.Photo} className="w-full rounded-xl"/>}
          {post?.replies?.map((rply) => (
              <div key={rply.Comment} className='w-full h-auto flex gap-3 py-2 px-3 bg-darkprimary mt-2 rounded-xl flex-wrap items-center'>
                <img src={rply.ProfilePhoto} className="w-10 h-10 rounded-full"/>
                <h1 className='text-sm w-[90%] text-white/60'>{rply.Username}</h1>
                <h1 className='w-full h-auto text-sm px-3 textdarktext'>{rply.Comment}</h1>
              </div>
          ))}
          </div>
            )
          })}
        </div>
      </div>
      <RightBar/>
    </div>
    </>
  )
}

export default Profile