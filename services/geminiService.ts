
import { GoogleGenAI } from "@google/genai";
import { CropData } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeYieldFactors = async (input: Partial<CropData>) => {
  const prompt = `
    Act as an Agricultural Data Scientist. Analyze the following crop environment factors and predict the yield potential (low, medium, high).
    Explain why based on the soil chemistry (NPK) and weather parameters provided.
    
    Inputs:
    - Crop: ${input.cropType}
    - Temperature: ${input.temperature}°C
    - Rainfall: ${input.rainfall}mm
    - Soil pH: ${input.ph}
    - NPK Ratio: ${input.n}:${input.p}:${input.k}
    
    Provide a professional summary of the prediction and suggestions for optimization.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9
      }
    });
    // Use the text property directly (not a method) as per SDK documentation.
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Could not perform AI analysis at this time. Please check your parameters.";
  }
};

export const getEDAPerspective = async (data: CropData[]) => {
    // We send a summary of the data to get expert insights
    const summary = data.slice(0, 10).map(d => `${d.cropType}: Yield ${d.yield.toFixed(2)} at ${d.temperature}°C`).join(', ');
    const prompt = `Briefly analyze these agricultural trends and provide 3 key insights: ${summary}`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        // Use the text property directly (not a method) as per SDK documentation.
        return response.text;
    } catch (e) {
        return "Insights are currently unavailable.";
    }
}
