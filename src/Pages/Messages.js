import { ref, set } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { database } from '../Firebase-Seed';
import { UserContext } from '../Router';
import sendSvg from "./send.svg"

function Messages() {
  const {data, user, getData} = useContext(UserContext)
  const [message, setMessage] = useState("")

  useEffect(() => {
    getData()
  }, [])

  function sendMessage(e) {
    e.preventDefault()
    if(message !== "") {
      set(ref(database, `/Chat`), data?.Chat ? [...data?.Chat, {
        uid: user?.uid,
        id: user?.id,
        Message: message
      }]:[{
        uid: user?.uid,
        id: user?.id,
        Message: message
      }])
    } 
    getData()
    setMessage("")
  }

  return (
    <div className='w-full h-auto min-h-screen flex-col flex items-center px-7 gap-2 rounded-xl text-[#fff] bg-darkprimary py-7'>
      <div className="w-full h-[calc(100%-105px)] overflow-y-auto flex flex-col">
        {data?.Chat?.map((message) => {
          return (
            <div key={message?.Message} className={`w-full h-auto text-white flex items-end gap-2 py-2  ${message?.uid === user?.uid ? "justify-end":"justify-start"}`}>
              {message?.uid !== user?.uid && <img src={data?.users[message?.id].ProfilePhoto} className="w-10 h-10 rounded-full"/>}
              <h1 className={`p-2 px-4 rounded-2xl ${message?.uid === user?.uid ? "bg-blue rounded-br-md":"bg-darkbg rounded-bl-md"}`}>{message?.Message}</h1>
              {message?.uid === user?.uid && <img src={data?.users[message?.id].ProfilePhoto} className="w-10 h-10 rounded-full"/>}
            </div>
          )
        })}
      </div>
      <form onSubmit={(e) => sendMessage(e)} className="h-auto w-full flex gap-3">
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" required className='w-full py-3 mr-auto rounded-xl border border-darktext bg-transparent text-sm px-10 outline-none text-white' placeholder='Send Message'/>
        <button type='submit' className='w-[45px] h-[45px]'><img src={sendSvg} className="rounded-xl p-2 cursor-pointer hover:opacity-70 bg-blue"/></button>
      </form>
    </div>
  )
}

export default Messages