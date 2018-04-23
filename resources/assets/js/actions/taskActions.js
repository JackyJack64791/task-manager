/////////////////////////////////////////////////////
//-------------------taskReducer-------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    GET_TASKS, GET_TASKS_ERROR, GET_TASKS_LOADING, TASK_CREATE, TASK_CREATE_ERROR, TASK_CREATE_LOADING, TASK_DELETE,
    TASK_DELETE_ERROR,
    TASK_DELETE_LOADING,
    TASK_UPDATE, TASK_UPDATE_ERROR,
    TASK_UPDATE_LOADING
} from "../constants/taskConstants";
const ROOT_URL = location.protocol + '//' + location.host;

export function taskCreate(task, redirect) {
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

export function taskUpdate(task, redirect) {
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

export function getTasks(token = localStorage.getItem('token')) {
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

export function taskDelete(id) {
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

export function taskCreateSuccess() {
    return {type: TASK_CREATE}
}

export function taskUpdateSuccess() {
    return {type: TASK_UPDATE}
}

export function getTasksSuccess(tasks) {
    return {
        type: GET_TASKS,
        payload: tasks
    }
}

export function taskDeleteSuccess() {
    return {type: TASK_DELETE}
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