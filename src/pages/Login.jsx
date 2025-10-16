import React from 'react'
import { Link } from 'react-router-dom'
import FormCard from '../components/FormCard'

export default function Login(){
  return (
    <div className="py-6">
      <FormCard title="Tela Login">
        <div className="text-center">
          <img src="logo_fixhub.png" className="mx-auto w-24" alt="logo"/>
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
        </div>
      </FormCard>
    </div>
  )
}
