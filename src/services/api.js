const API_URL = 'http://localhost:5000/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  getProfile: () => apiRequest('/auth/profile'),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const companyAPI = {
  create: (companyData) => apiRequest('/financial/companies', {
    method: 'POST',
    body: JSON.stringify(companyData)
  }),

  getAll: () => apiRequest('/financial/companies'),

  getById: (id) => apiRequest(`/financial/companies/${id}`),

  update: (id, companyData) => apiRequest(`/financial/companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(companyData)
  }),

  delete: (id) => apiRequest(`/financial/companies/${id}`, {
    method: 'DELETE'
  }),

  uploadFinancialData: (companyId, data) => apiRequest('/financial/upload', {
    method: 'POST',
    body: JSON.stringify({ companyId, data })
  }),

  getMetrics: (id) => apiRequest(`/financial/metrics/${id}`),

  getForecast: (id) => apiRequest(`/financial/forecast/${id}`)
};

export const aiAPI = {
  ask: (question, financialData, businessContext, metrics, forecast) => apiRequest('/ai/ask', {
    method: 'POST',
    body: JSON.stringify({ question, financialData, businessContext, metrics, forecast })
  })
};