import {AUTH_USER,LOGOUT_USER} from "../constants/actionTypes";

const token = localStorage.getItem('token');
function authReducer (state={authenticated: !!localStorage.getItem('token')}, action) {
    switch(action.type)
    {
        case AUTH_USER:
            return Object.assign({},state,{
                authenticated: true,
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