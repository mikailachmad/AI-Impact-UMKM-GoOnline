import axios from 'axios';

// URL Azure API (sesuaikan dengan URL kamu)
const AZURE_API_URL = process.env.NEXT_PUBLIC_AZURE_API_URL || 'https://api-umkm-sleman-2026-euhcecfvdvgrexft.indonesiacentral-01.azurewebsites.net';

// Instance axios dengan base URL
const apiClient = axios.create({
  baseURL: AZURE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Fungsi untuk predict kesiapan digital UMKM
 * @param {Object} data - Input data UMKM
 * @returns {Promise<Object>} - Response dari API
 */
export const predictUMKM = async (data) => {
  try {
    const response = await apiClient.post('/predict', data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error predicting UMKM:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Gagal melakukan prediksi. Coba lagi nanti.',
      status: error.response?.status
    };
  }
};

/**
 * Fungsi untuk check health API
 * @returns {Promise<Boolean>} - Status API
 */
export const checkAPIHealth = async () => {
  try {
    const response = await apiClient.get('/');
    return response.status === 200;
  } catch (error) {
    console.error('API is not healthy:', error);
    return false;
  }
};

export default apiClient;
