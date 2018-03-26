/*
 * axios 配置
 * Author: wei.li
 * Time: 2017.12.18 星期一
*/

// 使得 axios 支持 finally
require('promise.prototype.finally').shim();
var querystring = require('querystring')
import axios from "axios";

// 创建一个axios实例，做一些自定义配置
let $ajax = axios.create({
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    if (!headers['Content-Type'] && headers['Content-Type'] !== 'multipart/form-data') {
      // post 请求中将 json 格式的参数 转换成 querystring 字符串形式。
      data = querystring.stringify(data);
    }
    return data;
  }],
});

// 添加请求拦截器
$ajax.interceptors.request.use((config) => {
  // 客户端中上报 mac 地址
  if (top && top.XCMACADDRESS) {
    config.headers['Xc-Mac'] = top.XCMACADDRESS;
  }
  return config;
})

// 添加响应拦截器，
$ajax.interceptors.response.use((res) => {
  // 前端对于接口返回值进行深度遍历，将数字改为字符串
  commonRecursionToString(res.data);
  return res.data;
})

/*
 * @desc: 深度遍历对象，将对象中的数字转换为字符串
 * @param: obj - 需要转换的对象
*/
var commonRecursionToString = function (obj) {
  for (var i in obj) {
    if ('string' == typeof obj[i]) {
      ;
    } else if ('number' == typeof obj[i]) {
      obj[i] = obj[i].toString();
    } else if ('object' == typeof obj[i]) {
      commonRecursionToString(obj[i]);
    }
  }
};

export default $ajax;