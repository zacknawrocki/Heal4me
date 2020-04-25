import {setAlert} from './alert';

import {ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE} from './types';
import service from "../api";

// Get current user's profile
export const getCurrentProfile = () => dispatch => {
  return service('/api/profile/me').then(res => {
    return dispatch({
      type: GET_PROFILE,
      payload: res.data || []
    });
  })
};

// Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({type: CLEAR_PROFILE});
  service('/api/profile').then(res => {
    return dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  })
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await service.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    return true
  } catch (err) {
    // dispatch({
    // type: PROFILE_ERROR,
    // payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await service.post('/api/profile', formData, config);
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
  
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await service.put('/api/profile/experience', formData, config);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Experience Added', 'success'));
    
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const res = await service.put('/api/profile/education', formData, config);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Education Added', 'success'));
    
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await service.delete(`/api/profile/experience/${id}`);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await service.delete(`/api/profile/education/${id}`);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Please confirm the option')) {
    try {
      await service.delete('/api/profile');
      
      dispatch({type: CLEAR_PROFILE});
      dispatch({type: ACCOUNT_DELETED});
      
      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      });
    }
  }
};
