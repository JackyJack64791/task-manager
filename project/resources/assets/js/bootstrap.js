import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from 'redux-thunk'
import {AUTH_USER} from './constants/actionTypes';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const Store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');

if(token){
    Store.dispatch({type:AUTH_USER});
}
export default Store;