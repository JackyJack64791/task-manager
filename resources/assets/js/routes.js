import React from 'react';

import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home'
import PasswordReset from './components/auth/PasswordReset';
import Profile from "./components/user/Profile";
import Logout from "./components/auth/Logout";
import ProfileEdit from './components/user/ProfileEdit';
import {Route} from 'react-router';

const Routes = () => {
    return (
        <Layout>
            <Route path="/home" component={Home}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/password/reset" component={PasswordReset}/>
            <Route path="/profile/info" component={Profile}/>
            <Route path="/profile/settings" component={ProfileEdit}/>
        </Layout>
    )
};

export default Routes;