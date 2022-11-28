import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const [answer, setAnswer, setuser] = useState()
  const navigate = useNavigate()

  function onsubmit(e) {
    e.preventDefault()
    if(answer === true) {
      window.location.replace(window.location.origin)
    } else if (answer === false) {
      navigate("/")
    }
  }

  return (
    <>
      <div className="w-full h-full z-20 bg-darkbg absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 ml-auto mr-auto mt-auto mb-auto">
        <form onSubmit={(e) => onsubmit(e)} className='w-[750px] flex flex-col items-center justify-center h-[600px] bg-darkprimary rounded-xl'>
          <h1 className='text-white font-semibold text-2xl'>Are you sure?</h1>
          <div className="flex gap-2 justify-center py-5 w-full h-auto">
            <button type='submit' onClick={() => setAnswer(true)} className='px-7 py-2 text-white rounded-xl text-md transition-all duration-300 hover:scale-95 hover:animate-pulse font-medium bg-blue'>Yes</button>
            <button type='submit' onClick={() => setAnswer(false)} className='px-7 py-2 text-white rounded-xl text-md transition-all duration-300 hover:scale-95 hover:animate-pulse font-medium bg-[#ff6961]'>No</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Logout