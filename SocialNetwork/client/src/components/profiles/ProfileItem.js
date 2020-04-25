import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FiHeart} from 'react-icons/fi';
import {Card} from "antd";


const Meta = Card.Meta


const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    occupation,
    company,
    bio,
    location,
    hobbies
  }
}) => {
  return (
    <div className='profile-item'>
      <Card
        hoverable
        style={{ width: 280 }}
        cover={<img alt="avatar" src={avatar} />}
      >
        <Meta title={name} description={
          <p>
            {occupation} {company && <span> at {company}</span>}
          </p>
        } />
        <p>
          {bio}
        </p>
        {
          location && <span>location: {location}</span>
        }
        {/*<p className='my-1'>{location && <span>{location}</span>}</p>*/}
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
        <ul>
          {hobbies.slice(0, 5).map((hobby, index) => (
            <li key={index} className='text-primary'>
              <i><FiHeart /></i>{hobby}
            </li>
          ))}
        </ul>
      </Card>
      {/*<img src={avatar} alt='' className='round-img' />*/}
      {/*<div>*/}
      {/*  <h2>{}</h2>*/}
      
      
      {/*</div>*/}
     
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
