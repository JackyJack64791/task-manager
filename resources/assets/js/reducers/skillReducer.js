import {
    GET_SKILLS, GET_SKILLS_ERROR, GET_SKILLS_LOADING,
    SKILL_CREATE, SKILL_CREATE_ERROR, SKILL_CREATE_LOADING,SKILL_DELETE, SKILL_DELETE_LOADING, SKILL_DELETE_ERROR, SKILL_UPDATE,
    SKILL_UPDATE_LOADING, SKILL_UPDATE_ERROR
    ,
} from "../constants/index";

function skillReducer (state={skills:{}, isLoading:false, getSuccess:false, isError: false}, action) {
    switch(action.type)
    {
        case SKILL_CREATE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case SKILL_CREATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case SKILL_CREATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case SKILL_UPDATE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case SKILL_UPDATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case SKILL_UPDATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case SKILL_DELETE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case SKILL_DELETE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case SKILL_DELETE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case GET_SKILLS:
            return Object.assign({},state,{
                skills: action.payload,
                isError: false,
                isLoading: false,
                getSuccess:true,
            });
        case GET_SKILLS_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
                getSuccess:false,
            });

        case GET_SKILLS_ERROR:
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

export default skillReducer;