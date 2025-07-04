// config/env.js
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    TIMEOUT: 10000,
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    TIMEOUT: 15000,
  },
  test: {
    API_BASE_URL: 'http://localhost:5001/api',
    TIMEOUT: 5000,
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];

// .env.local (fichier à créer à la racine de votre projet React)
// REACT_APP_API_URL=http://localhost:5000/api
// REACT_APP_TIMEOUT=10000