/////////////////////////////////////////////////////
//-----------------skillReducer------------------//
/////////////////////////////////////////////////////
import axios from 'axios';
import {
    GET_SKILLS, GET_SKILLS_ERROR, GET_SKILLS_LOADING, SKILL_CREATE, SKILL_CREATE_ERROR,
    SKILL_CREATE_LOADING, SKILL_DELETE, SKILL_DELETE_ERROR, SKILL_DELETE_LOADING, SKILL_UPDATE,
    SKILL_UPDATE_ERROR,
    SKILL_UPDATE_LOADING
} from "../constants/skillConstants";

const ROOT_URL = location.protocol + '//' + location.host;

export function skillCreate(skill, redirect) {
    return function (dispatch) {
        dispatch(skillAddLoading());
        axios.post(ROOT_URL + '/api/skill/create',
            skill,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}}
        )
            .then(response => {
                dispatch(skillAddSuccess());
                dispatch(getSkills());
                redirect();
            })
            .catch(response => dispatch(skillAddError("You are not logged in")));
    }
}

export function getSkills(token = localStorage.getItem('token')) {
    return function (dispatch) {
        dispatch(getSkillsLoading());
        axios.get(ROOT_URL + '/api/skills',
            {headers: {Authorization: "Bearer " + token}}
        )
            .then(response => {
                dispatch(getSkillsSuccess(response.data));
            })
            .catch(response => dispatch(
                // getSkillsError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])
                console.log(response)
            ));
    }
}

export function skillUpdate(skill, redirect) {
    return function (dispatch) {
        dispatch(skillUpdateLoading());
        axios.put(`${ROOT_URL}/api/skill/update/${skill.id}`,
            skill,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response => {
                dispatch(skillUpdateSuccess());
                dispatch(getSkills());
                redirect();
            })
            .catch(response => dispatch(skillUpdateError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])));
    }
}

export function skillDelete(id) {
    return function (dispatch) {
        dispatch(skillDeleteLoading());
        axios.delete(`${ROOT_URL}/api/skill/delete/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        )
            .then(response => {
                dispatch(skillDeleteSuccess());
                dispatch(getSkills());
            })
            .catch(response => dispatch(skillDeleteError(response.response.data.errors[Object.keys(response.response.data.errors)[0]])))
    }
}


export function getSkillsSuccess(skills) {
    return {
        type: GET_SKILLS,
        payload: skills,
    }
}

export function getSkillsLoading() {
    return {type: GET_SKILLS_LOADING}
}

export function getSkillsError(error) {
    return {
        type: GET_SKILLS_ERROR,
        payload: error
    }
}

export function skillUpdateSuccess() {
    return {type: SKILL_UPDATE};
}

export function skillUpdateLoading() {
    return {type: SKILL_UPDATE_LOADING}
}

export function skillUpdateError(error) {
    return {
        type: SKILL_UPDATE_ERROR,
        payload: error,
    }
}

export function skillAddSuccess() {
    return {type: SKILL_CREATE}
}

export function skillAddLoading() {
    return {type: SKILL_CREATE_LOADING}
}

export function skillAddError(error) {
    return {
        type: SKILL_CREATE_ERROR,
        payload: error,
    }
}

export function skillDeleteSuccess() {
    return {type: SKILL_DELETE}
}

export function skillDeleteLoading() {
    return {type: SKILL_DELETE_LOADING}
}

export function skillDeleteError(error) {
    return {
        type: SKILL_DELETE_ERROR,
        payload: error,
    }
}