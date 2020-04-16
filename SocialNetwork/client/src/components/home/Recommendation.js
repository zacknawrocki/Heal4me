import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRecommendation } from '../../actions/home';

const Recommendation = ({ getRecommendation, recommendation: { recommendation, loading } }) => {
    useEffect(() => {
      getRecommendation();
    }, [getRecommendation]);

    return loading ? (
        <Spinner></Spinner>
    ) : (
        <Fragment>
          	<div className='recommendation'>
				{recommendation.map(post => (
					post._id
				))}
        	</div>
        </Fragment>
    );
};

Recommendation.propTypes = {
	getRecommendation: PropTypes.func.isRequired,
	recommendation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	recommendation: state.recommendation
});

export default connect(mapStateToProps, { getRecommendation })(Recommendation);