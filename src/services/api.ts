import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const homeAPI = {
  getUserData: () => api.get('/home/user-data'),
};

export const productAPI = {
  getFashionCategories: () => api.get('/products/fashion/categories'),
  getProductList: (params?: any) => api.get('/products/list', { params }),
  getProductById: (id: string) => api.get(`/products/${id}`),
};

export const reviewAPI = {
  getRecentEarners: (productId: string) => api.get(`/reviews/recent-earners/${productId}`),
  submitReview: (data: any) => api.post('/reviews/submit', data),
};

export const userAPI = {
  getProfile: (id: string) => api.get(`/users/profile/${id}`),
  updateWallet: (id: string, amount: number) => api.put(`/users/wallet/${id}`, { amount }),
};

export default api;