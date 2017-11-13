import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    AUTH_ERROR, AUTH_USER, LOGOUT_USER, USER_INFO, USER_INFO_ERROR,
    USER_FILTER, AUTH_LOADING, RESET_SEND_MAIL, RESET_SEND_MAIL_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR,
    PROJECT_CREATE_ERROR, USERS_GET, USERS_GET_ERROR, PROJECT_CREATE, USERS_GET_LOADING, GET_PROJECTS,
    GET_PROJECTS_ERROR, GET_PROJECTS_LOADING, PROJECT_DELETE, PROJECT_DELETE_ERROR
} from "../constants/actionTypes";

const ROOT_URL = 'http://localhost:8000';

/////////////////////////////////////////////////////
//-----------------authReducer---------------------//
/////////////////////////////////////////////////////

export function authUser(user, redirect) {
    return function (dispatch) {
        dispatch(authLoading());
        dispatch(getUsersLoading());
        dispatch(getProjectsLoading());
        axios.post(ROOT_URL + '/api/login', user)
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                dispatch(
                    userInfo(response.data.token),
                    getUsers(response.data.token),
                    getProjects(response.data.token),
                );
                redirect();
                // redirect()
            })
            .catch(() => {
                dispatch(authError("Wrong email or password"));
                dispatch(getUsersError("Users are retards"));
                dispatch(getProjectsError("Projects are too"));
            });
    }
}

export function registerUser(user, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/register', user)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch(authUser(user,redirect));
                //dispatch(userInfo(response.data.token));
                //redirect();
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
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token)
            })
            .then(response => {
                dispatch(userInfo(response.data.token));
                redirect();
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function resetSendEmail(email, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/reset/email', {email: email})
            .then(response => {
                dispatch({type: RESET_SEND_MAIL});
                redirect();
            })
            .catch(response => dispatch(resetSendEmailError(response.data.error)))
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

/////////////////////////////////////////////////////
//-----------------userReducer---------------------//
/////////////////////////////////////////////////////

export function userInfo(token = localStorage.getItem('token')) {
    console.log("userInfo");
    return function (dispatch) {
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
    console.log("getUsers");
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

export function userInfoError(error) {
    return {
        type: USER_INFO_ERROR,
        payload: error
    }
}

/////////////////////////////////////////////////////
//-----------------projectReducer------------------//
/////////////////////////////////////////////////////

export function projectCreate(project, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/project/create',
            project,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch({type: PROJECT_CREATE});
                dispatch(getProjects());
                redirect();
            })
            .catch(response => dispatch(projectAddError("You are not logged in")));
    }
}

export function projectDelete(id) {
    return function (dispatch) {
        axios.delete(`${ROOT_URL}/api/project/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        )
            .then(response => {
                dispatch({type: PROJECT_DELETE});
                dispatch(getProjects());
            })
            .catch(response => dispatch(projectDeleteError("You are not logged in")))
    }
}

export function getProjects(token = localStorage.getItem('token')) {

    return function (dispatch) {
        dispatch(getProjectsLoading());
        axios.get(ROOT_URL + '/api/projects',
            {headers: {Authorization: "Bearer " + token}}
        )
            .then(response => {
                dispatch(getProjectsSuccess(response.data));
                console.log("getProjects");
            })
            .catch(response => dispatch(getProjectsError("You are not logged in")));
    }
}

export function getProjectsSuccess(projects) {
    return {
        type: GET_PROJECTS,
        payload: projects,
    }
}

export function getProjectsLoading() {
    return {type: GET_PROJECTS_LOADING}
}

export function getProjectsError(error) {
    return {
        type: GET_PROJECTS_ERROR,
        payload: error
    }
}

export function projectAddError(error) {
    return {
        type: PROJECT_CREATE_ERROR,
        payload: error,
    }
}

export function projectDeleteError(error) {
    return {
        type: PROJECT_DELETE_ERROR,
        payload: error,
    }
}