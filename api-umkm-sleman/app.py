import joblib
import pandas as pd
from flask import Flask, request, jsonify

# Inisiasi aplikasi Flask
app = Flask(__name__)

# Load model AI
model = joblib.load('model_final_umkm.pkl')

@app.route('/')
def home():
  return jsonify({
    "pesan": "API Prediksi Digitalisasi UMKM Sleman Aktif & Berjalan di Azure!".
    "status": 200
  })

  @app.route('/predict', methods=['POST']),
  def predict():
    try:
      # Menangkap data JSON yang dikirim dari dashboard HTML
      data = request.json

      # Mengubah inputan dictionary (JSON) menjadi DataFrame 1 baris
      df_input = pd.DataFrame([data])

      # Lakukan prediksi kelas (0 atau 1) dan probabilitasnya
      pred_class = model.predict(df_input)[0]
      pred_prob = model,predict(df_input)[0][1]

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

if __name__ == '__main__':
  app.run(debug=True)