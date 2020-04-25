import {setAlert} from './alert';
import {CLEAR_PROFILE, GET_MY_POSTS, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS, USER_LOADED} from './types';
import setAuthToken from '../utils/setAuthToken';
import service from '../api'
import {message} from "antd";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    await setAuthToken(localStorage.token);
  }
  service.get('/api/auth').then(res => {
    if (localStorage.token !== undefined) {
      dispatch({type: CLEAR_PROFILE});
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
  })
};

// Register User
export const register = ({name, email, password}) => async dispatch => {
  const body = JSON.stringify({name, email, password});
  
  try {
    const res = await service.post('/api/users', body);
    if (res.data) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      Promise.resolve()
    } else {
      if (res.errors) {
        message.error(res.errors[0].msg)
      }
      Promise.reject()
    }
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    Promise.reject()
    // dispatch({
    //   type: REGISTER_FAIL
    // });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({email, password});
  return service.post('/api/auth', body).then(res=>{
    setAuthToken(res.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(res.token));
  })
};

// logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: GET_MY_POSTS, data: []});
  dispatch({type: LOGOUT});
};
