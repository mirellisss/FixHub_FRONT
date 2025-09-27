import React, { useState } from 'react'
import FormCard from '../components/FormCard'

export default function AccountInfo({ name = '', email = '', birthDate = '', phone = '', avatar = '/logo192.png', onSave, onCancel }) {
  const [form, setForm] = useState({
    name,
    email,
    birthDate,
    phone,
    avatar,
  })
  const [preview, setPreview] = useState(avatar)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setForm((prev) => ({ ...prev, avatar: file }))
    }
  }

  const handleSave = () => {
    if (onSave) onSave(form)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    setForm({ name, email, birthDate, phone, avatar })
    setPreview(avatar)
  }

  return (
    <div className="py-6">
      <FormCard title="Informações da Conta">
        <div className="flex gap-4 items-center mb-4">
          <label>
            <img src={preview} className="w-20 h-20 rounded-full object-cover" alt="Avatar do usuário"/>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="text-xs text-center text-blue-600 cursor-pointer">Alterar foto</div>
          </label>
          <div>
            <div className="font-semibold">{form.name}</div>
            <div className="text-xs text-slate-500">{form.email}</div>
          </div>
        </div>
        {/* ...restante do formulário... */}
        <label className="block mb-2">
          <span className="text-sm">Nome</span>
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            autoComplete="name"
          />
        </label>
        <label className="block mb-2">
          <span className="text-sm">E-mail</span>
          <input
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-mail"
            type="email"
            autoComplete="email"
          />
        </label>
        <label className="block mb-2">
          <span className="text-sm">Data de nascimento</span>
          <input
            className="input"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            placeholder="Data de nascimento"
            type="date"
            autoComplete="bday"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Telefone</span>
          <input
            className="input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefone"
            type="tel"
            autoComplete="tel"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button className="btn-accent" type="button" onClick={handleSave}>Salvar</button>
          <button className="btn-primary" type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </FormCard>
    </div>
  )
}