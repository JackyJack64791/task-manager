import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import Store from './bootstrap';
import Routes from './routes';
require('./bootstrap');

const root = document.getElementById('index');
ReactDom.render(
    <Provider store={Store}>
        <Routes/>
    </Provider>,root
);
