
import { CropData, ModelMetrics } from './types';

export const CROP_TYPES = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Pulses'];
export const SEASONS = ['Kharif', 'Rabi', 'Summer', 'Whole Year'];
export const STATES = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];

// Generate mock dataset of ~1000 rows
const generateMockData = (): CropData[] => {
  const data: CropData[] = [];
  for (let i = 1; i <= 1000; i++) {
    const crop = CROP_TYPES[Math.floor(Math.random() * CROP_TYPES.length)];
    const tempBase = crop === 'Rice' ? 25 : crop === 'Wheat' ? 18 : 22;
    const rainBase = crop === 'Rice' ? 1200 : crop === 'Sugarcane' ? 1500 : 800;
    
    data.push({
      id: i,
      cropType: crop,
      season: SEASONS[Math.floor(Math.random() * SEASONS.length)] as any,
      state: STATES[Math.floor(Math.random() * STATES.length)],
      area: 50 + Math.random() * 450,
      rainfall: rainBase + (Math.random() - 0.5) * 400,
      temperature: tempBase + (Math.random() - 0.5) * 10,
      ph: 5.5 + Math.random() * 2.5,
      n: 60 + Math.random() * 60,
      p: 30 + Math.random() * 40,
      k: 30 + Math.random() * 40,
      yield: 2.5 + Math.random() * 5.5
    });
  }
  return data;
};

export const MOCK_DATASET = generateMockData();

export const MODEL_COMPARISON: ModelMetrics[] = [
  { name: 'Linear Regression', rmse: 0.85, mae: 0.62, r2: 0.78 },
  { name: 'Decision Tree', rmse: 0.54, mae: 0.38, r2: 0.89 },
  { name: 'Random Forest', rmse: 0.32, mae: 0.21, r2: 0.95 }
];
