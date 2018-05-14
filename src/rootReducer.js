import { combineReducers } from 'redux';

import user from './reducers/user';
import project from './reducers/project';

//main reducer for redux
export default combineReducers({
    user,
    project
});