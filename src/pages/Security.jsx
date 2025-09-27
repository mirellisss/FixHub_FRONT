import React from 'react'
import FormCard from '../components/FormCard'
export default function Security(){
  return (
    <div className="py-6">
      <FormCard title="Segurança">
        <input className="input" placeholder="Senha atual" type="password" />
        <input className="input" placeholder="Nova senha" type="password" />
        <input className="input" placeholder="Confirmar senha" type="password" />
        <div className="flex justify-end mt-4">
          <button className="btn-primary">Concluir</button>
        </div>
      </FormCard>
    </div>
  )
}
