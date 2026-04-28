from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)
model = joblib.load('model_final_umkm.pkl')

@app.route('/')
def home():
  return jsonify({
    "pesan": "API Prediksi Digitalisasi UMKM Sleman Aktif & Berjalan di Azure!",
    "status": 200
  })

@app.route('/predict', methods=['POST'])
def predict():
   try:
      data = request.json
      
      # Mapping kategori sektor dari frontend ke model
      sektor_mapping = {
        'Dagang': 'Perdagangan',
        'Jasa': 'Jasa',
        'Agribisnis': 'Industri',
        'Perdagangan': 'Perdagangan'
      }
      
      # Convert sektor jika perlu
      if 'sektor_usaha' in data:
        data['sektor_usaha'] = sektor_mapping.get(data['sektor_usaha'], data['sektor_usaha'])
      
      df_input = pd.DataFrame([data])
      pred_class = model.predict(df_input)[0]
      pred_prob = model.predict_proba(df_input)[0][1]
      return jsonify({
        'status': 'success',
        'prediksi_go_online': int(pred_class),
        'probabilitas_persen': round(float(pred_prob) * 100, 2),
        'rekomendasi': 'UMKM memilki potensi tinggi untuk go online. Fokus pada integrasi website.' if pred_class == 1 else 'UMKM tertinggal. Mulai pendampikan via WhatsApp Business.'
      })
   except Exception as e:
      return jsonify({
        'status': 'error',
        'message': str(e)
      })