import Config from './config';
import axiosInstance from './api.config';

export const createUser = async userData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/httpsUserCreate/api/${Config.API_VERSION}/userCreate`, userData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const updatePassword = async userData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/httpsUserUpdatePassword/api/${Config.API_VERSION}/updatePassword`, userData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const contactUs = async userData => {
  try {
    const res = await axiosInstance.post(
      `${Config.API_END_POINT}/httpsContectUs/api/${Config.API_VERSION}/contectUs`, userData
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};