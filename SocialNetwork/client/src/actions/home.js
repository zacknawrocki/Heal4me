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

export const getImages = ({offset}) => {
  return service.get('/api/images?offset='+ offset)
}

export const getGrade = () => {
  return service.get('/api/grade')
}
