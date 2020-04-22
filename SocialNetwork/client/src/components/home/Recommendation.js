import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getImages, getRecommendation, getGrade} from '../../actions/home';
import PostItem from '../posts/PostItem';
import Gallery from "react-photo-gallery";
import {Alert, Spin, message} from "antd";
import {SyncOutlined,UserOutlined, MailOutlined,LockOutlined } from '@ant-design/icons'

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
    getImages().then(res=>{
      setLoadingImg(false)
      const searchImgs = res.data.map(v=>{
        return {
          src: v.thumbnailUrl,
          width: 0.5,
          height: 0.5,
          hostpageurl: v.hostPageUrl
        }
      })
      setImgs(searchImgs)
    })
    getRecommendation().then(res=>{
      setLoadingRec(false);
    })
  }, [getRecommendation]);
  
  const openImageBox = (evt, obj)=>{
    window.open(obj.photo.hostpageurl, '_blank')
  }
  
  const refreshRecommendation = ()=>{
    setRefresh('recommendation')
  
    getImages().then(()=>{
      message.success('Recommendation refreshed successfully!')
    }).catch(()=>{
      message.error('Recommendation refresh failed!')
    }).finally(()=>{
      setRefresh('')
    });
  }
  const refreshSimiliar = ()=>{
    setRefresh('similiar')
    getRecommendation().then(()=>{
      message.success('Similiar posts refreshed successfully!')
    }).catch(()=>{
      message.error('Refresh failed!')
    }).finally(()=>{
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
                <div>Similiar posts</div>
              }/>
              <SyncOutlined spin={refresh === 'similiar'} className="refresh" style={{ color: '#52c41a' }}
                            onClick={refreshSimiliar}/>
              {loadingRec && <Spin size={"large"}/>}
              {!loadingRec &&
              <div className='recommendation'>
                {recommendation && shuffle(recommendation) && recommendation.map(post => {
                  const wordArr = post.text.split(' ');
                  if (wordArr.length > 50) {
                      post.text = wordArr.splice(0, 50).join(' ') + " ...";
                  }
                  return (
                    <PostItem key={post._id} post={post} isHome={true}/>
                  )
              })}
              </div>}
            </div>
  
            <div className="gallery-content">
              <Alert message={
                <div>
                  Recommendation
                </div>
              }/>
              <SyncOutlined spin={refresh === 'recommendation'} className="refresh" style={{  }}
                            onClick={refreshRecommendation}/>
              {loadingImg && <Spin size={"large"}/>}
              {!loadingImg && 
              <Gallery photos={imgs} onClick={openImageBox}/>}
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
