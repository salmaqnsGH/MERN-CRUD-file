import axios from 'axios';
import callAPI from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api';

export async function getCountry() {
  const URL = 'countries';

  const respon = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`).catch((err) => err.response);
  const axiosResponse = respon.data;

  if (axiosResponse?.error === 1) {
    return axiosResponse;
  }

  return axiosResponse.data;
}

export async function getFiles() {
  const url = `${ROOT_API}/${API_VERSION}/files`;

  return callAPI({ url, method: 'GET', token: true });
}

export async function addFile(data) {
  const url = `${ROOT_API}/${API_VERSION}/addFile`;

  return callAPI({ url, method: 'POST', data, token: true });
}

export async function deleteFile(data) {
  const url = `${ROOT_API}/${API_VERSION}/deleteFile?file=${data}`;

  return callAPI({ url, method: 'DELETE', token: true });
}
