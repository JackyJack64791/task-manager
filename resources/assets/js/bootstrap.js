import {createStore} from 'redux';
import rootReducer from "./reducers/rootReducer";
window.Laravel = {
    csrfToken: '{{csrfToken()}}'
};
const Store = createStore(rootReducer);

export default Store;