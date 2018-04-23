import {
    GET_TASKS, GET_TASKS_ERROR, GET_TASKS_LOADING,
    TASK_CREATE, TASK_CREATE_LOADING,TASK_CREATE_ERROR, TASK_DELETE, TASK_DELETE_ERROR, TASK_DELETE_LOADING, TASK_UPDATE,
    TASK_UPDATE_ERROR,
    TASK_UPDATE_LOADING
} from "../constants/index";


function taskReducer (state={tasks:{}, isLoading:false, getSuccess:false, isError: false}, action) {
    switch (action.type) {
        case TASK_CREATE:
            return Object.assign({}, state, {
                isError: false,
                isLoading: false,
            });
        case TASK_CREATE_LOADING:
            return Object.assign({}, state, {
                isError: false,
                isLoading: true,
            });
        case TASK_CREATE_ERROR:
            return Object.assign({}, state, {
                error: action.payload,
                isError: true,
                isLoading: false,
            });
        case TASK_UPDATE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case TASK_UPDATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case TASK_UPDATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case TASK_DELETE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case TASK_DELETE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case TASK_DELETE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case GET_TASKS:
            return Object.assign({},state,{
                tasks: action.payload,
                isError: false,
                isLoading: false,
                getSuccess:true,
            });
        case GET_TASKS_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
                getSuccess:false,
            });

        case GET_TASKS_ERROR:
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
export default taskReducer;