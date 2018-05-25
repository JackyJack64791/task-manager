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
import {
    TASK_CHOOSE, TASK_CHOOSE_ERROR, TASK_CHOOSE_LOADING, TASK_STATUS, TASK_STATUS_ERROR,
    TASK_STATUS_LOADING
} from "../constants";
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
                dispatch(getTasks(localStorage.getItem('team')));
                redirect();
            })
            .catch(response => dispatch(taskCreateError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
    }
}

export function taskChoose(id) {
    return function (dispatch) {
        dispatch(taskCreateLoading());
        axios.put(ROOT_URL + '/api/task/choose/'+id,{},
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(taskChooseSuccess());
                dispatch(getTasks(localStorage.getItem('team')));
            })
            .catch(response => dispatch(taskChooseError(response.error)));
    }
}

export function taskStatus(request) {
    return function (dispatch) {
        dispatch(taskStatusLoading());
        axios.put(ROOT_URL + '/api/task/status/update',
            request,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(taskStatusSuccess());
                dispatch(getTasks(localStorage.getItem('team')));
                redirect();
            })
            .catch(response => dispatch(taskStatusError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
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
                dispatch(getTasks(localStorage.getItem('team')));
                redirect();
            })
            .catch(response => dispatch(taskUpdateError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
    }
}

export function getTasks(team = localStorage.getItem('team'), token = localStorage.getItem('token')) {
    return function (dispatch) {
        dispatch(getTasksLoading());
        axios.get(ROOT_URL + '/api/tasks/'+team,
            {headers: {Authorization: "Bearer " + token}}
        )
            .then(response => {
                dispatch(getTasksSuccess(response.data));
            })
            .catch(response => dispatch(
                // getTasksError(response.response.data.errors[Object.keys(response.response.data.errors)[0]]))
                console.log(response)
            ));
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
                dispatch(getTasks(localStorage.getItem('team')));
            })
            .catch(response => dispatch(taskDeleteError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])))
    }
}

export function taskCreateSuccess() {
    return {type: TASK_CREATE}
}

export function taskUpdateSuccess() {
    return {type: TASK_UPDATE}
}

export function taskChooseSuccess() {
    return {type: TASK_CHOOSE}
}

export function taskStatusSuccess() {
    return {type: TASK_STATUS}
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

export function taskChooseLoading() {
    return {type: TASK_CHOOSE_LOADING}
}

export function taskStatusLoading() {
    return {type: TASK_STATUS_LOADING}
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

export function taskStatusError(error) {
    return {
        type: TASK_STATUS_ERROR,
        payload: error,
    }
}

export function taskChooseError(error) {
    return {
        type: TASK_CHOOSE_ERROR,
        payload: error,
    }
}