import { authPost } from "./authClient";
import { get, post, put } from "./MainClient";

export const getSearchData = async (input) => {
  const searchResp = await get(`company/search/portal/`).then((resp) => {
    return resp;
  });
  return searchResp;
};

export const postLoginData = async (data) => {
  const loginResp = await authPost(`auth/login/`, data).then((resp) => {
    return resp;
  });
  return loginResp;
};

export const putUserRoleUpdate = async (data) => {
  const response = await put(`user/type/`, data).then((resp) => {
    return resp?.data;
  });
  return response;
};

export const postLogin = async (data) => {
  const response = await post(`sales-dashboard/login/`, data).then((resp) => {
    return resp;
  });
  return response;
};
