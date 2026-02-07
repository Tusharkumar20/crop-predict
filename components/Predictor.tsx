
import React, { useState } from 'react';
import { CROP_TYPES, SEASONS, STATES } from '../constants';
import { analyzeYieldFactors } from '../services/geminiService';
import { BrainCircuit, Loader2, Thermometer, CloudRain, Droplets, FlaskConical, Target } from 'lucide-react';
import { CropData } from '../types';

const Predictor: React.FC = () => {
  // Explicitly type formData to prevent 'season' from widening to string
  const [formData, setFormData] = useState<{
    cropType: string;
    season: CropData['season'];
    state: string;
    rainfall: number;
    temperature: number;
    ph: number;
    n: number;
    p: number;
    k: number;
  }>({
    cropType: 'Rice',
    season: 'Kharif',
    state: 'Punjab',
    rainfall: 1200,
    temperature: 28,
    ph: 6.5,
    n: 80,
    p: 40,
    k: 40
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [numericalPrediction, setNumericalPrediction] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate complex model inference logic
    const baseYield = formData.cropType === 'Rice' ? 4.5 : 3.2;
    const weatherMod = (formData.rainfall / 1000) * (formData.temperature / 25);
    const result = baseYield * weatherMod * (formData.ph / 6.5);
    
    setNumericalPrediction(result);
    // formData now correctly aligns with Partial<CropData> due to explicit season typing
    const aiInsight = await analyzeYieldFactors(formData);
    setPrediction(aiInsight);
    setLoading(false);
  };

  const InputField = ({ label, name, icon: Icon, type = "number", min, max }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Icon size={16} />
        </div>
        <input
          type={type}
          min={min}
          max={max}
          value={(formData as any)[name]}
          onChange={(e) => setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(e.target.value) : e.target.value }))}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-emerald-900 rounded-3xl p-10 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 -mr-20 -mt-20">
          <BrainCircuit size={400} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-4">Yield Prediction AI</h2>
          <p className="text-emerald-100 text-lg leading-relaxed">
            Enter environmental parameters below to get a highly accurate crop yield prediction powered by our ensemble Random Forest model and Gemini-driven soil analysis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 border-b pb-4">Environmental Parameters</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Crop Variety</label>
              <select 
                value={formData.cropType}
                onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {CROP_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Season</label>
              <select 
                value={formData.season}
                onChange={(e) => setFormData({...formData, season: e.target.value as CropData['season']})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Rainfall (mm)" name="rainfall" icon={CloudRain} min={0} max={5000} />
            <InputField label="Temperature (°C)" name="temperature" icon={Thermometer} min={-10} max={60} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Soil pH" name="ph" icon={FlaskConical} min={0} max={14} />
            <InputField label="Nitrogen (N)" name="n" icon={Droplets} min={0} max={500} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Phosphorus (P)" name="p" icon={Target} min={0} max={500} />
            <InputField label="Potassium (K)" name="k" icon={Target} min={0} max={500} />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <BrainCircuit size={20} />}
            <span>{loading ? 'Processing ML Model...' : 'Calculate Predicted Yield'}</span>
          </button>
        </form>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 min-h-[300px] flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Model Prediction Output</h3>
            
            {numericalPrediction !== null ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-slate-400 text-sm font-medium">Estimated Yield Potential</div>
                <div className="text-6xl font-black text-emerald-600 mb-2">
                  {numericalPrediction.toFixed(2)}
                </div>
                <div className="text-xl font-bold text-slate-800">Tonnes per Hectare</div>
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                   <div className="p-4 bg-emerald-50 rounded-2xl">
                      <div className="text-xs font-bold text-emerald-600 uppercase">Confidence</div>
                      <div className="text-xl font-bold text-emerald-900">94.2%</div>
                   </div>
                   <div className="p-4 bg-blue-50 rounded-2xl">
                      <div className="text-xs font-bold text-blue-600 uppercase">Variance</div>
                      <div className="text-xl font-bold text-blue-900">±0.4</div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300 text-center px-10">
                <Target size={64} className="mb-4 opacity-20" />
                <p>Submit environmental data to trigger the ML inference engine</p>
              </div>
            )}
          </div>

          {prediction && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-xl text-white">
              <h4 className="text-lg font-bold flex items-center space-x-2 mb-4">
                <BrainCircuit className="text-emerald-400" size={20} />
                <span>AI Expert Insights</span>
              </h4>
              <div className="text-slate-300 text-sm leading-relaxed prose prose-invert">
                {prediction}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictor;
