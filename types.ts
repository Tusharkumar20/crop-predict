
export interface CropData {
  id: number;
  cropType: string;
  season: 'Kharif' | 'Rabi' | 'Summer' | 'Whole Year';
  state: string;
  area: number; // in hectares
  rainfall: number; // mm
  temperature: number; // Celsius
  ph: number;
  n: number; // Nitrogen
  p: number; // Phosphorus
  k: number; // Potassium
  yield: number; // Metric tonnes/hectare
}

export interface ModelMetrics {
  name: string;
  rmse: number;
  mae: number;
  r2: number;
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  DATASET = 'DATASET',
  EDA = 'EDA',
  MODELS = 'MODELS',
  PREDICT = 'PREDICT',
  ROADMAP = 'ROADMAP'
}
