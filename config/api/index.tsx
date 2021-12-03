import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({ url, method, data, token }: CallAPIProps) {
  let headers = {};
  if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }
  }

  const respon = await axios({
    url: url,
    method: method,
    data: data,
    headers: headers,
  }).catch((err) => err.response);

  if (respon.status > 300) {
    const res = {
      error: true,
      message: respon.data.message,
      data: null,
    };
    return res;
  }

  const { length } = Object.keys(respon.data); //get object length

  const res = {
    error: false,
    message: 'success',
    data: length > 1 ? respon.data : respon.data.data,
  };

  return res;
}
