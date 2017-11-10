import { combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    project: projectReducer,
});

export default rootReducer;