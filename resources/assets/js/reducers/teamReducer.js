import {
    GET_TEAMS, GET_TEAMS_ERROR, GET_TEAMS_LOADING,
    TEAM_CREATE, TEAM_CREATE_LOADING,TEAM_CREATE_ERROR, TEAM_DELETE, TEAM_DELETE_ERROR, TEAM_DELETE_LOADING, TEAM_UPDATE,
    TEAM_UPDATE_ERROR,
    TEAM_UPDATE_LOADING
} from "../constants/index";

const initialState = {teams:{}, isLoading:false, getSuccess:false, isError: false}

function teamReducer (state=initialState, action) {
    switch (action.type) {
        case TEAM_CREATE:
            return Object.assign({}, state, {
                isError: false,
                isLoading: false,
            });
        case TEAM_CREATE_LOADING:
            return Object.assign({}, state, {
                isError: false,
                isLoading: true,
            });
        case TEAM_CREATE_ERROR:
            return Object.assign({}, state, {
                error: action.payload,
                isError: true,
                isLoading: false,
            });
        case TEAM_UPDATE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case TEAM_UPDATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case TEAM_UPDATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case TEAM_DELETE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case TEAM_DELETE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case TEAM_DELETE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case GET_TEAMS:
            return Object.assign({},state,{
                teams: action.payload,
                isError: false,
                isLoading: false,
                getSuccess:true,
            });
        case GET_TEAMS_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
                getSuccess:false,
            });

        case GET_TEAMS_ERROR:
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
export default teamReducer;