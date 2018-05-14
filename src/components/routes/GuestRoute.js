import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/*
    check if user isn't logged in
        => user shouldn't be able to open for example /login if he is already logged in
*/
const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route 
        { ...rest }
        /*dynamic content based on the authentification state*/
            render={props => 
                !isAuthenticated ? <Component {...props} /> : <Redirect to="/projects/myproject" />} 
    />
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

//convert redux-state to props
function mapStateToProps(state){
    return{
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(GuestRoute);