import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import {getProfileById} from '../../actions/profile';
import {Descriptions} from 'antd'

const Profile = ({
                   getProfileById,
                   profile: {profile, loading},
                   auth,
                   userId,
                   match={
                     params: {
                       id: ''
                     }
                   }
                 }) => {
  useEffect(() => {
    getProfileById(match.params.id || auth.user._id || localStorage.getItem('user_id'));
  }, [getProfileById, match.params.id]);
  
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner/>
      ) : (
        <Fragment>
          <Descriptions title="User Info" style={{zoom: 1.5}}>
            <Descriptions.Item label="UserName">{profile.user?.name}</Descriptions.Item>
            <Descriptions.Item label="Gender">{profile?.gender}</Descriptions.Item>
            <Descriptions.Item label="Age">{profile?.age}</Descriptions.Item>
          </Descriptions>
          <div className='profile-grid' style={{marginTop: '-40px'}}>
            {/*<ProfileTop profile={profile}/>*/}
            {/*<ProfileAbout profile={profile}/>*/}
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience?.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience record</h4>
              )}
            </div>
            
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education?.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education record</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {getProfileById}
)(Profile);
