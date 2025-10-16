import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMap } from 'react-icons/hi'

export default function Home(){
  return (
    <div className="space-y-4">
      <div className="app-screen">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <div className="text-[var(--primary)] font-bold">J</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Bem-vinda,</div>
              <div className="font-semibold text-[var(--primary)]">José da Silva Correia</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="card p-6 flex flex-col items-center">
            <div className="w-40 h-40 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
              <HiOutlineMap size={48} className="text-[var(--primary)]"/>
            </div>
            <h3 className="font-semibold text-slate-800">Abra um Ticket</h3>
            <p className="text-xs text-slate-500 text-center">Relate um problema na rodoviária</p>
            <div className="mt-4 flex gap-3">
              <Link to="/reports/create" className="btn-primary">Criar</Link>
              <Link to="/reports" className="btn-accent">Seus Tickets</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
