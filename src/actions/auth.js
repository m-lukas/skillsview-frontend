import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from '../types';
import api from '../api';

//Update redux state after user signed up
export const userSignedUp = user => ({
    type: USER_SIGNED_UP,
    user
});

//Update redux state after user logged in
export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

//Update redux state after user logged out
export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

//login user (call api request, update localStorage)
export const login = credentials => dispatch => 
    api.user.login(credentials).then(user => {
        localStorage.skillboardJWT = user.token;
        dispatch(userLoggedIn(user));
    });

//logout user (call api request, update localStorage)
export const logout = () => dispatch => {
        localStorage.removeItem('skillboardJWT');
        dispatch(userLoggedOut());
    };

//signup user (call api request, update localStorage)
export const signup = credentials => dispatch => 
    api.user.signup(credentials).then(user => {
        localStorage.skillboardJWT = user.token;
        dispatch(userSignedUp(user));
    });