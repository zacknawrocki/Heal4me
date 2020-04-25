import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/post';
import {Avatar, Comment, Popconfirm, Tooltip} from "antd";
import moment from "moment";

const CommentItem = ({
                       postId,
                       comment: {_id, text, name, avatar, user, date},
                       auth,
                       deleteComment
                     }) => {
    
    const actions = [
      <span key="comment-delete">
       {!auth.loading && user === auth.user._id && (
         <Popconfirm
           title="Are you sure delete this comment?"
           onConfirm={() => deleteComment(postId, _id)}
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
        actions={actions}
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
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt=''/>
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'/>
          </button>
        )}
      </div>
    </div>

  )
  
  
}
;

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {deleteComment}
)(CommentItem);
