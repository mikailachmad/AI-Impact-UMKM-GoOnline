import joblib

model = joblib.load('model_final_umkm.pkl')

print("=== MENGINTIP ISI OTAK MODEL ===")
try:
    # Mengambil transformer pertama (biasanya tempat data di-encode)
    preprocessor = model.steps[0][1] 
    for name, transformer, cols in preprocessor.transformers_:
        if hasattr(transformer, 'categories_'):
            print(f"Kategori yang Dikenal Model di {cols}:")
            print(transformer.categories_)
except Exception as e:
    print("Buka file CSV training lu aja Mik, lalu copas persis ejaan di sana.")