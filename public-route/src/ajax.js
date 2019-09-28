import axios from "axios";  //引入axios库
// 创建ajax请求对象
const request = axios.create({
    baseURL: "http://10.12.1.193:9090/v2.0/lls",  //基准URL
    // baseURL: "https://cnodejs.org/api/v1"
    withCredentials: true   //每次发送请求时，是否需要携带浏览器cookie信息
});

//对外抛出request对象
export default request;