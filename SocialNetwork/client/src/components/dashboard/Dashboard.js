import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import {Form, Input, Upload, Button, PageHeader, message, Tabs, Popconfirm, Alert} from "antd";
import {deleteAccount, getCurrentProfile} from '../../actions/profile';
import {SettingOutlined,DeleteOutlined, MailOutlined,LockOutlined } from '@ant-design/icons'
import MyPosts from "../home/Myposts";
import Recommendation from "../home/Recommendation";
import PsychologicalCounseling from "../home/Counseling";
import EditProfile from "../profile-forms/EditProfile";
import Profile from "../profile/Profile";

const TabPane = Tabs.TabPane

const Dashboard = ({
                     getCurrentProfile,
                     deleteAccount,
                     auth: {user},
                     profile: {profile, loading}
                   }) => {
  
  const [defaultTab, setDefaultTab] = useState('MyPosts');
  
  const handleDeleteAccount = ()=>{
    deleteAccount().then(res=>{
    
    })
  }
  
  useEffect(() => {
    getCurrentProfile().then(res=>{
    
    });
  }, [getCurrentProfile]);
  
  return loading && !profile ? (
    <Spinner/>
  ) : (
    <Fragment>
      <PageHeader
        ghost={false}
        title={
           <div><SettingOutlined />User Settings</div>
        }
      >
      </PageHeader>
      <div className="settings-content">
        {
          profile !== undefined && profile !== null ?(
            <Fragment>
              <Tabs type="card">
                <TabPane tab="Profile" key="Profile">
                  <Profile />
                </TabPane>
                <TabPane tab="Edit Profile" key="EditProfile">
                  <EditProfile />
                </TabPane>
                <TabPane tab="Add Experience" key="AddExperience">
                  <AddExperience experience={profile.experience}/>
                </TabPane>
                <TabPane tab="Add Education" key="AddEducation">
                  <AddEducation education={profile.education}/>
                </TabPane>
              </Tabs>
              {/*<DashboardActions/>*/}
              <Popconfirm
                title="Are you sure delete your account?"
                onConfirm={handleDeleteAccount}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon={<DeleteOutlined />}>Delete My Account</Button>
              </Popconfirm>
              
              {/*<div className='my-2'>*/}
              {/*  <button className='btn btn-danger' onClick={() => deleteAccount()}>*/}
              {/*    <i className='fas fa-user-minus'/> */}
              {/*  </button>*/}
              {/*</div>*/}
            </Fragment>
          ) : (
            <Fragment>
              <Alert message="You have not yet setup a profile, please add some info" />
              <Link to='/edit-profile?type=edit'>
                <Button type="success">Create Profile</Button>
              </Link>
            </Fragment>
          )}
      </div>
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
