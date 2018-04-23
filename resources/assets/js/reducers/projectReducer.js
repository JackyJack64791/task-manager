import {
    GET_PROJECTS, GET_PROJECTS_ERROR, GET_PROJECTS_LOADING,
    PROJECT_CREATE, PROJECT_CREATE_ERROR, PROJECT_CREATE_LOADING,PROJECT_DELETE, PROJECT_DELETE_LOADING, PROJECT_DELETE_ERROR, PROJECT_UPDATE,
    PROJECT_UPDATE_LOADING, PROJECT_UPDATE_ERROR
    ,
} from "../constants/index";

function projectReducer (state={projects:{}, isLoading:false, getSuccess:false, isError: false}, action) {
    switch(action.type)
    {
        case PROJECT_CREATE:
            return Object.assign({},state,{
               isError: false,
               isLoading: false,
            });
        case PROJECT_CREATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case PROJECT_CREATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case PROJECT_UPDATE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case PROJECT_UPDATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case PROJECT_UPDATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case PROJECT_DELETE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case PROJECT_DELETE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
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
                getSuccess:true,
            });
        case GET_PROJECTS_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
                getSuccess:false,
            });

        case GET_PROJECTS_ERROR:
            return Object.assign({},state,{
                isError:true,
                isLoading:false,
                getSuccess:false,
                error:action.payload
            });
        default:
            return state;
    }
}

export default projectReducer;