import React from 'react';

import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home'
import PasswordReset from './components/reset/PasswordReset';
import PasswordResetInfo from './components/reset/PasswordResetInfo';
import PasswordResetEmail from './components/reset/PasswordResetEmail';
import Profile from "./components/user/Profile";
import Logout from "./components/auth/Logout";
import ProfileEdit from './components/user/ProfileEdit';
import ProjectCreate from "./components/project/ProjectCreate";
import ProjectList from "./components/project/ProjectList";
import ProjectInfo from "./components/project/ProjectInfo";
import {Route} from 'react-router';
import ProjectEdit from "./components/project/ProjectEdit";


const Routes = () => {
    return (
        <Layout>
            <Route path="/home" component={Home}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/reset/email" component={PasswordResetEmail}/>
            <Route path="/reset/info" component={PasswordResetInfo}/>
            <Route path="/reset/password" component={PasswordReset}/>
            <Route path="/profile/info" component={Profile}/>
            <Route path="/profile/settings" component={ProfileEdit}/>
            <Route path="/project/create" component={ProjectCreate}/>
            <Route path="/projects" component={ProjectList}/>
            <Route path="/project/info/:id" component={ProjectInfo}/>
            <Route path="/project/edit/:id" component={ProjectEdit}/>
        </Layout>
    )
};

export default Routes;