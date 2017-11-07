import {AUTH_ERROR, AUTH_USER, LOGOUT_USER, USER_INFO, USER_INFO_SUCCESS, USER_INFO_ERROR} from "../constants/actionTypes";

const token = localStorage.getItem('token');
function authReducer (state={authenticated: false, user:{}}, action) {
    switch(action.type)
    {
        case AUTH_USER:
            return Object.assign({},state,{
                authenticated: true,
            });
        case USER_INFO_SUCCESS:
            return Object.assign({},state,{
                user: action.payload,
            });
        case LOGOUT_USER:
            return Object.assign({},state,{
                authenticated: false,
            });
        default:
            return state;
    }
}

export default authReducer;