import axios from "axios";

export const instance = axios.create({
  baseURL: "https://example.com",
  timeout: 30000,
});

export function get(url, params) {
  return instance.get(url, { params });
}

export function post(url, data) {
  return instance.post(url, data);
}
