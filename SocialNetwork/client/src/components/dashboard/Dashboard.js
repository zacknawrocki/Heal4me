import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {Form, Input, Upload, Button, PageHeader, message} from "antd";
import {deleteAccount, getCurrentProfile} from '../../actions/profile';
import {SettingOutlined,UserOutlined, MailOutlined,LockOutlined } from '@ant-design/icons'


const Dashboard = ({
                     getCurrentProfile,
                     deleteAccount,
                     auth: {user},
                     profile: {profile, loading}
                   }) => {
  
  useEffect(() => {
    getCurrentProfile().then(res=>{
    
    });
  }, [getCurrentProfile]);
  
  return loading && profile === null ? (
    <Spinner/>
  ) : (
    <Fragment>
      <PageHeader
        ghost={false}
        title={
           <div><SettingOutlined />User Settings</div>
        }
        subTitle={
          <span>  Welcome {user && user.name}</span>
        }
      >
      </PageHeader>
      {profile !== null && profile !== undefined ? (
        <Fragment>
          <DashboardActions/>
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'/> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {getCurrentProfile, deleteAccount}
)(Dashboard);
