import React, {Component} from 'react';
import Header from './Header';
import * as actions from '../../actions/actions';
import {connect} from 'react-redux';

class Layout extends Component {
    componentDidMount() {
        if (this.props.authenticated) {
            if(!this.props.getSuccessInfo && !this.props.isLoadingUsers) this.props.userInfo();
            if(!this.props.getSuccessUsers && !this.props.isLoadingUsers) this.props.getUsers();
            if(!this.props.getSuccessProjects && !this.props.isLoadingProjects) this.props.getProjects();
            if(!this.props.getSuccessTasks && !this.props.isLoadingTasks) this.props.getTasks();
        }
    }

    render() {
        if (this.props.authenticated) {
            let projects;
            let users;
            let user;
            let tasks;
            if (this.props.getSuccessInfo && this.props.getSuccessProjects && this.props.getSuccessUsers && this.props.getSuccessTasks
                && !this.props.isLoadingProjects && !this.props.isLoadingUsers && !this.props.isLoadingTasks) {
                user = this.props.user;
                projects = this.props.projects;
                users = this.props.users;
                tasks = this.props.tasks;
            }
            else return <p>Loading...</p>;
            return (user && projects && users && tasks &&
                <div>
                    <Header/>
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            )
        }
        else return <div>
            <Header/>
            <div className="container">
                {this.props.children}
            </div>
        </div>
    }
}

    function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.user.user,
        users: state.user.users,
        projects: state.project.projects,
        tasks: state.task.tasks,
        isLoadingProjects: state.project.isLoading,
        isLoadingTasks: state.task.isLoading,
        isLoadingUsers: state.user.isLoading,
        getSuccessProjects: state.project.getSuccess,
        getSuccessUsers: state.user.usersSuccess,
        getSuccessInfo: state.user.infoSuccess,
        getSuccessTasks: state.task.getSuccess,
    }
}


export default connect(mapStateToProps, actions)(Layout);