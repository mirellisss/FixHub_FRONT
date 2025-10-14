 import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ReportList() {
  // 👉 Lista vazia no início
  const [tickets, setTickets] = useState([])

  return (
    <div className="space-y-4">
      <div className="card p-4 shadow-sm border rounded-lg bg-white">
        <h3 className="text-lg font-bold">Seus Tickets</h3>

        <div className="mt-3 space-y-2">
          {tickets.length === 0 ? (
            <div className="text-sm text-slate-500 italic text-center py-4">
              Nenhum ticket criado ainda.
            </div>
          ) : (
            tickets.map((t) => (
              <Link
                key={t.id}
                to={`/reports/${t.id}`}
                className="block p-3 border rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-xs text-slate-500">
                      {t.description || 'Sem descrição'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {t.status === 'concluido' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span
                      className={
                        t.status === 'concluido'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }
                    >
                      {t.status || 'pendente'}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-4">
          <Link
            to="/reports/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Criar Ticket
          </Link>
        </div>
      </div>
    </div>
  )
}
