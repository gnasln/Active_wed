let index: any = 'env';
let apiUrl: any = 'apiURL';
export const environment = {
  production: false,
  API_URL: window[index][apiUrl] || 'https://active-api.trueconnect.io.vn',
  name: window[index]['name'] || 'production',
};
