import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Recommendation from './Recommendation'

const Home = () => {


    return  (
        <Fragment>
        <h1 className='large text-primary'>My Posts</h1>
        <p>Here are the posts from login user</p>
        <h1 className='large text-primary'>News Feed</h1>
        <Recommendation></Recommendation>
        </Fragment>
    );
    };

    export default connect(
    )(Home);
