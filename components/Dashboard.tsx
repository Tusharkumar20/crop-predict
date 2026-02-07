
import React from 'react';
import { MOCK_DATASET } from '../constants';
import { 
  TrendingUp, 
  CloudRain, 
  Thermometer, 
  Layers 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  const avgYield = MOCK_DATASET.reduce((acc, curr) => acc + curr.yield, 0) / MOCK_DATASET.length;
  const avgRain = MOCK_DATASET.reduce((acc, curr) => acc + curr.rainfall, 0) / MOCK_DATASET.length;
  const avgTemp = MOCK_DATASET.reduce((acc, curr) => acc + curr.temperature, 0) / MOCK_DATASET.length;

  const cropGroupData = React.useMemo(() => {
    const groups: Record<string, { count: number, total: number }> = {};
    MOCK_DATASET.forEach(d => {
      if (!groups[d.cropType]) groups[d.cropType] = { count: 0, total: 0 };
      groups[d.cropType].count++;
      groups[d.cropType].total += d.yield;
    });
    return Object.entries(groups).map(([name, data]) => ({
      name,
      avgYield: parseFloat((data.total / data.count).toFixed(2))
    }));
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Operational Dashboard</h2>
          <p className="text-slate-500">Real-time agricultural intelligence overview</p>
        </div>
        <div className="text-sm font-medium text-slate-50 px-4 py-2 bg-emerald-600 rounded-full">
          Dataset: 1,000 Samples Loaded
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Yield', val: `${avgYield.toFixed(2)} T/Ha`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Rainfall', val: `${avgRain.toFixed(0)} mm`, icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Temp', val: `${avgTemp.toFixed(1)}°C`, icon: Thermometer, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Total Crops', val: '6 Varieties', icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6 text-slate-800">Average Yield by Crop Type</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropGroupData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="avgYield" radius={[6, 6, 0, 0]} barSize={40}>
                  {cropGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Yield Efficiency Target</h3>
          <div className="flex flex-col items-center justify-center h-64">
             <div className="relative w-48 h-48">
               <svg className="w-full h-full" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                 <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="210" strokeDashoffset="40" strokeLinecap="round" transform="rotate(-90 50 50)" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-emerald-600">82%</span>
                 <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Optimized</span>
               </div>
             </div>
             <p className="mt-6 text-sm text-center text-slate-500 px-4">
                Current resource allocation vs historical yield benchmarks shows high correlation with optimal nitrogen levels.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
