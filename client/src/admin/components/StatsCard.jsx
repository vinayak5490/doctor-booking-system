import React from 'react'

export default function StatsCard({title, count, icon, colorClass}) {
  return (
    <div className='bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between'>
        <div className='space-y-1'>
            <span className='text-xs font-bold text-slate-400 uppercase tracking-wider block'>{title}</span>
            <span className='text-3xl font-black text-slate-900 block'>{count}</span>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${colorClass}`}>{icon}</div>
    </div>
  )
}
