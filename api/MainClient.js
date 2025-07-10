import Cookies from "js-cookie";
import axios from "axios";

export const getHeader = async () => {
  const storeData = Cookies.get("performance_access_token");
  if (storeData) {
    return {
      headers: {
        Authorization: `Bearer ${storeData ?? null}`,
      },
    };
  }
};

const instance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
});

export const post = async (url, data) => {
  return instance?.post(url, data, await getHeader());
};
export const get = async (url) => {
  return instance.get(url, await getHeader());
};
export const getServer = async (url, head) => {
  return instance.get(url, await head);
};

export const del = async (url) => {
  return instance.delete(url, await getHeader());
};
export const delWithParams = async (url, data) => {
  const head = await getHeader();
  return instance.delete(url, await { ...head, data: data });
};
export const put = async (url, data) => {
  return instance.put(url, data, await getHeader());
};
export const patch = async (url, data) => {
  return instance.patch(url, data, await getHeader());
};
