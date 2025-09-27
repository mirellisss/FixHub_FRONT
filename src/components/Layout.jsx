import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SlideMenu from './SlideMenu'
import Footer from './Footer'

export default function Layout(){
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenu={() => setOpen(true)} />
      <SlideMenu open={open} onClose={() => setOpen(false)} />
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}
