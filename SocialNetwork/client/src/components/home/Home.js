import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Recommendation from './Recommendation'
import MyPosts from './Myposts'

const Home = () => {


    return  (
        <Fragment>
        <h1 className='large text-primary'>My Posts</h1>
        <MyPosts></MyPosts>
        <h1 className='large text-primary'>News Feed</h1>
        <Recommendation></Recommendation>
        </Fragment>
    );
    };

    export default connect(
    )(Home);
