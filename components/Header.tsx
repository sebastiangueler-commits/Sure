
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-slate-800 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              SureScan <span className="text-indigo-500">Pro</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">Arbitrage Intel Suite</p>
          </div>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <a href="#" className="text-sm font-medium text-white hover:text-indigo-400 transition">Dashboard</a>
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition">Histórico</a>
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition">Configuración</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right">
            <p className="text-xs text-slate-500">Balance Simulado</p>
            <p className="text-sm font-bold text-green-400">$12,450.00</p>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-slate-700">
            Perfil
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
