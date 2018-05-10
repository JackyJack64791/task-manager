import React from 'react';

import Layout from './components/layout/Layout';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard'
import PasswordReset from './components/reset/PasswordReset';
import PasswordResetInfo from './components/reset/PasswordResetInfo';
import PasswordResetEmail from './components/reset/PasswordResetEmail';
import Profile from "./components/user/Profile";
import Logout from "./components/auth/Logout";
import ProfileEdit from './components/user/ProfileEdit';
import ProjectCreate from "./components/project/ProjectCreate";
import ProjectList from "./components/project/ProjectList";
import ProjectInfo from "./components/project/ProjectInfo";
import {Route, Redirect, Switch} from 'react-router-dom';
import ProjectEdit from "./components/project/ProjectEdit";
import TaskCreate from "./components/task/TaskCreate";
import TaskList from "./components/task/TaskList";
import TaskInfo from "./components/task/TaskInfo";
import TaskEdit from "./components/task/TaskEdit";
import PasswordChange from "./components/user/PasswordChange";
import TeamEdit from "./components/team/TeamEdit";
import TeamInfo from "./components/team/TeamInfo";
import TeamList from "./components/team/TeamList";
import TeamCreate from "./components/team/TeamCreate";


const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/reset/email" component={PasswordResetEmail}/>
                <Route path="/reset/info" component={PasswordResetInfo}/>
                <Route path="/reset/password" component={PasswordReset}/>
                <Route path="/password/change" component={PasswordChange}/>
                <Route path="/profile/info" component={Profile}/>
                <Route path="/profile/settings" component={ProfileEdit}/>
                <Route path="/project/create" component={ProjectCreate}/>
                <Route path="/projects" component={ProjectList}/>
                <Route path="/project/info/:id" component={ProjectInfo}/>
                <Route path="/project/edit/:id" component={ProjectEdit}/>
                <Route path="/task/create" component={TaskCreate}/>
                <Route path="/tasks" component={TaskList}/>
                <Route path="/task/info/:id" component={TaskInfo}/>
                <Route path="/task/edit/:id" component={TaskEdit}/>
                <Route path="/team/create" component={TeamCreate}/>
                <Route path="/teams" component={TeamList}/>
                <Route path="/team/info/:id" component={TeamInfo}/>
                <Route path="/team/edit/:id" component={TeamEdit}/>
                <Redirect from="/" to="/dashboard"/>
            </Switch>
        </Layout>
    )
};

export default Routes;