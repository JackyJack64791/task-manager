/////////////////////////////////////////////////////
//-------------------teamReducer-------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    GET_TEAMS, GET_TEAMS_ERROR, GET_TEAMS_LOADING, TEAM_CREATE, TEAM_CREATE_ERROR, TEAM_CREATE_LOADING, TEAM_DELETE,
    TEAM_DELETE_ERROR,
    TEAM_DELETE_LOADING,
    TEAM_INVITE, TEAM_INVITE_ERROR,
    TEAM_INVITE_LOADING,
    TEAM_JOIN, TEAM_JOIN_ERROR, TEAM_JOIN_LOADING,
    TEAM_UPDATE, TEAM_UPDATE_ERROR, TEAM_UPDATE_LOADING
} from "../constants/teamConstants";
const ROOT_URL = location.protocol + '//' + location.host;

export function teamCreate(team, redirect) {
    return function (dispatch) {
        dispatch(teamCreateLoading());
        axios.post(ROOT_URL + '/api/team/create',
            team,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(teamCreateSuccess());
                dispatch(getTeams());
                redirect();
            })
            .catch(response => dispatch(teamCreateError(response.data.error)));
    }
}

export function teamUpdate(team, redirect) {
    return function (dispatch) {
        dispatch(teamUpdateLoading());
        axios.put(`${ROOT_URL}/api/team/update/${team.id}`,
            team,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response => {
                dispatch(teamUpdateSuccess());
                dispatch(getTeams());
                redirect();
            })
            .catch(response => dispatch(teamUpdateError("Error")));
    }
}

export function getTeams(token = localStorage.getItem('token')) {
    return function (dispatch) {
        dispatch(getTeamsLoading());
        axios.get(ROOT_URL + '/api/teams',
            {headers: {Authorization: "Bearer " + token}}
        )
            .then(response => {
                dispatch(getTeamsSuccess(response.data));
            })
            .catch(response => dispatch(getTeamsError("Войдите в систему")));
    }
}

export function teamDelete(id) {
    return function (dispatch) {
        dispatch(teamDeleteLoading());
        axios.delete(`${ROOT_URL}/api/team/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        )
            .then(response => {
                dispatch(teamDeleteSuccess());
                dispatch(getTeams());
            })
            .catch(response => dispatch(teamDeleteError("You are not logged in")))
    }
}
//#SUCCESS
export function teamCreateSuccess() {
    return {type: TEAM_CREATE}
}

export function teamUpdateSuccess() {
    return {type: TEAM_UPDATE}
}

export function getTeamsSuccess(teams) {
    return {
        type: GET_TEAMS,
        payload: teams
    }
}

export function teamDeleteSuccess() {
    return {type: TEAM_DELETE}
}

export function teamInviteSuccess() {
    return {type: TEAM_INVITE}
}

export function teamJoinSuccess() {
    return {type: TEAM_JOIN}
}



//#LOADING
export function teamCreateLoading() {
    return {type: TEAM_CREATE_LOADING}
}

export function teamUpdateLoading() {
    return {type: TEAM_UPDATE_LOADING}
}

export function getTeamsLoading() {
    return {type: GET_TEAMS_LOADING}
}

export function teamDeleteLoading() {
    return {type: TEAM_DELETE_LOADING}
}

export function teamInviteLoading() {
    return {type: TEAM_INVITE_LOADING}
}

export function teamJoinLoading() {
    return {type: TEAM_JOIN_LOADING}
}

//#ERROR
export function teamCreateError(error) {
    return {
        type: TEAM_CREATE_ERROR,
        payload: error,
    }
}

export function teamUpdateError(error) {
    return {
        type: TEAM_UPDATE_ERROR,
        payload: error,
    }
}

export function getTeamsError(error) {
    return {
        type: GET_TEAMS_ERROR,
        payload: error,
    }
}

export function teamDeleteError(error) {
    return {
        type: TEAM_DELETE_ERROR,
        payload: error,
    }
}

export function teamInviteError(error) {
    return {
        type: TEAM_INVITE_ERROR,
        payload: error,
    }
}

export function teamJoinError(error) {
    return {
        type: TEAM_JOIN_ERROR,
        payload: error,
    }
}