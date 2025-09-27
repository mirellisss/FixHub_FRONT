import React from 'react'
import { Link } from 'react-router-dom'
export default function ReportList(){
  const data = [
    {id:101, title:'Sanitário Masculino', status:'novo'},
    {id:102, title:'Estacionamento', status:'concluido'}
  ]
  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold">Seus Tickets</h3>
        <div className="mt-3 space-y-2">
          {data.map(d => (
            <Link key={d.id} to={`/reports/${d.id}`} className="block p-3 border rounded-lg hover:bg-slate-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{d.title}</div>
                  <div className="text-xs text-slate-500">uma descrição curta do problema</div>
                </div>
                <div className="text-sm text-slate-500">{d.status}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/reports/create" className="btn-primary">Criar</Link>
        </div>
      </div>
    </div>
  )
}
