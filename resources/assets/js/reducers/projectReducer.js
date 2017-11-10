import {
    GET_PROJECTS, GET_PROJECTS_ERROR, GET_PROJECTS_LOADING,
    PROJECT_CREATE, PROJECT_CREATE_ERROR, PROJECT_DELETE_ERROR
    ,
} from "../constants/actionTypes";

function projectReducer (state={projects:{}, isLoading:false, isError: false}, action) {

    switch(action.type)
    {
        case PROJECT_CREATE:
            return Object.assign({},state,{
               isError: false,
               isLoading: false,
            });
        case PROJECT_CREATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case PROJECT_DELETE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case GET_PROJECTS:
            return Object.assign({},state,{
                projects: action.payload,
                isError: false,
                isLoading: false,
            });
        case GET_PROJECTS_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });

        case GET_PROJECTS_ERROR:
            return Object.assign({},state,{
                isError:true,
                isLoading:false,
                error:action.payload
            });
        default:
            return state;
    }
}

export default projectReducer;