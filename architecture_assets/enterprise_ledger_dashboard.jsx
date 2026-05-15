```react
import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Package, 
  ExternalLink, 
  Database, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Bitcoin,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  Zap
} from 'lucide-react';

// Block definitions based on MSI v8.2 and v10 snapshots
const MSI_BLOCKS = [
  { id: 1, name: "Asset Identity", range: "1-15", color: "bg-blue-100 text-blue-800" },
  { id: 2, name: "Acquisition", range: "16-30", color: "bg-green-100 text-green-800" },
  { id: 3, name: "Condition & Grading", range: "31-45", color: "bg-yellow-100 text-yellow-800" },
  { id: 4, name: "Technical Specifications", range: "46-70", color: "bg-purple-100 text-purple-800" },
  { id: 5, name: "BCI & Neural Metrics", range: "71-85", color: "bg-pink-100 text-pink-800" },
  { id: 6, name: "Market & Liquidation", range: "86-105", color: "bg-orange-100 text-orange-800" },
  { id: 7, name: "Sales Architecture", range: "106-116", color: "bg-indigo-100 text-indigo-800" },
];

const App = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'matrix'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Mock data for the 483 asset "Golden Set"
  const assets = useMemo(() => [
    {
      uid: "ss_graco_em5_001",
      mfr: "Graco",
      mpn: "EM5",
      cond: "NIB",
      flux: "10.00",
      status: "Hardened",
      inscribed: false,
      square: "Synced",
      blockCompletion: { 1: 1.0, 2: 0.9, 3: 1.0, 4: 0.8, 5: 0.5, 6: 0.4, 7: 0.2 }
    },
    {
      uid: "ss_100t_press_001",
      mfr: "Unknown",
      mpn: "100-TON-HYD",
      cond: "REM",
      flux: "10.00",
      status: "Triage",
      inscribed: false,
      square: "Pending",
      blockCompletion: { 1: 0.8, 2: 0.3, 3: 0.5, 4: 0.4, 5: 0.2, 6: 0.1, 7: 0.0 }
    },
    {
      uid: "ss_eaton_xt01_002",
      mfr: "Eaton",
      mpn: "XT01-BRK",
      cond: "FS",
      flux: "10.00",
      status: "Hardened",
      inscribed: true,
      square: "Synced",
      blockCompletion: { 1: 1.0, 2: 1.0, 3: 1.0, 4: 0.9, 5: 0.7, 6: 0.9, 7: 0.9 }
    }
  ], []);

  const filteredAssets = assets.filter(a => 
    a.uid.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.mpn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="text-blue-600" />
            Sol Savage Heuristic Ledger
          </h1>
          <p className="text-slate-500 text-sm">Resonance: 10.00 Hz | S25 Ultra Edge Node</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'table' ? 'matrix' : 'table')}
            className="p-2 border rounded-lg hover:bg-white transition-colors"
            title="Toggle View"
          >
            {viewMode === 'table' ? <LayoutGrid className="w-5 h-5" /> : <ListIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Package /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Assets</p>
              <p className="text-xl font-bold">483</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600"><CheckCircle2 /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Hardened</p>
              <p className="text-xl font-bold">483</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg text-orange-600"><Bitcoin /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Inscribed (JIT)</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><ExternalLink /></div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Square Status</p>
              <p className="text-xl font-bold">342/483</p>
            </div>
          </div>
        </div>

        {/* Matrix View Header / Block Guide */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {MSI_BLOCKS.map(block => (
              <div key={block.id} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${block.color}`}>
                Block {block.id}: {block.name} ({block.range})
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-bottom">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset UID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">MFR / MPN</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Provenance</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Commercial</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAssets.map(asset => (
                    <tr key={asset.uid} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedAsset(asset)}>
                      <td className="px-6 py-4 font-mono text-xs">{asset.uid}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm">{asset.mfr}</div>
                        <div className="text-xs text-slate-400">{asset.mpn}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{asset.cond}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {asset.status === 'Hardened' ? 
                          <span className="text-green-600 flex items-center gap-1"><Shield className="w-3 h-3"/> Hardened</span> : 
                          <span className="text-yellow-600 flex items-center gap-1"><Clock className="w-3 h-3"/> {asset.status}</span>
                        }
                      </td>
                      <td className="px-6 py-4">
                        {asset.inscribed ? 
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold flex items-center gap-1 w-fit">
                            <Bitcoin className="w-3 h-3"/> INSCRIBED
                          </span> : 
                          <span className="text-xs text-slate-400 font-medium italic">Pending JIT</span>
                        }
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold ${asset.square === 'Synced' ? 'text-blue-600' : 'text-slate-400'}`}>
                          Square: {asset.square}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map(asset => (
                <div key={asset.uid} className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedAsset(asset)}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800">{asset.mfr} {asset.mpn}</h3>
                      <p className="text-xs font-mono text-slate-400">{asset.uid}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                       <span className="text-[10px] font-bold bg-slate-800 text-white px-1.5 py-0.5 rounded leading-none">10.00Hz</span>
                       <span className="text-[10px] font-bold bg-blue-500 text-white px-1.5 py-0.5 rounded leading-none">{asset.cond}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">116-Column Matrix Completion</p>
                    <div className="flex h-4 gap-0.5">
                      {Object.entries(asset.blockCompletion).map(([blockId, completion]) => (
                        <div 
                          key={blockId} 
                          className={`flex-1 h-full rounded-sm transition-all border border-black/5 overflow-hidden`}
                          style={{ backgroundColor: `rgba(37, 99, 235, ${completion})` }}
                          title={`Block ${blockId}: ${Math.round(completion * 100)}%`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Identity (B1)</span>
                      <span>Market (B6)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Detail Overlay / Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-start sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-bold">{selectedAsset.mfr} {selectedAsset.mpn}</h2>
                <p className="text-xs font-mono text-slate-500">{selectedAsset.uid}</p>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                Close
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resonance</p>
                   <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                     {selectedAsset.flux} Hz Locked
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bitcoin Anchor</p>
                   <p className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <Bitcoin className="w-4 h-4 text-orange-500" />
                     {selectedAsset.inscribed ? 'Inscribed (UTXO Valid)' : 'Pending JIT'}
                   </p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">MSI Matrix Breakdown (116 Columns)</h3>
              <div className="space-y-4">
                {MSI_BLOCKS.map(block => (
                  <div key={block.id} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700">{block.name} (Columns {block.range})</span>
                      <span className="font-bold text-blue-600">{Math.round(selectedAsset.blockCompletion[block.id] * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-700" 
                        style={{ width: `${selectedAsset.blockCompletion[block.id] * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t flex gap-3">
                 <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200">
                    SQUARE UPLOAD
                 </button>
                 <button className="flex-1 border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 active:scale-95 transition-all">
                    JIT INSCRIBE
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

```
