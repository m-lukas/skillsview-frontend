import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from "../types";

//return redux action
export default function user(state = {}, action = {}){
    switch(action.type){
        case USER_SIGNED_UP:
            return action.user;
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        default: 
            return state;
    }
}