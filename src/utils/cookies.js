import Cookies from "js-cookie";
// if( process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
//   var domain = 'cduestc.uppower.org.cn'
// }else if (process.env.NODE_ENV === 'test'){
//   var domain = '47.107.121.144'
// }else {
//   var domain = 'localhost'
// }

class CookieUtils {
  
  constructor() {
    this.prefix = "SCIENTIFIC_";
    // this.domain = domain;
    this.expireTime = 1 / 6; //默认4小时
  }

  /**
   *  @param key cookieKey 不能为对象那个
   *  @param value cookieValue ,传对象需要JSON 序列化
   *  @param expires 过期时间,注意: 需要单位是天 ex: 设置1小时: 1/24 或者 如果使用时间戳: newDate(new Date().getTime + timestamp) 不填默认4小时
   *  @param path: 指定哪些路径 cookie 是可见的 不填默认 '/'
   *  @param success 回调函数
   *  @Param model model
   */
  set(model) {
    let { key, value, expires, path, success } = model;
    CookieUtils.checkKey(key);
    key = this.prefix + key;
    Cookies.set(key, value, {
      expires: expires || this.expireTime,
      path: path || "/",
      // domain: this.domain
    });
    success && success();
  }

  /**
   * 通过key 拿到cookie
   * @param key cookieKey 不能为对象那个
   * @returns {*}
   */
  get(key) {
    CookieUtils.checkKey(key);
    return Cookies.get(this.prefix + key);
  }

  /**
   * 删除cookie
   * @param key cookieKey
   * @param path 指定删除cookie的路径 不填默认 '/'
   * @param success 回调函数
   */
  remove(key, path, success) {
    CookieUtils.checkKey(key);
    Cookies.remove(this.prefix + key, {
      path: path || "/",
      // domain: this.domain
    });
    success && success();
  }

  static checkKey(key) {
    if (!key) {
      throw new Error("没有找到key。");
    }
    if (typeof key === "object") {
      throw new Error("key不能是一个对象。");
    }
  }
}

export const token = "access_token"
export const isFir = 'first_login'
export default new CookieUtils();
