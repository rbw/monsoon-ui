import axios from 'axios';
import { stringify } from 'query-string';

function handleError(response) {
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function getOne({ resource, id }) {
  return request(`${resource}/${id}`);
}

export function getList({ resource, params }) {
  return request(`${resource}?${stringify(params)}`);
}

export function create({ resource, payload }) {
  return request(resource, {
    method: 'POST',
    data: payload,
  });
}

export function update({ resource, id, payload }) {
  return request(`${resource}/${id}`, {
    method: 'PUT',
    data: payload,
  });
}

function request(resource, options) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const urlBase = '/api/monsoon';

  return axios({
    url: urlBase + resource,
    headers,
    withCredentials: true,
    ...options,
  })
    .then(response => response)
    .catch(error => handleError(error.response));
}
