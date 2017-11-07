import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {AUTH_ERROR, AUTH_USER, LOGOUT_USER, USER_INFO, USER_INFO_SUCCESS, USER_INFO_ERROR} from "../constants/actionTypes";

const ROOT_URL = 'http://localhost:8000';

export function authUser(user) {
    return function (dispatch) {
        axios.post(ROOT_URL+'/api/login',user)
            .then(response=>{
                dispatch({type:AUTH_USER,
                payload:response.data.token
                });
        localStorage.setItem('token',response.data.token);
            })
            .catch(()=>{
                dispatch(authError("Required field is empty"));
            });
    }
}

export function userInfo(){
    return dispatch => {
        axios.get(ROOT_URL+'/api/profile',{
            headers: {authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                dispatch(userInfoSuccess(response.data.user),
                );
           })
            .catch(response => dispatch(userInfoError("You are not logged in")));
    }
}

export function registerUser(user) {
    return function (dispatch) {
        axios.post(ROOT_URL+'/api/register', user)
            .then(response => {
                dispatch({type:AUTH_USER});
                localStorage.setItem('token',response.data.token);
            })
            .catch(response =>dispatch(authError(response.data.error)));

    }

}

export function userInfoSuccess(user){
    return {
        type: USER_INFO_SUCCESS,
        payload: user
    }
}
export function userInfoError(error){
    return {
        type: USER_INFO_ERROR,
        payload: error
    }
}
export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
export function logoutUser() {
    localStorage.removeItem('token');
    return {type: LOGOUT_USER};
}