import axios from 'axios';

export function show(id) {
  return axios.get(`api/v2/dwellings/storeys/${id}`);
}
