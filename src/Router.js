import React, { createContext, useEffect, useState } from 'react'
import { child, get, ref } from 'firebase/database';
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Notifications from "./Pages/Notifications"
import Logout from "./Pages/Logout"
import Messages from "./Pages/Messages"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Community from "./Pages/Community"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LeftBar from './Components/LeftBar'
import Navbar from './Components/Navbar'
import { database } from './Firebase-Seed';

export const UserContext = createContext()

function Router() {
  const [uid, setuid] = useState("")
  const [user, setuser] = useState()
  const [data, setData] = useState(null)

  function getData() {
    const dbRef = ref(database);
      get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          setData(data)
        } else {
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <UserContext.Provider value={{user, setuser, uid, setuid, getData, data}}>
    <div className='h-full min-h-screen flex relative flex-col items-center bg-darkbg overflow-hidden'>
    <BrowserRouter>
    <Navbar/>
    <div className='h-full w-full flex'>
      <LeftBar/>
            {user ? (
        <Routes>
              <Route index path="/" element={<Home/>}/>
              <Route path="/Community" element={<Community/>}/>
              <Route path="/Logout" element={<Logout/>}/>
              <Route path="/Messages" element={<Messages/>}/>
              <Route path="/Notifications" element={<Notifications/>}/>
              <Route path="/Profile" element={<Profile/>}/>
        </Routes>
            ):(
        <Routes>
              <Route index path='/*' element={<Login/>}/>
              <Route path='/Register' element={<Register/>}/>
        </Routes>
            )}
    </div>
    </BrowserRouter>
    </div>
    </UserContext.Provider>
  )
}

export default Router