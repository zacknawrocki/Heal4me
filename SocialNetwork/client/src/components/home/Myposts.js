import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Spin} from "antd";


import PostItem from '../posts/PostItem';
import {getMyPosts,} from '../../actions/post';

const MyPosts = ({getMyPosts, myposts, loading}) => {

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <Fragment>
      {
        !myposts || myposts === undefined||loading? (<Spin />) :(
          myposts&& myposts.length > 0 ? myposts.map(post => {
            const wordArr = post.text.split(' ');
            if (wordArr.length > 50) {
                post.text = wordArr.splice(0, 50).join(' ') + " ...";
            }
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
