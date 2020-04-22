import {GET_RECOMMENDATION, RECOMMENDATION_ERROR} from '../actions/types';

const initialState = {
  recommendation: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_RECOMMENDATION:
      return {
        ...state,
        recommendation: payload,
        loading: false
      };
    case RECOMMENDATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
