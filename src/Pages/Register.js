import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth, database} from "../Firebase-Seed"
import { UserContext } from "../Router"

function Register() {
  const navigate = useNavigate()
  const {data, getData} = useContext(UserContext)
  const [user, setuser] = useState({})
  const [password, setpassword] = useState("")
  const [loading, setLoading] = useState(false)

  const createUser = async e => {
    e.preventDefault()
    setLoading(true)
    createUserWithEmailAndPassword(auth, user.Email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid
      set(ref(database, '/users'), [...data?.users, {...user, uid: uid, id: data?.users?.length ? data?.users?.length: 0, Notifications:[{Category: "Hi", Text: "Welcome to my website", UserId: 0}]}])
      getData()
      setTimeout(() => {
        setLoading(false)
        setTimeout(() => {
          navigate("/")
        }, 100);
      }, 250);
    })
    .catch((error) => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getData()
  })

  return (
    <div className="h-full w-full absolute top-0 left-0 right-0 bottom-0 m-auto flex flex-col gap-3 items-center justify-center">
      <h1 className="font-bold text-2xl text-white/90">Getting Started</h1>
      <p className="text-white/80 text-sm font-medium">Create an account to continune and connect with the people.</p>
      <form autoComplete="off" onSubmit={(e) => createUser(e)} className="w-[500px] h-[500px] rounded-3xl flex flex-col items-center justify-center gap-4 bg-darkprimary">
        <input disabled={loading} autoComplete="off" required onChange={(e) => setuser(obj => ({...obj, Email:e.target.value}))} className="py-4 text-white/80 outline-none rounded-lg disabled:opacity-25 bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="email" placeholder="Your Email"/>
        <input disabled={loading} autoComplete="off" required onChange={(e) => setuser(obj => ({...obj, Username:e.target.value}))} className="py-4 text-white/80 outline-none rounded-lg disabled:opacity-25 bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="text" placeholder="Username"/>
        <input disabled={loading} autoComplete="off" required onChange={(e) => setuser(obj => ({...obj, ProfilePhoto:e.target.value}))} className="py-4 text-white/80 outline-none rounded-lg disabled:opacity-25 bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="text" placeholder="Profile Photo Url"/>
        <input disabled={loading} autoComplete="off" required onChange={(e) => setuser(obj => ({...obj, Bio:e.target.value}))} className="py-4 text-white/80 outline-none rounded-lg disabled:opacity-25 bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="text" placeholder="Biography"/>
        <input disabled={loading} minLength={8} autoComplete="off" required onChange={(e) => setpassword(e.target.value)} className="py-4 text-white/80 outline-none rounded-lg disabled:opacity-25 bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="Password" placeholder="Create Password"/>
        <button type="submit" className="w-[85%] py-4 text-[14px] rounded-lg outline-none text-white bg-blue cursor-pointer flex items-center justify-center hover:opacity-80">{!loading ? "Register":<CircularProgress size={21}/>}</button>
        <h1 className='flex gap-3 py-2 text-sm text-white/60 font-medium'>Already have an account? <span onClick={() => navigate("/")} className='cursor-pointer hover:opacity-80 text-sm text-[#377dff]'>Sign In</span></h1>
      </form>
    </div>
  )
}

export default Register