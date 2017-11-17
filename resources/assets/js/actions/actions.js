import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    AUTH_ERROR, AUTH_USER, LOGOUT_USER, USER_INFO, USER_INFO_ERROR,
    USER_FILTER, AUTH_LOADING, RESET_SEND_MAIL, RESET_SEND_MAIL_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR,
    PROJECT_CREATE_ERROR, USERS_GET, USERS_GET_ERROR, PROJECT_CREATE, USERS_GET_LOADING, GET_PROJECTS,
    GET_PROJECTS_ERROR, GET_PROJECTS_LOADING, PROJECT_DELETE, PROJECT_DELETE_ERROR, PROJECT_CREATE_LOADING,
    PROJECT_UPDATE_LOADING, PROJECT_UPDATE_ERROR, PROJECT_UPDATE, PROJECT_DELETE_LOADING, TASK_DELETE_ERROR,
    TASK_CREATE_ERROR, TASK_UPDATE_ERROR, GET_TASKS_ERROR, TASK_CREATE_LOADING, TASK_UPDATE_LOADING, GET_TASKS_LOADING,
    TASK_DELETE_LOADING, TASK_CREATE, TASK_UPDATE, GET_TASKS, TASK_DELETE, USER_INFO_LOADING
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
                dispatch(userInfo(response.data.token));
                dispatch(getUsers(response.data.token));
                dispatch(getProjects(response.data.token));
                dispatch(getTasks(response.data.token));
                redirect();
            })
            .catch(() => {
                dispatch(authError("Wrong email or password"));
            })
            .catch(()=> {
                dispatch(getUsersError("Users are retards"));
            })
            .catch(()=> {
                dispatch(getProjectsError("Projects are too"));
            })
    }
}

export function registerUser(user, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/register', user)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch(authUser(user,redirect));
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

/////////////////////////////////////////////////////
//-----------------projectReducer------------------//
/////////////////////////////////////////////////////

export function projectCreate(project, redirect) {
    return function (dispatch) {
        dispatch(projectAddLoading());
        axios.post(ROOT_URL + '/api/project/create',
            project,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(projectAddSuccess());
                dispatch(getProjects());
                redirect();
            })
            .catch(response => dispatch(projectAddError("You are not logged in")));
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
            })
            .catch(response => dispatch(getProjectsError("You are not logged in")));
    }
}

export function projectUpdate(project,redirect) {
    return function (dispatch) {
        dispatch(projectUpdateLoading());
        axios.put(`${ROOT_URL}/api/project/update/${project.id}`,
            project,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response=>{
                dispatch(projectUpdateSuccess());
                dispatch(getProjects());
                redirect();
            })
            .catch(response => dispatch(projectUpdateError("Error")));
    }
}
export function projectDelete(id) {
    return function (dispatch) {
        dispatch(projectDeleteLoading());
        axios.delete(`${ROOT_URL}/api/project/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        )
            .then(response => {
                dispatch(projectDeleteSuccess());
                dispatch(getProjects());
            })
            .catch(response => dispatch(projectDeleteError("You are not logged in")))
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

export function projectUpdateSuccess() {
    return {type: PROJECT_UPDATE};
}
export function projectUpdateLoading() {
    return {type: PROJECT_UPDATE_LOADING}
}
export function projectUpdateError(error) {
    return {
        type: PROJECT_UPDATE_ERROR,
        payload: error,
    }
}

export function projectAddSuccess(){
    return {type:PROJECT_CREATE}
}
export function projectAddLoading(){
    return {type:PROJECT_CREATE_LOADING}
}
export function projectAddError(error) {
    return {
        type: PROJECT_CREATE_ERROR,
        payload: error,
    }
}

export function projectDeleteSuccess() {
    return {type: PROJECT_DELETE}
}
export function projectDeleteLoading() {
    return {type: PROJECT_DELETE_LOADING}
}
export function projectDeleteError(error) {
    return {
        type: PROJECT_DELETE_ERROR,
        payload: error,
    }
}

/////////////////////////////////////////////////////
//-------------------taskReducer-------------------//
/////////////////////////////////////////////////////

export function taskCreate(task, redirect){
    return function (dispatch) {
        dispatch(taskCreateLoading());
        axios.post(ROOT_URL + '/api/task/create',
            task,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(taskCreateSuccess());
                dispatch(getTasks());
                redirect();
            })
            .catch(response => dispatch(taskCreateError(response.data.error)));
    }
}

export function taskUpdate(task, redirect){
    return function (dispatch) {
        dispatch(taskUpdateLoading());
        axios.put(`${ROOT_URL}/api/task/update/${task.id}`,
            task,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response => {
                dispatch(taskUpdateSuccess());
                dispatch(getTasks());
                redirect();
            })
            .catch(response => dispatch(taskUpdateError("Error")));
    }
}

export function getTasks(token = localStorage.getItem('token')){
    return function (dispatch) {
        dispatch(getTasksLoading());
        axios.get(ROOT_URL + '/api/tasks',
            {headers: {Authorization: "Bearer " + token}}
        )
            .then(response => {
                dispatch(getTasksSuccess(response.data));
            })
            .catch(response => dispatch(getTasksError("You are not logged in")));
    }
}

export function taskDelete(id){
    return function (dispatch) {
        dispatch(taskDeleteLoading());
        axios.delete(`${ROOT_URL}/api/task/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        )
            .then(response => {
                dispatch(taskDeleteSuccess());
                dispatch(getTasks());
            })
            .catch(response => dispatch(taskDeleteError("You are not logged in")))
    }
}

export function taskCreateSuccess(){
    return {type:TASK_CREATE}
}
export function taskUpdateSuccess(){
    return {type:TASK_UPDATE}
}
export function getTasksSuccess(tasks){
    return {
        type:GET_TASKS,
        payload: tasks
    }
}
export function taskDeleteSuccess(){
    return {type:TASK_DELETE}
}
export function taskCreateLoading() {
    return {type: TASK_CREATE_LOADING}
}

export function taskUpdateLoading() {
    return {type: TASK_UPDATE_LOADING}
}

export function getTasksLoading() {
    return {type: GET_TASKS_LOADING}
}

export function taskDeleteLoading() {
    return {type: TASK_DELETE_LOADING}
}

export function taskCreateError(error) {
    return {
        type: TASK_CREATE_ERROR,
        payload: error,
    }
}

export function taskUpdateError(error) {
    return {
        type: TASK_UPDATE_ERROR,
        payload: error,
    }
}

export function getTasksError(error) {
    return {
        type: GET_TASKS_ERROR,
        payload: error,
    }
}

export function taskDeleteError(error) {
    return {
        type: TASK_DELETE_ERROR,
        payload: error,
    }
}