import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./reducers/rootReducer";
import jwt_decode from 'jwt-decode';
import thunkMiddleware from 'redux-thunk'
import {AUTH_USER} from './constants/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
var Store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');

if(token){
    // let decodedToken = jwt_decode(token, {complete: true});
    // console.log(decodedToken);
    // var dateNow = new Date();
    // console.log(dateNow.getTime());
    // if(decodedToken.exp < dateNow.getTime()){
    //     Store = undefined;
    //     localStorage.removeItem('token');
    // }

    Store.dispatch({type:AUTH_USER});
}
export default Store;