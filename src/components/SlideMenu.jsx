import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SlideMenu({open, onClose}){
  return (
    <div aria-hidden={!open}>
      {open && <div className='fixed inset-0 z-40' onClick={onClose}/>}
      <motion.aside initial={{x:300}} animate={{x: open?0:300}} transition={{type:'spring'}} className='fixed right-0 top-0 z-50 h-full slide-menu bg-white shadow-lg p-6'>
        <button onClick={onClose} className='text-slate-500 mb-4'>Fechar</button>
        <nav className='flex flex-col gap-3 text-slate-700'>
          <Link to="/reports" onClick={onClose} className="slide-item">Seus Tickets</Link>
          <Link to="/settings" onClick={onClose} className="slide-item">Configurações</Link>
          <Link to="/settings/account" onClick={onClose} className="slide-item">Minha Conta</Link>
          <Link to="/settings/security" onClick={onClose} className="slide-item">Segurança</Link>
          <Link to="/login" onClick={onClose} className='text-red-600 mt-4 slide-item'>Sair</Link>
        </nav>
      </motion.aside>
    </div>
  )
}
