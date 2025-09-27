import React from 'react'
import { useParams } from 'react-router-dom'
export default function ReportDetail(){
  const { id } = useParams()
  return (
    <div className="card">
      <h3 className="text-xl font-bold">Report Spec #{id}</h3>
      <div className="mt-3">
        <div className="text-sm text-slate-600">Informações</div>
        <div className="mt-2 p-3 border rounded-lg bg-slate-50">Uma das lâmpadas não está funcionando e outra está piscando.</div>
        <div className="mt-3 text-sm text-slate-500">Status</div>
        <div className="mt-2 space-y-2">
          <div className="p-2 border rounded-md">Novo • 22/11/24</div>
          <div className="p-2 border rounded-md">Andamento • 23/11/24</div>
        </div>
      </div>
    </div>
  )
}
