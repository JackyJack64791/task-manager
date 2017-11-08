import {USER_INFO_SUCCESS} from "../constants/actionTypes";

function userReducer(state={ user:{}},action){
    switch (action.type)
    {
        case USER_INFO_SUCCESS:
            return Object.assign({},state,{
                user: action.payload,
            });
        default:
            return state;
    }
}

export default userReducer;