/////////////////////////////////////////////////////
//-----------------authReducer---------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, LOGIN, LOGIN_ERROR, LOGIN_LOADING, LOGOUT_USER, RESET_PASSWORD,
    RESET_PASSWORD_ERROR,
    RESET_SEND_MAIL, RESET_SEND_MAIL_ERROR
} from "../constants/authConstants";
import {getUsers, getUsersError, getUsersLoading, userInfo} from "./userActions";
import {getProjects, getProjectsError, getProjectsLoading} from "./projectActions";
import {getTasks} from "./taskActions";

const ROOT_URL = location.protocol + '//' + location.host;

export function authUser(user, redirect) {
    return function (dispatch) {
        dispatch(authLoading());
        dispatch(getUsersLoading());
        dispatch(getProjectsLoading());
        axios.post(ROOT_URL + '/api/login', user)
            .then(response => {
                dispatch({type: LOGIN});
                localStorage.setItem('token', response.data.token);
                dispatch(userInfo(response.data.token));
                dispatch(getUsers(response.data.token));
                dispatch(getProjects(response.data.token));
                dispatch(getTasks(response.data.token));
                redirect();
            })
            .catch(() => {
                dispatch(authError("Wrong email or password"));
            })
            .catch(() => {
                dispatch(getUsersError("Users are retards"));
            })
            .catch(() => {
                dispatch(getProjectsError("Projects are too"));
            })
    }
}

export function registerUser(user, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/register', user)
            .then(response => {
                //localStorage.setItem('token', response.data.token);
                dispatch(authUser(user, redirect));
            })
            .catch(response => dispatch(authError(response.data.error)));

    }

}

export function updateUser(user, redirect) {

    return function (dispatch) {
        axios.put(ROOT_URL + '/api/update', user, {
            headers: {authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                dispatch(userInfo());
                redirect();
            })
            .catch(response => dispatch(authError("Invalid data")));
    }
}

export function resetSendEmail(email, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/reset/email', {email: email})
            .then(response => {
                dispatch({type: RESET_SEND_MAIL});
                redirect();
            })
            .catch(response => dispatch(resetSendEmailError("Email doesn't exist")))
    }
}

export function resetPassword(credentials, token, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/reset/password?' + token, credentials)
            .then(response => {
                dispatch({type: RESET_PASSWORD});
                redirect();
            })
            .catch(response => dispatch(resetPasswordError(response.data.error)))
    }
}

export function changePassword(credentials, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/change/password', credentials,
            {
                headers: {authorization: "Bearer " + localStorage.getItem('token')}
            })
            .then(response => {
                dispatch(changePasswordSuccess());
                redirect();
            })
            .catch(response => dispatch(changePasswordError("Old password is wrong")))
    }
}

export function changePasswordSuccess() {
    return {type: CHANGE_PASSWORD}
}

export function changePasswordError(error) {
    return {
        type: CHANGE_PASSWORD_ERROR,
        payload: error,
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


export function authError(error) {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}

export function authLoading() {
    return {type: LOGIN_LOADING}
}

export function logoutUser() {
    localStorage.removeItem('token');
    return {type: LOGOUT_USER};
}