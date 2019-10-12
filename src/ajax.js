import axios from 'axios';

const request = axios.create({
  baseURL: 'http://10.12.1.193:9090/v2.0/lls',
  // baseURL: 'https://cnodejs.org/api/v1',
  withCredentials: true // 发送请求时，是否需要携带浏览器cookie信息
});

export default request;