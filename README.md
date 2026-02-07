
# AgroPredict AI: Crop Yield Prediction

## Problem Overview
Agriculture is highly dependent on unpredictable environmental factors. This project provides a machine learning interface to predict crop yield per hectare based on historical weather patterns and soil chemistry.

## Data Source
The dataset is a simulated collection of 1,200 agricultural records based on Indian farming conditions, featuring 10 key environmental features and 1 target variable (Yield).

## Models Used
1. **Linear Regression**: Used as a baseline performance metric.
2. **Decision Tree Regressor**: Captures complex non-linear splits in environmental data.
3. **Random Forest Regressor (Selected)**: The final selection due to its robust handling of feature interactions and superior R² score.

## Steps to Run
1. Install requirements: `pip install -r requirements.txt`
2. Run the application: `streamlit run app.py`
3. (Optional) Provide `API_KEY` in environment variables to enable Gemini AI insights.

## Project Stages
- [x] Data Cleaning & Preprocessing
- [x] EDA with Plotly Visualizations
- [x] Model Training (3 Regressors)
- [x] Hyperparameter Comparison
- [x] Interactive Prediction UI
