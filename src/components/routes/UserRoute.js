import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/*
    check if user is logged in
        => user shouldn't be able to open project pages if he isn't logged in
*/
const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route 
        { ...rest }
        /*dynamic content based on the authentification state*/
            render={props =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />} 
    />
);

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

//convert redux-state to props
function mapStateToProps(state){
    return{
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(UserRoute);