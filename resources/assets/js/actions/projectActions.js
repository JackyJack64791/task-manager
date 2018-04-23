/////////////////////////////////////////////////////
//-----------------projectReducer------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    GET_PROJECTS, GET_PROJECTS_ERROR, GET_PROJECTS_LOADING, PROJECT_CREATE, PROJECT_CREATE_ERROR,
    PROJECT_CREATE_LOADING, PROJECT_DELETE, PROJECT_DELETE_ERROR, PROJECT_DELETE_LOADING, PROJECT_UPDATE,
    PROJECT_UPDATE_ERROR,
    PROJECT_UPDATE_LOADING
} from "../constants/projectConstants";

const ROOT_URL = location.protocol + '//' + location.host;

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

export function projectUpdate(project, redirect) {
    return function (dispatch) {
        dispatch(projectUpdateLoading());
        axios.put(`${ROOT_URL}/api/project/update/${project.id}`,
            project,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response => {
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

export function projectAddSuccess() {
    return {type: PROJECT_CREATE}
}

export function projectAddLoading() {
    return {type: PROJECT_CREATE_LOADING}
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