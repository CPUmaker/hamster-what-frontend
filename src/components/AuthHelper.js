import axios from "axios";

import { endpoints } from "../config";

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
        console.log(JSON.stringify(error.response.data));
    } else {
        console.log(error.message);
    }
  }
};

export const facebookLoginOrRegister = async (access_token) => {
  try {
    const { data } = await axios.post(endpoints.facebook, {
      access_token,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const googleLoginOrRegister = async (access_token) => {
  try {
    const { data } = await axios.post(endpoints.google, {
      access_token,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const appleLoginOrRegister = async (id_token) => {
  try {
    const { data } = await axios.post(endpoints.apple, {
        id_token
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
