
import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  BarChart4, 
  Cpu, 
  Zap, 
  Map
} from 'lucide-react';
import { AppSection } from '../types';

interface SidebarProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const items = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppSection.DATASET, label: 'Dataset Viewer', icon: Database },
    { id: AppSection.EDA, label: 'Exploratory Analysis', icon: BarChart4 },
    { id: AppSection.MODELS, label: 'Model Laboratory', icon: Cpu },
    { id: AppSection.PREDICT, label: 'Yield Predictor', icon: Zap },
    { id: AppSection.ROADMAP, label: 'ML Roadmap', icon: Map },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          AgroPredict
        </h1>
        <p className="text-xs text-slate-500 mt-1">AI Crop Yield Solutions</p>
      </div>
      
      <nav className="flex-1 mt-4 px-3 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-emerald-50 text-emerald-700 shadow-sm border-l-4 border-emerald-600' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={20} className={activeSection === item.id ? 'text-emerald-600' : 'text-slate-400'} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center space-x-2 p-2 bg-emerald-100 rounded-md">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700">Model Engine: Active</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
