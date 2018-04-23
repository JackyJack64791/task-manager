import {
    USER_INFO_ERROR, USER_INFO, USERS_GET, USERS_GET_ERROR, USERS_GET_LOADING,
    USER_INFO_LOADING
} from "../constants/index";

function userReducer(state={ user:{}, users: {}, usersSuccess:false, infoSuccess:false, isError:false, isLoading: false}, action){
    switch (action.type)
    {
        case USER_INFO:
            return Object.assign({},state,{
                user: action.payload,
                isError:false,
                isLoading: false,
                infoSuccess:true
            });
        case USER_INFO_LOADING:
            return Object.assign({},state,{
                isError:false,
                isLoading: true,
                infoSuccess:false
            });
        case USER_INFO_ERROR:
            return Object.assign({},state,{
               error:action.payload,
                isError:true,
                isLoading: false,
                infoSuccess:false
            });
        case USERS_GET:
            return Object.assign({},state,{
                users: action.payload,
                isError:false,
                isLoading: false,
                usersSuccess:true
            });
        case USERS_GET_LOADING:
            return Object.assign({},state,{
               isLoading: true,
               isError: false,
                usersSuccess:false
            });
        case USERS_GET_ERROR:
            return Object.assign({},state,{
                error:action.payload,
                isError:true,
                isLoading: false,
                usersSuccess:false
            });
        default:
            return state;
    }
}

export default userReducer;