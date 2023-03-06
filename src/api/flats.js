import axios from 'axios';

export function list(params = {}) {
  return axios.get('api/v2/flats', {
    params
  });
}

export function show(id) {
  return axios.get(`api/v2/dwellings/flats/${id}`);
}

export function pdf(params) {
  return axios.get(`api/v2/pdf`, { params });
}

export function book(data) {
  return axios.post(`api/v2/feedback`, data);
}
