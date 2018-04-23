import {
    USER_INFO_ERROR, USER_INFO, USERS_GET, USERS_GET_ERROR, USERS_GET_LOADING,
    USER_INFO_LOADING
} from "../constants/index";

const initialState = {
    step: 1,

};
function registerFormReducer(state=initialState, action){
    switch (action.type)
    {
        case :
            return Object.assign({},state,{
                isError:true,
                error:action.payload
            });
        default:
            return state;
    }
}

export default registerFormReducer;