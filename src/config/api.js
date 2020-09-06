import axios from 'axios';

const BASE_URL_LOCAL = 'http://localhost:3000/api/v1';
const BASE_URL_PROD = 'http://[N/A]/api/v1';

const isProd = () => process.env.NODE_ENV === 'production';

function getBaseUrl() {
  return isProd() ? BASE_URL_PROD : BASE_URL_LOCAL;
}

export function buildApi() {
  return axios.create({
    baseURL: getBaseUrl(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Authorization': null,
    },
  });
}
