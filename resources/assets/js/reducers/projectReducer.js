import {
    PROJECT_CREATE, PROJECT_CREATE_ERROR
    ,
} from "../constants/actionTypes";

function projectReducer (state={}, action) {

    switch(action.type)
    {
        case PROJECT_CREATE_ERROR:
            return Object.assign({},state,{
                error: action.payload,
            });
        default:
            return state;
    }
}

export default projectReducer;