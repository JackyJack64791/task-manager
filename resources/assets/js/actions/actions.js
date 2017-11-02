import axios from 'axios';
import jwtdecode from 'jwt-decode';
import {AUTH_ERROR, AUTH_USER, LOGOUT_USER} from "../constants/actionTypes";

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
            alert("What a dummy");
                dispatch(authError("Required field is empty"));
            });
    }
}

export function registerUser(user) {
    return function (dispatch) {
        axios.post(ROOT_URL+'/api/register', user)
            .then(response => {
                dispatch({type:AUTH_USER});
                localStorage.setItem('token',response.data.token);
            })
            .catch(response =>dispatch(authError(response.dataerror)));

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