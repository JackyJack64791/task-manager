import {USER_INFO_ERROR, USER_INFO, USERS_GET, USERS_GET_ERROR} from "../constants/actionTypes";

function userReducer(state={ user:{}, users: {}, isError:false},action){
    switch (action.type)
    {
        case USER_INFO:
            return Object.assign({},state,{
                user: action.payload,
                isError:false
            });
        case USER_INFO_ERROR:
            return Object.assign({},state,{
               error:action.payload,
                isError:true
            });
        case USERS_GET:
            return Object.assign({},state,{
                users: action.payload,
                isError:false
            });
        case USERS_GET_ERROR:
            return Object.assign({},state,{
                error:action.payload,
                isError:true
            });
        default:
            return state;
    }
}

export default userReducer;