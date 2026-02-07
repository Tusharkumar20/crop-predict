
import React, { useState } from 'react';
import { MODEL_COMPARISON } from '../constants';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CheckCircle2, FlaskConical, PlayCircle, Settings2 } from 'lucide-react';

const MLLab: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(MODEL_COMPARISON[2]);
  const [isTuning, setIsTuning] = useState(false);

  // Prepare data for Radar Chart
  const radarData = MODEL_COMPARISON.map(m => ({
    name: m.name,
    RMSE: 1 - m.rmse, // Inverse for radar visibility
    MAE: 1 - m.mae,
    'R-Squared': m.r2,
    Efficiency: m.r2 * 0.95,
  }));

  const metricsFields = ['RMSE', 'MAE', 'R-Squared', 'Efficiency'];
  const formattedRadar = metricsFields.map(field => ({
    subject: field,
    'Linear Regression': radarData[0][field as keyof typeof radarData[0]],
    'Decision Tree': radarData[1][field as keyof typeof radarData[1]],
    'Random Forest': radarData[2][field as keyof typeof radarData[2]],
  }));

  const handleTune = () => {
    setIsTuning(true);
    setTimeout(() => setIsTuning(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Machine Learning Laboratory</h2>
          <p className="text-slate-500">Model selection, hyperparameter tuning, and metric evaluation</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleTune}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Settings2 size={16} />
            <span>{isTuning ? 'Tuning...' : 'Auto-Tune Hyperparameters'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors">
            <PlayCircle size={16} />
            <span>Retrain Ensemble</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          {MODEL_COMPARISON.map((model) => (
            <div 
              key={model.name}
              onClick={() => setSelectedModel(model)}
              className={`p-6 rounded-2xl cursor-pointer transition-all border-2 ${
                selectedModel.name === model.name 
                  ? 'bg-emerald-50 border-emerald-500 shadow-md ring-4 ring-emerald-50' 
                  : 'bg-white border-transparent hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg text-slate-800">{model.name}</h4>
                {selectedModel.name === model.name && <CheckCircle2 className="text-emerald-500" size={20} />}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/50 p-2 rounded-lg">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">R² Score</div>
                  <div className="text-md font-black text-slate-700">{model.r2}</div>
                </div>
                <div className="bg-white/50 p-2 rounded-lg">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">RMSE</div>
                  <div className="text-md font-black text-slate-700">{model.rmse}</div>
                </div>
                <div className="bg-white/50 p-2 rounded-lg">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MAE</div>
                  <div className="text-md font-black text-slate-700">{model.mae}</div>
                </div>
              </div>
            </div>
          ))}

          <div className="p-6 bg-slate-900 rounded-2xl text-white">
            <h5 className="font-bold mb-2 flex items-center space-x-2">
              <FlaskConical size={18} className="text-emerald-400" />
              <span>Model Selection Note</span>
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Random Forest outperforms others by handling non-linear relationships between soil pH and moisture significantly better. GridSearch CV used for tuning.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[500px]">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Performance Metric Comparison</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedRadar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
                <Radar
                  name="Random Forest"
                  dataKey="Random Forest"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Decision Tree"
                  dataKey="Decision Tree"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
                <Radar
                  name="Linear Regression"
                  dataKey="Linear Regression"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                />
                <Legend iconType="circle" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLLab;
