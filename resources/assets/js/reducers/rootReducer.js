import { combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    form:formReducer,
});

export default rootReducer;