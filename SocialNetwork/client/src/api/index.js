import axios from 'axios'
import {message} from 'antd';
import { Redirect} from 'react-router-dom'
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
    console.log(4444);
    message.error('Login has expired!')
    window.location.pathname = '/login'
  }
  if (msg) {
    message.error(msg)
  } else {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => message.error(error.msg));
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
