import {USER_INFO_ERROR, USER_INFO_SUCCESS} from "../constants/actionTypes";

function userReducer(state={ user:{}},action){
    switch (action.type)
    {
        case USER_INFO_SUCCESS:
            return Object.assign({},state,{
                user: action.payload,
            });
        case USER_INFO_ERROR:
            return Object.assign({},state,{
               error:action.payload,
            });
        default:
            return state;
    }
}

export default userReducer;