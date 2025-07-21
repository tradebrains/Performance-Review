import { authPost } from "./authClient";
import { get, post, put } from "./MainClient";

export const postLogin = async (data) => {
  const loginResp = await authPost(`auth/login/`, data).then((resp) => {
    return resp;
  });
  return loginResp;
};

export const postRegister = async (data) => {
  const loginResp = await authPost(`auth/register/`, data).then((resp) => {
    return resp;
  });
  return loginResp;
};

export const getUserData = async () => {
  const searchResp = await get(`auth/user-details/`).then((resp) => {
    return resp;
  });
  return searchResp;
};

export const getPerformanceData = async () => {
  const searchResp = await get(`performance-reviews/`).then((resp) => {
    return resp;
  });
  return searchResp;
};

export const getPerformanceEditData = async (id) => {
  const searchResp = await get(`performance-reviews/${id}/`).then((resp) => {
    return resp;
  });
  return searchResp;
};

export const postPerformanceReviewData = async (data) => {
  const response = await post(`performance-reviews/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const putPerformanceReviewData = async (id, data) => {
  const response = await put(`performance-reviews/${id}/`, data).then(
    (resp) => {
      return resp?.data;
    }
  );
  return response;
};

export const getAnnouncementData = async (id) => {
  const searchResp = await get(`announcementReview/notification/`).then(
    (resp) => {
      return resp;
    }
  );
  return searchResp;
};

export const getAnnouncementDataId = async (id) => {
  const searchResp = await get(`announcementReview/notification/${id}/`).then(
    (resp) => {
      return resp;
    }
  );
  return searchResp;
};

export const postAnnouncementData = async (data) => {
  const searchResp = await post(`announcementReview/notification/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return searchResp;
};

export const putAnnouncementData = async (id, data) => {
  const searchResp = await put(
    `announcementReview/notification/${id}/`,
    data
  ).then((resp) => {
    return resp;
  });
  return searchResp;
};

export const getEmployeeDetails = async (email) => {
  const response = await get(`employeebasics/?user_id__email=${email}`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};
