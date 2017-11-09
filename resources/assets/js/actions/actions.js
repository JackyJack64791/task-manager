import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    AUTH_ERROR, AUTH_USER, LOGOUT_USER, USER_INFO, USER_INFO_SUCCESS, USER_INFO_ERROR,
    USER_FILTER, AUTH_LOADING, RESET_SEND_MAIL, RESET_SEND_MAIL_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR
} from "../constants/actionTypes";

const ROOT_URL = 'http://localhost:8000';

export function authUser(user,redirect) {
    return function (dispatch) {
        dispatch(authLoading());
        axios.post(ROOT_URL + '/api/login', user)
            .then(response => {
                //if(!response.data.token) throw Error(response.statusText);
                dispatch({
                    type: AUTH_USER,
                    payload: response.data.token
                });
                localStorage.setItem('token', response.data.token);
                dispatch(userInfo(response.data.token));
                redirect()
            })
            .catch(() => {
                dispatch(authError("Wrong email or password"));
            });
    }
}

export function userInfo(token=localStorage.getItem('token')) {
    return function (dispatch) {
        axios.get(ROOT_URL + '/api/profile', {
            headers: {authorization: "Bearer " + token}//localStorage.getItem('token')}
        })
            .then(response => {
                dispatch(userInfoSuccess(response.data.user),
                );
            })
            .catch(response => dispatch(userInfoError("You are not logged in")));
    }
}

export function registerUser(user,redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/register', user)
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                dispatch(userInfo(response.data.token));
                redirect();
            })
            .catch(response => dispatch(authError(response.data.error)));

    }

}

export function updateUser(user,redirect) {

    return function (dispatch) {
        axios.put(ROOT_URL + '/api/update', user, {
            headers: {authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                dispatch(userInfo(response.data.token));
                redirect();
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function resetSendEmail(email,redirect)
{
    return function (dispatch) {
        axios.post(ROOT_URL+'/api/reset/email',{email: email})
            .then(response => {
                dispatch({type: RESET_SEND_MAIL});
                redirect();
            })
            .catch(response => dispatch(resetSendEmailError(response.data.error)))
    }
}
export function resetPassword(credentials,token,redirect)
{
    return function (dispatch) {
        axios.post(ROOT_URL+'/api/reset/password?'+token,credentials)
            .then(response => {
                dispatch({type: RESET_PASSWORD});
                redirect();
            })
            .catch(response => dispatch(resetPasswordError(response.data.error)))
    }
}

export function resetSendEmailError(error) {
    return {
        type: RESET_SEND_MAIL_ERROR,
        payload: error,
    }
}
export function resetPasswordError(error) {
    return {
        type: RESET_PASSWORD_ERROR,
        payload: error,
    }
}
export function userInfoSuccess(user) {
    return {
        type: USER_INFO_SUCCESS,
        payload: user
    }
}

export function userInfoError(error) {
    return {
        type: USER_INFO_ERROR,
        payload: error
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function authLoading() {
    return {type: AUTH_LOADING}
}
export function logoutUser() {
    localStorage.removeItem('token');
    return {type: LOGOUT_USER};
}