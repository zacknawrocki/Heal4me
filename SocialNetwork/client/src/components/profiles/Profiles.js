import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profile';
import {message, PageHeader, Spin} from "antd";
import {SearchOutlined, UserOutlined} from '@ant-design/icons'
import service from "../../api";


const Profiles = ({ getProfiles }) => {
  const [loading, setLoading] = useState(true);
  const [profiles, setprofiles] = useState([]);
  
  const ss = () =>{
    setLoading(true)
    service('/api/profile').then(res=>{
      console.log(res);
      setprofiles(res.data||[])
      message.success('Users Loaded Successfully!')
    }).finally(()=>{
      setLoading(false)
    });
  }
  
  useEffect(() => {
    ss()
  }, [1]);
  
  return (
    <Fragment>
      <PageHeader
        ghost={false}
        title={
          <div><UserOutlined />Users</div>
        }
      />
      <div className="sub-title">
        <SearchOutlined style={{fontSize: '20px', color: '#1296db'}}/> Browse and connect with
        people all over the world
      </div>
      {
        loading ? (<Spin />) : (
          <div className='profiles'>
            {profiles?.length > 0 ? (
              profiles.map(profile => {
                if (profile.bio) {
                  const wordArr = profile.bio.split(' ');
                  if (wordArr.length > 50) {
                    profile.bio = wordArr.splice(0, 50).join(' ') + " ...";
                  }
                }
                return (
                  <ProfileItem key={profile._id} profile={profile} />
                )
              })
            ) : (
              <h4>No profiles found..</h4>
            )}
          </div>

        )
      }


    </Fragment>
  )

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <PageHeader
            ghost={false}
            title={
              <div><UserOutlined />Users</div>
            }
          />
          <div className="sub-title">
            <SearchOutlined style={{fontSize: '20px', color: '#1296db'}}/> Browse and connect with
            people all over the world
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
