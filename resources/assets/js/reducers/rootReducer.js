import { combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';
import jwt_decode from 'jwt-decode';

const appReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    project: projectReducer,
    task: taskReducer,
});
const token = localStorage.getItem('token');
const rootReducer = (state,action) => {
    if (action.type === 'LOGOUT_USER' || !token) {
        state = undefined;
        // localStorage.removeItem('token');
    }
    return appReducer(state,action);
};



export default rootReducer;