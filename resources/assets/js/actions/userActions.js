/////////////////////////////////////////////////////
//-----------------userReducer---------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    USER_INFO, USER_INFO_ERROR, USER_INFO_LOADING, USERS_GET, USERS_GET_ERROR,
    USERS_GET_LOADING
} from "../constants/userConstants";
const ROOT_URL = location.protocol + '//' + location.host;

export function userInfo(token = localStorage.getItem('token')) {
    return function (dispatch) {
        dispatch(userInfoLoading());
        axios.get(ROOT_URL + '/api/profile', {
            headers: {authorization: "Bearer " + token}
        })
            .then(response => {
                dispatch(userInfoSuccess(response.data.user),
                );
            })
            .catch(response => dispatch(userInfoError("You are not logged in")));
    }
}

export function getUsers(token = localStorage.getItem('token')) {
    return function (dispatch) {
        dispatch(getUsersLoading());
        axios.get(ROOT_URL + '/api/users', {
            headers: {authorization: "Bearer " + token}
        })
            .then(response => {
                dispatch(getUsersSuccess(response.data),
                );
            })
            .catch(response => dispatch(getUsersError("You are not logged in")));
    }
}

export function getUsersSuccess(users) {
    return {
        type: USERS_GET,
        payload: users
    }
}

export function getUsersLoading() {
    return {type: USERS_GET_LOADING}
}

export function getUsersError(error) {
    return {
        type: USERS_GET_ERROR,
        payload: error
    }
}

export function userInfoSuccess(user) {
    return {
        type: USER_INFO,
        payload: user
    }
}

export function userInfoLoading() {
    return {type: USER_INFO_LOADING}
}

export function userInfoError(error) {
    return {
        type: USER_INFO_ERROR,
        payload: error
    }
}