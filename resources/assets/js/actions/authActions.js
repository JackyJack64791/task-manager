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
import {getTasks, getTasksLoading} from "./taskActions";
import {getTeams, getTeamsLoading} from "./teamActions";
import {getSkills, getSkillsLoading} from "./skillActions";
import {LOGIN_TEAM, LOGIN_TEAM_ERROR, LOGIN_TEAM_LOADING} from "../constants";

const ROOT_URL = location.protocol + '//' + location.host;

export function authUser(user, redirect) {
    return function (dispatch) {
        dispatch(authLoading());
        // dispatch(getUsersLoading());
        // dispatch(getProjectsLoading());
        // dispatch(getTasksLoading());
        dispatch(getTeamsLoading());
        // dispatch(getSkillsLoading());
        axios.post(ROOT_URL + '/api/login', user)
            .then(response => {
                dispatch({type: LOGIN});
                localStorage.setItem('token', response.data.token);
                dispatch(userInfo(response.data.token));
                // dispatch(getUsers(response.data.token));
                // dispatch(getProjects(response.data.token));
                // dispatch(getTasks(response.data.token));
                dispatch(getTeams(response.data.token));
                // if(localStorage.getItem('team')) dispatch(loginTeam(localStorage.getItem('team')));
                // dispatch(getSkills(response.data.token));
                redirect();
            });
            // .catch((response) => {
                // if(localStorage.getItem('token')) dispatch(logoutUser());
                // else dispatch(authError("Неправильные данные для входа, попробуйте снова"));
                // console.log(response);
            // })
            // .catch((response) => {
            //     dispatch(getUsersError(response.response.data.errors[Object.keys(response.response.data.errors)[0]]));
            // })
            // .catch((response) => {
            //     dispatch(getProjectsError(response.response.data.errors[Object.keys(response.response.data.errors)[0]]));
            // })
    }
}
export function loginTeam(team, redirect) {
    return function (dispatch) {
        dispatch(loginTeamLoading());
        dispatch(getUsersLoading());
        dispatch(getProjectsLoading());
        // axios.post(ROOT_URL + '/api/login', user)
        //     .then(response => {
        //         dispatch({type: LOGIN});
        //         localStorage.setItem('token', response.data.token);
                // dispatch(userInfo(response.data.token));
                localStorage.setItem('team',team);
                dispatch(loginTeamSuccess(team));
                dispatch(getUsers(team,localStorage.getItem('token')));
                dispatch(getProjects(team,localStorage.getItem('token')));
                dispatch(getTasks(team,localStorage.getItem('token')));
                // dispatch(getTeams(response.data.token));
                dispatch(getSkills(localStorage.getItem('token')));
                redirect();
            // })
            // .catch((response) => {
                // if(localStorage.getItem('token')) dispatch(logoutUser());
                // dispatch(loginTeamError("Выберите другую команду"));
                // console.log(response);
            // })
        // .catch((response) => {
        //     dispatch(getUsersError(response.response.data.errors[Object.keys(response.response.data.errors)[0]]));
        // })
        // .catch((response) => {
        //     dispatch(getProjectsError(response.response.data.errors[Object.keys(response.response.data.errors)[0]]));
        // })
    }
}
export function registerUser(user, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/register', user)
            .then(response => {
                //localStorage.setItem('token', response.data.token);
                dispatch(authUser(user, redirect));
            })
            .catch(response => dispatch(
                authError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])
                ));

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
            .catch(response => dispatch(authError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
    }
}

export function resetSendEmail(email, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/reset/email', {email: email})
            .then(response => {
                dispatch({type: RESET_SEND_MAIL});
                redirect();
            })
            .catch(response => dispatch(resetSendEmailError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])))
    }
}

export function resetPassword(credentials, token, redirect) {
    return function (dispatch) {
        axios.post(ROOT_URL + '/api/reset/password?' + token, credentials)
            .then(response => {
                dispatch({type: RESET_PASSWORD});
                redirect();
            })
            .catch(response => dispatch(resetPasswordError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])))
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
            .catch(response => dispatch(changePasswordError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])))
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

export function loginTeamSuccess(team)
{
    return {
        type: LOGIN_TEAM,
        payload: team
    }
}
export function loginTeamError(error) {
    return {
        type: LOGIN_TEAM_ERROR,
        payload: error
    }
}

export function loginTeamLoading() {
    return {type: LOGIN_TEAM_LOADING}
}

export function logoutUser(redirect) {
    return function (dispatch) {
        dispatch(logoutUserLoading());
        axios.post(ROOT_URL + '/api/logout',{}, {
            headers: {authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                dispatch(logoutUserSuccess());
                if(localStorage.getItem('token'))localStorage.removeItem('token');
                if(localStorage.getItem('team'))localStorage.removeItem('team');
                redirect();
            })
            .catch(response => dispatch(logoutUserError('test')))
    }
}

export function logoutUserSuccess()
{
    return {
        type: LOGOUT_USER,
    }
}
export function logoutUserError(error) {
    return {
        type: LOGIN_TEAM_ERROR,
        payload: error
    }
}

export function logoutUserLoading() {
    return {type: LOGIN_TEAM_LOADING}
}
