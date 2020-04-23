import service from '../api';
import {setAlert} from './alert';
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_MY_POSTS,
  GET_POST,
  GET_POSTS,
  REMOVE_COMMENT,
  UPDATE_LIKES
} from './types';

// Get posts of a user
export const getMyPosts = () => async dispatch => {
  try {
    const res = await service.get('/api/posts/my', {
      headers: {
        Authorization: localStorage.token
      }
    })
    dispatch({
      type: GET_MY_POSTS,
      payload: res.data
    })
  } catch (err) {
  
  }
}

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await service.get('/api/posts');
    
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    //     dispatch({
    //     type: POST_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Add like
export const addLike = id => async dispatch => {
  service.put(`/api/posts/like/${id}`).then(res=>{
    dispatch({
      type: UPDATE_LIKES,
      payload: {id, likes: res.data}
    });
  })
};

// Remove like
export const removeLike = id => async dispatch => {
  service.put(`/api/posts/unlike/${id}`).then(res=>{
    return dispatch({
      type: UPDATE_LIKES,
      payload: {id, likes: res.data}
    });
  })
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await service.delete(`/api/posts/${id}`);
    
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    
    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    // dispatch({
    //     type: POST_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  return new Promise(function(resolve, reject) {
    service.post('/api/posts', formData).then(res=>{
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      console.log(formData);
      resolve(res.data);
    }).catch(err => {
      reject(err);
    });
  });
};

// Get post
export const getPost = id => async dispatch => {
  console.log(id);
  try {
    const res = await service.get(`/api/posts/${id}`);
    
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //     type: POST_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const res = await service.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    
    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    // dispatch({
    //     type: POST_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await service.delete(`/api/posts/comment/${postId}/${commentId}`);
    
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    // dispatch({
    //     type: POST_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};
