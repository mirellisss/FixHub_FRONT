import React from 'react'
import FormCard from '../components/FormCard'

export default function Register(){
  return (
    <div className="py-6">
      <FormCard title="Tela Cadastro">
        <div className="text-center">
          <img src="/logo_fixhub.png" className="mx-auto w-24" alt="logo"/>
        </div>
        <div className="space-y-2">
          <div>
            <label className="label">Nome completo</label>
            <input className="input" placeholder="Nome completo" />
          </div>
          <div>
            <label className="label">Data nascimento</label>
            <input className="input" placeholder="DD/MM/AAAA" />
          </div>
          <div>
            <label className="label">E-mail</label>
            <input className="input" placeholder="seu@email.com" />
          </div>
          <div>
            <label className="label">Telefone</label>
            <input className="input" placeholder="(99) 99999-9999" />
          </div>
          <div>
            <label className="label">Senha</label>
            <input className="input" placeholder="Senha" type="password" />
          </div>
          <div>
            <label className="label">Confirmar senha</label>
            <input className="input" placeholder="Confirmar senha" type="password" />
          </div>
          <div className="flex justify-between items-center mt-2">
            <a className="text-sm text-slate-600">Voltar</a>
            <button className="btn-primary">Cadastrar</button>
          </div>
        </div>
      </FormCard>
    </div>
  )
}
