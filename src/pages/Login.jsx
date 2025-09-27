import React from 'react'
import { Link } from 'react-router-dom'
import FormCard from '../components/FormCard'
import { FaGoogle, FaFacebook } from 'react-icons/fa'

export default function Login(){
  return (
    <div className="py-6">
      <FormCard title="Tela Login">
        <div className="text-center">
          <img src="/logo192.png" className="mx-auto w-24" alt="logo"/>
        </div>
        <div className="space-y-2">
          <div>
            <label className="label">E-mail</label>
            <input className="input" placeholder="E-mail" />
          </div>
          <div>
            <label className="label">Senha</label>
            <input className="input" placeholder="Senha" type="password" />
            <div className="text-right mt-1"><Link to="/success" className="text-sm text-[var(--primary)]">Esqueci minha senha</Link></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <Link to="/register" className="text-sm text-slate-600">Cadastrar-se</Link>
            <Link to="/success" className="btn-primary">Login</Link>
          </div>
          <div className="text-center text-xs text-slate-500">ou entre com</div>
          <div className="flex gap-2 justify-center">
            <button className="btn-accent px-3 py-2 rounded-full"><FaGoogle/></button>
            <button className="btn-accent px-3 py-2 rounded-full"><FaFacebook/></button>
          </div>
        </div>
      </FormCard>
    </div>
  )
}
