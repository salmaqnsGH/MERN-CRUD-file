import axios from 'axios';
import { LoginTypes } from './data-types';

const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api';

export async function setSignUp(data) {
  const URL = 'auth/register';

  const respon = await axios.post(`${NEXT_PUBLIC_API}/${API_VERSION}/${URL}`, data).catch((err) => err.response);
  // console.log("api resp", respon);
  const axiosResponse = respon.data;

  if (axiosResponse?.error === 1) {
    return axiosResponse;
  }

  return axiosResponse.data;
}

export async function setLogin(data: LoginTypes) {
  const URL = 'auth/signin';

  const respon = await axios.post(`${NEXT_PUBLIC_API}/${API_VERSION}/${URL}`, data).catch((err) => err.response);

  if (respon.status > 300) {
    const res = {
      error: true,
      message: respon.data.message,
      data: null,
    };
    return res;
  }
  const res = {
    error: false,
    message: 'success',
    data: respon.data.data,
  };
  return res;
}
