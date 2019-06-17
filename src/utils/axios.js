import axios from "axios";
import router from "../router";
import CookieUtils from "./cookies";
import { token } from "./cookies"
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { validateNull } from "./validate-utils";
import home from "../store/modules/home"

axios.defaults.timeout = 30000;
//跨域允许保存Cookie
axios.defaults.withCredentials = false;
// console.log(home.state.hostname);

axios.defaults.baseURL = home.state.hostname;
NProgress.configure({ showSpinner: false }); // NProgress Configuration

// console.log(CookieUtils.get(token));
if (home.state.access_token) {
  //console.log(home.state.access_token, "RJCtoken");
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + home.state.access_token;
  //config.headers["Authorization"] = "Bearer " + home.state.access_token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
}
else if(CookieUtils.get(token)) {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + CookieUtils.get(token);
}
/**
 * request拦截
 */
axios.interceptors.request.use(
  function(config) {
    NProgress.start();
    // console.log(home.state.access_token);

    if (home.state.access_token) {
      //console.log(home.state.access_token, "RJCtoken");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + home.state.access_token;
      //config.headers["Authorization"] = "Bearer " + home.state.access_token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * response 拦截
 */
axios.interceptors.response.use(
  response => {
    NProgress.done();
    // console.log(response);
    if (!validateNull(response.data.success)) {
      if (response.data.success === false) {
        Message.error(response.data.msg);
        return Promise.reject(response.data.msg);
      }
    }
    return response.data;
  },
  error => {
    // console.log(error.response);
    NProgress.done();
    let code = error.response.status;
    switch (code) {
      case 400:
        error.message = error.response.data.msg || error.response.data.message || "错误请求";
        break;
      case 401:
        error.message = error.response.data.msg || error.response.data.message || "未授权,请重新登录";
        break;
      case 403:
        error.message = error.response.data.msg || error.response.data.message || "禁止访问";
        break;
      case 404:
        error.message = error.response.data.msg || error.response.data.message || "请求错误,未找到该资源";
        break;
      case 405:
        error.message = error.response.data.msg || error.response.data.message || "请求方法未允许";
        break;
      case 408:
        error.message = error.response.data.msg || error.response.data.message || "请求超时";
        break;
      case 500:
        error.message = error.response.data.msg || error.response.data.message || "服务器错误";
        break;
      case 501:
        error.message = error.response.data.msg || error.response.data.message || "网络未实现";
        break;
      case 502:
        error.message = error.response.data.msg || error.response.data.message || "网络错误";
        break;
      case 503:
        error.message = "服务不可用";
        break;
      case 504:
        error.message = "网络超时";
        break;
      case 505:
        error.message = "http版本不支持该请求";
        break;
      default:
        error.message = error.response.data.msg;
    }
    Message.error(error.message);
    
    if (parseInt(code) === 401 && router.app._route.fullPath !== '/') {
      // console.log(router.app._route.fullPath);
      router.push({
        name: 'Login',
        params: {
          path: router.app._route.fullPath
        }
      })
      CookieUtils.remove(token)
    }
    return Promise.reject(error.message);
  }
);
export default axios;
