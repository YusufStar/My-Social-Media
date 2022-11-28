import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth, database} from "../Firebase-Seed"
import { child, get, ref } from 'firebase/database'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from "../Router"
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {setuser, setuid} = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const loginFunc = async e => {
    e.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid  
      const dbRef = ref(database);
      setuid(uid)
        get(child(dbRef, `/users`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const newdata = data.filter((user) => {
              return user.uid === uid
            })
            setuid(uid)
            setTimeout(() => {
              setuser(newdata[0])
            }, 250);
          } else {
          }
        }).catch((error) => {
          setLoading(false)
        });
  })
  }

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 m-auto w-full flex flex-col gap-3 items-center justify-center">
      <p className="text-white/80 text-2xl mb-3 font-medium">Login Created User</p>
      <form onSubmit={(e) => loginFunc(e)} className="w-[500px] h-[300px] rounded-3xl flex flex-col items-center justify-center gap-4 bg-darkprimary">
        <input disabled={loading} required onChange={(e) => setemail(e.target.value)} className="py-4 text-white/80 outline-none rounded-lg bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="email" placeholder="Your Email"/>
        <input disabled={loading} required onChange={(e) => setpassword(e.target.value)} className="py-4 text-white/80 outline-none rounded-lg bg-transparent text-sm border-[1px] border-darktext font-medium px-10 w-[85%]" type="password" placeholder="Your Password"/>
        <button type="submit" className="w-[85%] py-4 text-[14px] outline-none rounded-lg text-white bg-blue flex items-center justify-center cursor-pointer hover:opacity-80">{!loading ? "Sign In":<CircularProgress size={21}/>}</button>
        <h1 className='flex gap-3 py-2 text-sm text-white/60 font-medium'>I don't have an account<span onClick={() => navigate("/Register")} className='cursor-pointer hover:opacity-80 text-sm text-[#377dff]'>Register</span></h1>
      </form>
    </div>
  )
}

export default Login