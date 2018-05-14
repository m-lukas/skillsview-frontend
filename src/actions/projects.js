import { PROJECT_CREATED, USER_JOINED_PROJECT, USER_RECEIVED_DATA } from '../types';
import api from '../api';

//Update redux state after project creation
export const projectCreated = project => ({
    type: PROJECT_CREATED,
    project
});

//Update redux state after user joined project
export const projectJoined = project => ({
    type: USER_JOINED_PROJECT,
    project
});

//Update redux state after user requested user data
export const projectDataReceived = (project) => ({
    type: USER_RECEIVED_DATA,
    project
});

//create project (call api request)
export const createProject = (data, addition) => dispatch => 
    api.project.create(data, addition).then(project => {
        dispatch(projectCreated(project));
    });

//join project (call api request)
export const joinProject = data => dispatch => 
    api.project.join(data).then(project => {
        dispatch(projectJoined(project));
    });

//get project data (call api request)
export const getProjectData = data => dispatch => 
    api.project.get(data).then(project => {
        dispatch(projectDataReceived(project));
    });