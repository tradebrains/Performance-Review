import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
});

export const authPost = (url, data) => {
  return instance.post(url, data);
};
export const get = (url) => {
  return instance.get(url);
};
export const del = (url, data) => {
  return instance.delete(url);
};
export const put = (url, data) => {
  return instance.put(url, data);
};
export const patch = (url, data) => {
  return instance.patch(url, data);
};
