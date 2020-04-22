import React, {Fragment, useEffect, useState, createElement} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Comment, Tooltip, Avatar, Button, Popconfirm } from 'antd';
import moment from "moment";
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {addLike, deletePost, removeLike} from '../../actions/post';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, CloseOutlined } from '@ant-design/icons';
import classnames from 'classnames'

const PostItem = ({
                    addLike,
                    removeLike,
                    deletePost,
                    auth,
                    isHome,
                    post: {_id, text, name, avatar, user, likes, comments, date},
                    showActions,
                  }) => {
  // console.log(auth.user, _id);
  // const [likes, setLikes] = useState(false);
  // const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [hadLike, sethadLike] = useState(false);
  
  useEffect(()=>{
    const hadLike = _id && likes.find(like=> like.user === auth.user._id)
    sethadLike(hadLike)
  }, [likes])
  
  const like = () => {
    addLike(_id).then(res=>{
      sethadLike(true);
      setAction('liked');
    })
    // setDislikes(0);
  };
  
  const dislike = () => {
    removeLike(_id).then(res=>{
      // setLikesa(0);
      // setDislikes(1);
      sethadLike(false)
      setAction('disliked');
    })
  };
  
  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
          onClick: like,
        })}
      </Tooltip>
      <span className="comment-action">{likes?.length}</span>
    </span>,
    <span key="comment-basic-dislike">
      <Tooltip title="Dislike">
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
          onClick: dislike,
        })}
      </Tooltip>
      {/*<span className="comment-action">{dislikes}</span>*/}
    </span>,
    <span key="comment-basic-reply-to">
       <Link to={`/posts/${_id}`} >
         Discussion{' '}
         {comments.length > 0 && (
           <span className='comment-count'>({comments.length})</span>
         )}
       </Link>
    </span>,
    <span key="comment-delete">
       {!auth.loading && user === auth.user._id && (
         <Popconfirm
           title="Are you sure delete this task?"
           onConfirm={() => deletePost(_id)}
           okText="Yes"
           cancelText="No"
         >
           <span style={{color: '#ff001c'}}>Delete</span>
         </Popconfirm>
       )}
    </span>
  ];
  
  
  return (
    <Comment
      actions={showActions && actions}
      author={<a>{name}</a>}
      avatar={
        <Link to={`/profile/${user}`}>
          <Avatar
            src={avatar}
            alt={name}
          />
        </Link>
      }
      content={
        <p>
          {text}
        </p>
      }
      datetime={
        <Tooltip title={moment(date).format('YYYY/MM/DD')}>
          <span>{moment(date).fromNow()}</span>
        </Tooltip>
      }
    />
  );
  
  
  
  return (
    <div className={[`post bg-white p-1 my-1 ${isHome ? 'home-item' : ''}`]}>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt=''/>
          <h4 className={isHome ? 'hide' : ''}>{name}</h4>
        </Link>
      </div>
      <div className="comment-box">
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
      
        {showActions && (
          <Fragment>
            <button
              // onClick={handleLike}
              type='button'
              className={classnames('btn btn-light like-btn', {
                on: hadLike
              })}
            >
              <i className='fas fa-thumbs-up'/>{' '}
              <span>{likes?.length > 0 && <span>{likes?.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down'/>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times'/>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
  mapStateToProps,
  {addLike, removeLike, deletePost}
)(PostItem);
