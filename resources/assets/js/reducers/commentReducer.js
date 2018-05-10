import {
    GET_COMMENTS, GET_COMMENTS_ERROR, GET_COMMENTS_LOADING,
    COMMENT_CREATE, COMMENT_CREATE_LOADING,COMMENT_CREATE_ERROR, COMMENT_DELETE, COMMENT_DELETE_ERROR, COMMENT_DELETE_LOADING, COMMENT_UPDATE,
    COMMENT_UPDATE_ERROR,
    COMMENT_UPDATE_LOADING
} from "../constants/index";

const initialState = {comments:{}, isLoading:false, getSuccess:false, isError: false}

function commentReducer (state=initialState, action) {
    switch (action.type) {
        case COMMENT_CREATE:
            return Object.assign({}, state, {
                isError: false,
                isLoading: false,
            });
        case COMMENT_CREATE_LOADING:
            return Object.assign({}, state, {
                isError: false,
                isLoading: true,
            });
        case COMMENT_CREATE_ERROR:
            return Object.assign({}, state, {
                error: action.payload,
                isError: true,
                isLoading: false,
            });
        case COMMENT_UPDATE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case COMMENT_UPDATE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case COMMENT_UPDATE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case COMMENT_DELETE:
            return Object.assign({},state,{
                isError: false,
                isLoading: false,
            });
        case COMMENT_DELETE_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
            });
        case COMMENT_DELETE_ERROR:
            return Object.assign({},state,{
                isError: true,
                isLoading: false,
                error: action.payload,
            });
        case GET_COMMENTS:
            return Object.assign({},state,{
                comments: action.payload,
                isError: false,
                isLoading: false,
                getSuccess:true,
            });
        case GET_COMMENTS_LOADING:
            return Object.assign({},state,{
                isError: false,
                isLoading: true,
                getSuccess:false,
            });

        case GET_COMMENTS_ERROR:
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
export default commentReducer;