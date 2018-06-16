import {
    LOGIN_ERROR, LOGIN, LOGOUT_USER, LOGIN_LOADING, RESET_SEND_MAIL_ERROR,
} from "../constants/index";
import {LOGIN_TEAM} from "../constants";

function authReducer (state={authenticated: false,isLoading: false, isError: false,currentTeam: null}, action) {
    switch(action.type)
    {
        case LOGIN_ERROR:
            return Object.assign({},state,{
                isError:true,
               error:action.payload
            });
        case LOGIN:
            return Object.assign({},state,{
                authenticated: true,
                isLoading: false,
                isError: false,
            });
        case LOGIN_TEAM:
            return Object.assign({},state,{
                currentTeam: action.payload
            });
        case LOGIN_LOADING:
            return Object.assign({},state,{
                authenticated: false,
               isLoading: true,
                isError: false,
            });
        case LOGOUT_USER:
            return Object.assign({},state,{
                authenticated: false,
                user: null,
                isLoading: false,
                isError: false,
            });
        case RESET_SEND_MAIL_ERROR:
            return Object.assign({},state,{
               isError:false,
                error: action.payload
            });
        default:
            return state;
    }
}

export default authReducer;