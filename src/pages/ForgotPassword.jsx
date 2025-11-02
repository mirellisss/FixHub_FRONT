import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormCard from '../components/FormCard'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você chamaria a API para enviar o link de recuperação
    alert(`Enviado link de recuperação para: ${email}`)
  }

  return (
    <div className="py-6">
      <FormCard title="Recuperar Senha">
        <div className="text-center">
          <img src="logo_fixhub.png" className="mx-auto w-24" alt="logo"/>
        </div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">E-mail</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">Enviar Link de Recuperação</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-[var(--primary)]">Voltar ao login</Link>
        </div>
      </FormCard>
    </div>
  )
}
