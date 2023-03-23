import axios from "axios";
import { cookies } from './cookie';

export const apis = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {},
});


//헤더 보내기 전용
const token = cookies.get("token");
export const Hapis = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});