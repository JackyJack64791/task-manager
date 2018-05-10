/////////////////////////////////////////////////////
//-----------------commentReducer------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    GET_COMMENTS, GET_COMMENTS_ERROR, GET_COMMENTS_LOADING, COMMENT_CREATE, COMMENT_CREATE_ERROR,
    COMMENT_CREATE_LOADING, COMMENT_DELETE, COMMENT_DELETE_ERROR, COMMENT_DELETE_LOADING, COMMENT_UPDATE,
    COMMENT_UPDATE_ERROR,
    COMMENT_UPDATE_LOADING
} from "../constants/commentConstants";

const ROOT_URL = location.protocol + '//' + location.host;

export function commentCreate(comment) {
    return function (dispatch) {
        dispatch(commentAddLoading());
        axios.post(ROOT_URL + '/api/comment/create',
            comment,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(commentAddSuccess());
                dispatch(getComments(comment.task_id));
                // redirect();
            })
            .catch(response => dispatch(commentAddError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
    }
}

export function getComments(id, token = localStorage.getItem('token')) {
    console.log("getComments",id);
    return function (dispatch) {
        dispatch(getCommentsLoading());
        axios.get(ROOT_URL + '/api/comments/'+id,
            {headers: {Authorization: "Bearer " + token}}
        )
            .then(response => {
                dispatch(getCommentsSuccess(response.data));
            })
            .catch(response => dispatch(
                // getCommentsError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])
                console.log(response)
            ));
    }
}

export function commentUpdate(comment, redirect) {
    return function (dispatch) {
        dispatch(commentUpdateLoading());
        axios.put(`${ROOT_URL}/api/comment/update/${comment.id}`,
            comment,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response => {
                dispatch(commentUpdateSuccess());
                dispatch(getComments());
                redirect();
            })
            .catch(response => dispatch(commentUpdateError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
    }
}

export function commentDelete(id) {
    return function (dispatch) {
        dispatch(commentDeleteLoading());
        axios.delete(`${ROOT_URL}/api/comment/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        )
            .then(response => {
                dispatch(commentDeleteSuccess());
                dispatch(getComments());
            })
            .catch(response => dispatch(commentDeleteError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])))
    }
}


export function getCommentsSuccess(comments) {
    return {
        type: GET_COMMENTS,
        payload: comments,
    }
}

export function getCommentsLoading() {
    return {type: GET_COMMENTS_LOADING}
}

export function getCommentsError(error) {
    return {
        type: GET_COMMENTS_ERROR,
        payload: error
    }
}

export function commentUpdateSuccess() {
    return {type: COMMENT_UPDATE};
}

export function commentUpdateLoading() {
    return {type: COMMENT_UPDATE_LOADING}
}

export function commentUpdateError(error) {
    return {
        type: COMMENT_UPDATE_ERROR,
        payload: error,
    }
}

export function commentAddSuccess() {
    return {type: COMMENT_CREATE}
}

export function commentAddLoading() {
    return {type: COMMENT_CREATE_LOADING}
}

export function commentAddError(error) {
    return {
        type: COMMENT_CREATE_ERROR,
        payload: error,
    }
}

export function commentDeleteSuccess() {
    return {type: COMMENT_DELETE}
}

export function commentDeleteLoading() {
    return {type: COMMENT_DELETE_LOADING}
}

export function commentDeleteError(error) {
    return {
        type: COMMENT_DELETE_ERROR,
        payload: error,
    }
}