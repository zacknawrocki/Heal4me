import axios from 'axios';

import {
    GET_RECOMMENDATION,
    RECOMMENDATION_ERROR
} from './types';

export const getRecommendation = () => async dispatch => {
    try {
        const res = await axios.get('/api/home');

        dispatch({
            type: GET_RECOMMENDATION,
            payload: res.data
        });
      } catch (err) {
            dispatch({
            type: RECOMMENDATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
    