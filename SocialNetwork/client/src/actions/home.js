import service from '../api';

import {GET_RECOMMENDATION} from './types';

export const getRecommendation = () => async dispatch => {
  try {
    const res = await service.get('/api/home');
    return dispatch({
      type: GET_RECOMMENDATION,
      payload: res.data
    });
  } catch (err) {
    return false
  }
};

export const getImages = () => {
  return service.get('/api/images')
}

export const getGrade = () => {
  return service.get('/api/grade')
}
