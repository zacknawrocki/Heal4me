import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {Alert, Spin, message} from "antd";


import PostItem from '../posts/PostItem';
import {getMyPosts, } from '../../actions/post';

const MyPosts = ({getMyPosts, myposts, loading}) => {

  useEffect(() => {
    getMyPosts();
  }, []);
  
  return (
    <Fragment>
      {
        loading? (<Spin />) :(
          myposts&& myposts.length > 0 ? myposts.map(post => {
            return <PostItem key={post._id} post={post} isHome={true}/>
          })
          : <span>You don't have a post yet, do you want to <Link to="/posts">create one</Link>?</span>
        )
      }
    </Fragment>
  )
};

MyPosts.propTypes = {
  getMyPosts: PropTypes.func.isRequired,
  myposts: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  myposts: state.post.myposts,
  loading: state.post.loading
})
export default connect(mapStateToProps, {getMyPosts})(MyPosts);
