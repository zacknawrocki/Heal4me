import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';


const Home = () => {


    return  (
        <Fragment>
        <h1 className='large text-primary'>My Posts</h1>
        <p>Here are the posts from login user</p>
        <h1 className='large text-primary'>News Feed</h1>
        <p>Here is the recommendation</p>
        </Fragment>
    );
    };

    export default connect(
    )(Home);
