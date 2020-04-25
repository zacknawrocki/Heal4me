import React, {createElement, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Avatar, Comment, Popconfirm, Tooltip} from 'antd';
import moment from "moment";
import {connect} from 'react-redux';
import {addLike, deletePost, removeLike} from '../../actions/post';
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from '@ant-design/icons';

const PostItem = ({
                    addLike,
                    removeLike,
                    deletePost,
                    auth,
                    isHome,
                    post: {_id, text, name, avatar, user, likes, comments, date},
                    showActions,
                  }) => {

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
    <span key="comment-basic-like" onClick={like}>
      <Tooltip title="Like">
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
        })}
      </Tooltip>
      <span className="comment-action">{likes?.length}</span>
    </span>,
    <span key="comment-basic-dislike" onClick={dislike}>
      <Tooltip title="Dislike">
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined, {
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
           title="Are you sure delete this post?"
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
