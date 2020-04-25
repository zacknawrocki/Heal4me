import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading, user}, logout}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/home'>
          Home
        </Link>
      </li>
      
      <li>
        <Link to='/profiles'>
          Users
        </Link>
      </li>
      <li>
        <Link to='/contact'>
          Contacts
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          Posts
        </Link>
      </li>
      
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'/>{' '}
          <span className='hide-sm'>Settings</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'/>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Users</Link>
      </li>
      <li>
        <Link to='/posts'>
          Posts
        </Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1 className="flex-center">
        <Link to='/'>
          Heal4me
        </Link>
        
        {
           user?.name? <div className="nav-user">
             <img className="nav-avatar" src={user.avatar}/>
             Welcome, <span style={{color: '#1296db'}}>{user.name}</span></div> : null
        }
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logout}
)(Navbar);
