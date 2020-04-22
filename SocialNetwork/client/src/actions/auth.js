import axios from 'axios';
import {setAlert} from './alert';
import {
  AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS,
  USER_LOADED, CLEAR_PROFILE, LOGOUT} from './types';
import setAuthToken from '../utils/setAuthToken';
import service from '../api'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    await setAuthToken(localStorage.token);
  }
  service.get('/api/auth').then(res => {
    if (localStorage.token !== undefined) {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
  }).catch(err => {
    // dispatch({
    //   type: AUTH_ERROR
    // });
  })
};

// Register User
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const body = JSON.stringify({name, email, password});
  
  try {
    const res = await axios.post('/api/users', body, config);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    // dispatch({
    //   type: REGISTER_FAIL
    // });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({email, password});
  
  try {
    const res = await service.post('/api/auth', body);
    await setAuthToken(res.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    // localStorage.setItem('token', res.token)
    dispatch(loadUser(res.token));
    return true
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    // dispatch({
    //   type: LOGIN_FAIL
    // });
    return false
  }
};

// logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
