import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../src/components/Header/';
import Sidebar from '../../src/components/Sidebar/';

import Loading from 'react-loading-spinkit';

class Layout extends Component {

    componentDidMount() {
        if (this.props.authenticated) {
            if (!this.props.getSuccessInfo && !this.props.isLoadingUsers) this.props.userInfo();
            if (!this.props.getSuccessUsers && !this.props.isLoadingUsers) this.props.getUsers();
            if (!this.props.getSuccessProjects && !this.props.isLoadingProjects) this.props.getProjects();
            if (!this.props.getSuccessTasks && !this.props.isLoadingTasks) this.props.getTasks();
            if (!this.props.getSuccessTeams && !this.props.isLoadingTeams) this.props.getTeams();
            if (!this.props.getSuccessSkills && !this.props.isLoadingSkills) this.props.getSkills();
        }
    }

    render() {
        // return (
        if (this.props.authenticated) {
            let projects;
            let users;
            let user;
            let tasks;
            let teams;
            let skills;
            if (this.props.getSuccessInfo &&
                this.props.getSuccessProjects &&
                this.props.getSuccessUsers &&
                this.props.getSuccessTasks &&
                this.props.getSuccessTeams &&
                this.props.getSuccessSkills &&
                !this.props.isLoadingProjects &&
                !this.props.isLoadingUsers &&
                !this.props.isLoadingTasks &&
                !this.props.isLoadingSkills &&
                !this.props.isLoadingAuth &&
                !this.props.isLoadingTeams) {
                user = this.props.user;
                projects = this.props.projects;
                users = this.props.users;
                tasks = this.props.tasks;
                teams = this.props.teams;
                skills = this.props.skills;
            }
            else return <div className="app flex-row align-items-center">
                <div style={{ height: '100vh', width: '100vw' }}>
                    {/*<h1>Ошибка, попробуйте перезайти в систему</h1>*/}
                    <Loading show={true} fadeIn="full" color="#00bfff" />
                </div>
            </div>;
            return (user && projects && users && tasks && teams && skills &&
                <div>
                    <div className="app">
                        <Header/>
                        <div className="app-body">
                            <Sidebar {...this.props}/>

                            <main className="main">
                                {/*<Breadcrumb/>*/}
                                <Container fluid className="mt-5">
                                    {this.props.children}
                                </Container>
                            </main>
                            {/*<Aside/>*/}
                        </div>
                    </div>
                </div>
            )
        }
        else return <div>
            {/*<Header/>*/}
            {/*<div className="container">*/}
            {this.props.children}
            {/*</div>*/}
        </div>
        // <div className="app">
        //     <Header />
        //     <div className="app-body">
        //         <Sidebar {...this.props}/>
        //
        //         <main className="main">
        //             <Breadcrumb />
        //             <Container fluid>
        //                 {this.props.children}
        //             </Container>
        //         </main>
        //         <Aside />
        //     </div>
        // </div>
    // );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        authenticated: state.auth.authenticated,
        isLoadingAuth: state.auth.isLoading,
        user: state.user.user,
        users: state.user.users,
        projects: state.project.projects,
        tasks: state.task.tasks,
        teams: state.team.teams,
        skills: state.skill.skills,
        isLoadingProjects: state.project.isLoading,
        isLoadingTasks: state.task.isLoading,
        isLoadingUsers: state.user.isLoading,
        isLoadingTeams: state.team.isLoading,
        isLoadingSkills: state.skill.isLoading,
        getSuccessProjects: state.project.getSuccess,
        getSuccessUsers: state.user.usersSuccess,
        getSuccessInfo: state.user.infoSuccess,
        getSuccessTasks: state.task.getSuccess,
        getSuccessTeams: state.team.getSuccess,
        getSuccessSkills: state.skill.getSuccess,
    }
}


export default connect(mapStateToProps, actions)(Layout);