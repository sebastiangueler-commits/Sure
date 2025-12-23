
import React, { useState, useEffect } from 'react';
import { SurebetOpportunity, CalculationResult } from '../types';

interface CalculatorProps {
  opportunity: SurebetOpportunity;
}

const Calculator: React.FC<CalculatorProps> = ({ opportunity }) => {
  const [totalStake, setTotalStake] = useState<number>(500);
  const [useRounding, setUseRounding] = useState<boolean>(true);
  const [results, setResults] = useState<CalculationResult | null>(null);

  useEffect(() => {
    calculateStakes();
  }, [totalStake, opportunity, useRounding]);

  const calculateStakes = () => {
    const invProb = opportunity.outcomes.reduce((acc, outcome) => acc + (1 / outcome.bestOdds.value), 0);
    
    let bets = opportunity.outcomes.map(outcome => {
      let stake = (totalStake / (outcome.bestOdds.value * invProb));
      
      // El redondeo inteligente evita que los bookies detecten software de arbitraje
      if (useRounding) {
        if (stake > 100) stake = Math.round(stake / 5) * 5;
        else stake = Math.round(stake);
      } else {
        stake = Math.round(stake * 100) / 100;
      }

      const profit = (stake * outcome.bestOdds.value) - totalStake;
      
      return {
        label: outcome.label,
        stake,
        odds: outcome.bestOdds.value,
        bookie: outcome.bestOdds.bookie,
        profit: Math.round(profit * 100) / 100
      };
    });

    const totalProfit = bets.reduce((acc, b) => acc + b.profit, 0) / bets.length;
    const roi = (totalProfit / totalStake) * 100;

    setResults({
      totalInvestment: totalStake,
      bets,
      totalProfit,
      roi
    });
  };

  return (
    <div className="p-8 bg-slate-900/80 rounded-[2.5rem] border border-white/5 shadow-2xl">
      <h3 className="text-xs font-black mb-8 flex items-center gap-3 text-emerald-400 uppercase tracking-[0.3em]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2h6v4H7V4zm6 6H7v2h6v-2zm-6 4h6v2H7v-2z" clipRule="evenodd" />
        </svg>
        Arbitrage Engine v3
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-[9px] text-slate-500 uppercase font-black mb-2 tracking-widest">Inversión ($)</label>
          <input 
            type="number" 
            value={totalStake} 
            onChange={(e) => setTotalStake(Number(e.target.value))}
            className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-white font-black text-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer group mt-4">
            <input 
              type="checkbox" 
              checked={useRounding} 
              onChange={() => setUseRounding(!useRounding)}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${useRounding ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'border-slate-700 bg-slate-800'}`}>
              {useRounding && <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
            </div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-hover:text-emerald-400">Smart Rounding</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {results?.bets.map((bet, idx) => (
          <div key={idx} className="flex justify-between items-center p-5 bg-black/40 rounded-2xl border border-white/5 group hover:border-emerald-500/20 transition-all">
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{bet.label}</p>
              <p className="text-[10px] font-bold text-emerald-500">{bet.bookie.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-white">${bet.stake}</p>
              <p className="text-[9px] text-slate-600 font-mono tracking-tighter">ODDS: {bet.odds.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Retorno Neto</span>
          <span className="text-2xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">${results?.totalProfit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Efficiency (ROI)</span>
          <span className="text-xl font-black text-white">{results?.roi.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
