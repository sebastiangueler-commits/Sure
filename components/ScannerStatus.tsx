
import React from 'react';

const ScannerStatus: React.FC = () => {
  const nodes = [
    { name: 'Node-Alpha (Scraper)', loc: 'Curaçao', load: 45, status: 'online' },
    { name: 'Node-Beta (Scraper)', loc: 'Gibraltar', load: 72, status: 'online' },
    { name: 'Node-Gamma (Parser)', loc: 'Singapore', load: 12, status: 'standby' },
    { name: 'AI-Audit-Core', loc: 'Google Cloud', load: 98, status: 'processing' }
  ];

  return (
    <div className="glass p-6 rounded-[2rem] border border-white/5 bg-slate-900/40 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">DeepScan Network Status</h2>
          <p className="text-[9px] text-slate-500 font-mono mt-1">Uptime: 99.98% | Active Threads: 1,024</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[9px] text-slate-500 font-black uppercase">Data Rate</p>
            <p className="text-xs font-mono text-emerald-400">4.2 MB/s</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node) => (
          <div key={node.name} className="bg-black/40 p-3 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] font-black text-slate-300">{node.name}</p>
                <p className="text-[8px] text-slate-500 font-mono">{node.loc}</p>
              </div>
              <span className={`text-[7px] px-1.5 py-0.5 rounded uppercase font-black ${
                node.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 
                node.status === 'processing' ? 'bg-indigo-500/10 text-indigo-400 animate-pulse' : 'bg-slate-800 text-slate-500'
              }`}>
                {node.status}
              </span>
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-1 mt-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${node.status === 'processing' ? 'bg-indigo-500' : 'bg-slate-600'}`}
                style={{ width: `${node.load}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScannerStatus;
