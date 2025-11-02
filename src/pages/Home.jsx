import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 py-6">
      <div className="w-full max-w-md flex flex-col items-center space-y-5">

        {/* Card de boas-vindas */}
        <div className="bg-white shadow-sm rounded-2xl p-5 flex items-center gap-4 border border-slate-100 w-full">
          <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <span className="text-[var(--primary)] font-bold text-lg">J</span>
          </div>
          <div>
            <p className="text-sm text-slate-500">Bem-vindo(a),</p>
            <p className="font-semibold text-[var(--primary)] text-base">
              José da Silva Correia
            </p>
          </div>
        </div>

        {/* Card - Abrir Ticket */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-slate-100 w-full">
          <h2 className="font-semibold text-lg text-slate-800 mb-1">
            Abra um Ticket
          </h2>
          <p className="text-xs text-slate-500 mb-5">
            Relate um problema na rodoviária
          </p>

          <div className="flex justify-center gap-3">
            <Link
              to="/reports/create"
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-5 py-2 rounded-full text-sm font-medium transition-all"
            >
              Criar
            </Link>

            <Link
              to="/reports"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 px-5 py-2 rounded-full text-sm font-medium transition-all"
            >
              Seus Tickets
            </Link>
          </div>
        </div>

        {/* Card - Guia da Rodoviária */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center border border-slate-100 w-full">
          <h2 className="text-lg font-semibold flex items-center justify-center gap-2 mb-2 text-slate-800">
            <MapPin className="w-5 h-5 text-[var(--primary)]" />
            Guia da Rodoviária
          </h2>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Encontre informações sobre setores, plataformas e serviços da rodoviária.
          </p>


            <Link
              to="/terminal-map"
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-sm transition-all"
            >
              Acessar Guia
            </Link>

        </div>

      </div>
    </div>
  )
}
