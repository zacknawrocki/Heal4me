import {
  ACCOUNT_DELETED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED
} from '../actions/types';
import setAuthToken from "../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token'),
  loading: true,
  user: {}
}

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case USER_LOADED:
      console.log(payload);
      localStorage.setItem('user_id', payload._id);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      setAuthToken('');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {}
      }
    default:
      return state;
    
  }
  
}
