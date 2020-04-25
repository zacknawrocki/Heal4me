import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import {Alert, Button, PageHeader, Popconfirm, Tabs} from "antd";
import {deleteAccount, getCurrentProfile} from '../../actions/profile';
import {DeleteOutlined, SettingOutlined} from '@ant-design/icons'
import MyPosts from "../home/Myposts";
import EditProfile from "../profile-forms/EditProfile";
import Profile from "../profile/Profile";

const TabPane = Tabs.TabPane

const Dashboard = ({
                     getCurrentProfile,
                     deleteAccount,
                     auth: {user},
                     profile: {profile, loading}
                   }) => {
  
  const [defaultTab, setDefaultTab] = useState('Profile');
  
  const handleDeleteAccount = () => {
    deleteAccount().then(res => {
    
    })
  }
  
  useEffect(() => {
    getCurrentProfile()
  }, []);
  
  const canRender =  profile && profile._id
  
  const handleS = (val)=>{
    setDefaultTab(val)
    if (val === 'Profile') {
      getCurrentProfile()
    }
  }
  
  return loading && !profile ? (
    <Spinner/>
  ) : (
    <Fragment>
      <PageHeader
        ghost={false}
        title={
          <div><SettingOutlined/>User Settings</div>
        }
      >
      </PageHeader>
      <div className="settings-content">
            <Fragment>
              <Tabs type="card" activeKey={defaultTab} onChange={val=>handleS(val)}>
                <TabPane tab="Profile" key="Profile">
                  {
                    profile && profile._id? (
                      <Profile userId={user._id}/>
                    ): (
                      <Fragment>
                        <Alert message="You have not yet setup a profile, please add some info"/>
                        <br/>
                        <Button type="primary" onClick={()=>setDefaultTab('EditProfile')}>Create Profile</Button>
                      </Fragment>
                    )
                  }
                </TabPane>
                <TabPane tab="Edit Profile" key="EditProfile">
                  <EditProfile tab={defaultTab}/>
                </TabPane>
                <TabPane tab="Add Experience" key="AddExperience">
                  {
                    profile && profile._id? (
                      <AddExperience experience={profile.experience}/>
                    ): null
                  }
                </TabPane>
                <TabPane tab="Add Education" key="AddEducation">
                  {
                    profile && profile._id?(
                      <AddEducation education={profile.education}/>
                    ) :null
                  }
                </TabPane>
              </Tabs>
              {/*<DashboardActions/>*/}
              <Popconfirm
                title="Are you sure delete your account?"
                onConfirm={handleDeleteAccount}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon={<DeleteOutlined/>}>Delete My Account</Button>
              </Popconfirm>
            </Fragment>
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
