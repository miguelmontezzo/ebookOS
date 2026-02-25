import React from 'react';

export function PageLayout({ title, objective, children }: { title: string, objective: string, children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 animate-in fade-in duration-500">
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight mb-3 uppercase">{title}</h1>
        <p className="text-lg text-emerald-600 font-medium flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold tracking-wide">OBJETIVO</span>
          {objective}
        </p>
      </div>
      <div className="space-y-8 text-zinc-800 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
