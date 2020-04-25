import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRecommendation} from '../../actions/home';
import PostItem from '../posts/PostItem';
import {Alert, message, Spin} from "antd";
import {SyncOutlined} from '@ant-design/icons'

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Recommendation = ({getRecommendation, recommendation: {recommendation}}) => {
  const [loadingImg, setLoadingImg] = useState(true);
  const [loadingRec, setLoadingRec] = useState(true);
  const [imgs, setImgs] = useState([]);
  const [refresh, setRefresh] = useState('');
  useEffect(() => {
    fetchSimiliar()
  }, [getRecommendation]);
  
  const openImageBox = (evt, obj)=>{
    window.open(obj.photo.hostpageurl, '_blank')
  }
  const fetchSimiliar = ()=>{
    setRefresh('similiar')
    getRecommendation().then(()=>{
      message.success('Similiar posts fetched successfully!')
    }).catch(()=>{
      message.error('Fail to fetch similiar posts!')
    }).finally(()=>{
      setLoadingRec(false);
      setRefresh('')
    })
  }
  
  
  return  (
    <Fragment>
      {
        <div>
          <div className="gallery">
            <div className="recommendation">
              <Alert message={
                <div style={{display: 'flex'}}>
                  Similiar posts
                  <SyncOutlined spin={refresh === 'similiar'} className="refresh" style={{ color: '#52c41a' }}
                                onClick={fetchSimiliar}/>
                </div>
              }/>
              {loadingRec && <Spin size={"large"}/>}
              {!loadingRec &&
              <div className='recommendation'>
                {recommendation && shuffle(recommendation) && recommendation.map(post => {
                  if (post.text) {
                    const wordArr = post.text.split(' ');
                    if (wordArr.length > 50) {
                      post.text = wordArr.splice(0, 50).join(' ') + " ...";
                    }
                  }
                  return (
                    <PostItem key={post._id} post={post} isHome={true}/>
                  )
              })}
              </div>}
            </div>
          </div>
        </div>
      }
    
    </Fragment>
  );
};

Recommendation.propTypes = {
  getRecommendation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recommendation: state.home
});

export default connect(mapStateToProps, {getRecommendation})(Recommendation);
