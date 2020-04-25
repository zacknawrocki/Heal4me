import axios from 'axios'
import {message} from 'antd';
import React from "react";

const service = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})
if (localStorage.token) {
  service.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
}


/**
 * interceptors deployment
 */
service.interceptors.response.use(res => {
  // response to data
  // console.log(res, 222);
  return res;
}, err => {
  const msg = err.response.data?.msg
  // response to errors
  err.response.status === 404 && message.destroy() && message.error('Errors, please check network');
  err.response.status.toString().startsWith('5') && message.destroy() && message.error('Server Error');
  if (msg === 'No token, authorization denied' || err.response.status === 401) {
    message.error('Login has expired!')
    window.location.pathname = '/login'
  }
  if (msg) {
    message.error(msg)
  } else {
    const errors = err.response.data.errors;
    if (errors && errors.length>0) {
      message.error(errors[0].msg)
    }
  }
  return Promise.reject(err.response.data)
});

// export default function ajax (url, data = null, method = 'GET', token, responseType) {

export const fetch = (url, data = null, method = 'GET') =>{
  return service({
    method,
    url,
    data,
  })
}


export default service
/**
 * Export ajax objects
 * @param url
 * @param data
 * @param method
 * @param token
 * @param responseType
 * @returns {Promise<unknown>}
 */


/**
 * Export ajax objects
 * @param url
 * @param data
 * @param method
 * @param token
 * @param responseType
 * @returns {Promise<unknown>}
 */
export function ajax (url, data = null, method = 'GET', token, responseType) {
  return new Promise((resolve, reject) => {
    let promise = {};
    const ajaxObj = {};
    
    !!url && Object.defineProperty(ajaxObj,'url', { value: url, enumerable:true});
    !!data && method === 'POST' && Object.defineProperty(ajaxObj,'data', { value: data, enumerable:true });
    !!data && method === 'GET' && Object.defineProperty(ajaxObj,'params', { value: data, enumerable:true });
    !!method && Object.defineProperty(ajaxObj,'method', { value: method, enumerable:true});
    !!token && Object.defineProperty(ajaxObj,'headers', { value: {   'Authorization':`Bearer ${token}` }, enumerable:true});
    !!responseType && Object.defineProperty(ajaxObj,'responseType', { value: responseType, enumerable:true});
    
    promise = axios(ajaxObj);
    
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
    
  })
}
