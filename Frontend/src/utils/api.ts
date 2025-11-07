import axios from "axios";
declare const window: any;

export const api = axios.create({
  baseURL: `${window._env_?.VITE_API_URL}`, 
});