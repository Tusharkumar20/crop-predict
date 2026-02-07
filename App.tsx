
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import MLLab from './components/MLLab';
import { AppSection } from './types';
import { MOCK_DATASET } from './constants';
import { Table, Search, Download, AlertCircle, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_DATASET.filter(d => 
    d.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 15);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return <Dashboard />;
      case AppSection.DATASET:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Dataset Explorer</h2>
                <p className="text-slate-500">Curated agricultural data repository (1,000+ entries)</p>
              </div>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search crops or states..." 
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                  <Download size={18} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Crop</th>
                      <th className="px-6 py-4">Season</th>
                      <th className="px-6 py-4">State</th>
                      <th className="px-6 py-4">Rain (mm)</th>
                      <th className="px-6 py-4">Temp (°C)</th>
                      <th className="px-6 py-4">pH</th>
                      <th className="px-6 py-4">Yield (T/Ha)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-700">{row.cropType}</td>
                        <td className="px-6 py-4 text-slate-600">{row.season}</td>
                        <td className="px-6 py-4 text-slate-600">{row.state}</td>
                        <td className="px-6 py-4 text-slate-600 font-mono">{row.rainfall.toFixed(1)}</td>
                        <td className="px-6 py-4 text-slate-600 font-mono">{row.temperature.toFixed(1)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.ph < 6 ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {row.ph.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-emerald-600 font-black">{row.yield.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-slate-400 text-sm italic">
                Showing top 15 results from main dataset buffer
              </div>
            </div>
          </div>
        );
      case AppSection.MODELS:
        return <MLLab />;
      case AppSection.PREDICT:
        return <Predictor />;
      case AppSection.EDA:
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-800">Exploratory Data Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-6">Rainfall vs Yield Correlation</h4>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-400 italic">
                  [Interactive Scatter Plot Component Ready]
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-6">Feature Importance Matrix</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Rainfall', val: 0.85 },
                    { label: 'Soil pH', val: 0.72 },
                    { label: 'Nitrogen (N)', val: 0.64 },
                    { label: 'Temperature', val: 0.45 },
                  ].map(f => (
                    <div key={f.label}>
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        <span>{f.label}</span>
                        <span>{f.val * 100}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${f.val * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case AppSection.ROADMAP:
        return (
          <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-4xl font-black text-slate-800 mb-12 text-center">Machine Learning Lifecycle</h2>
            <div className="space-y-8 relative">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200"></div>
              {[
                { title: 'Data Collection', desc: 'Sourcing 1000+ records of environmental and agricultural data from public repositories.', status: 'completed' },
                { title: 'Data Cleaning', desc: 'Handling missing values, removing outliers in rainfall readings, and encoding categorical variables.', status: 'completed' },
                { title: 'EDA & Insights', desc: 'Visualizing crop distributions and identifying multi-collinearity between NPK levels.', status: 'completed' },
                { title: 'Model Selection', desc: 'Comparative study between Linear Regression, Decision Trees, and Random Forest Ensemble.', status: 'completed' },
                { title: 'Hyperparameter Tuning', desc: 'Optimizing Random Forest depth and estimators using RandomizedSearchCV.', status: 'completed' },
                { title: 'Deployment', desc: 'Serving the production model via a high-performance React-AI interface.', status: 'current' },
              ].map((step, i) => (
                <div key={i} className="relative pl-16">
                  <div className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                    step.status === 'completed' ? 'bg-emerald-500 border-emerald-100 text-white' : 'bg-white border-slate-100 text-slate-300 ring-4 ring-slate-50'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pl-64 min-h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center space-x-2">
             <div className="bg-emerald-600 p-1.5 rounded-lg">
               <Table className="text-white" size={20} />
             </div>
             <span className="font-bold text-slate-700">Project: Crop Prediction v3.4</span>
           </div>
           <div className="flex items-center space-x-4">
             <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                Env: Development
             </div>
             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-emerald-200">
                JD
             </div>
           </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
