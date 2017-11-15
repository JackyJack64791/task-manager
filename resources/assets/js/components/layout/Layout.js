import React, {Component} from 'react';
import Header from './Header';
import * as actions from '../../actions/actions';
import {connect} from 'react-redux';

class Layout extends Component {
    componentDidMount() {
        if (this.props.authenticated) {
            if(!this.props.getSuccessInfo && !this.props.isLoadingUsers) this.props.userInfo();
            if(!this.props.getSuccessUsers && !this.props.isLoadingUsers) this.props.getUsers();
             if(!this.props.getSuccessProjects && !this.props.isLoadingProject) this.props.getProjects();
        }
    }

    render() {
        if (this.props.authenticated) {
            let projects;
            let users;
            let user;
            console.log(
                `getSuccessInfo - ${this.props.getSuccessInfo},
                 getSuccessProjects - ${this.props.getSuccessProjects},
                 getSuccessUsers - ${this.props.getSuccessUsers},
                 isLoadingProject - ${this.props.isLoadingProject},
                 isLoadingUsers - ${this.props.isLoadingUsers},
                 `
            );
            if (this.props.getSuccessInfo && this.props.getSuccessProjects && this.props.getSuccessUsers && !this.props.isLoadingProject && !this.props.isLoadingUsers) {
                user = this.props.user;
                projects = this.props.projects;
                users = this.props.users;
            }
            else return <p>Loading...</p>;
            return (user && projects && users &&
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
        isLoadingProject: state.project.isLoading,
        isLoadingUsers: state.user.isLoading,
        getSuccessProjects: state.project.getSuccess,
        getSuccessUsers: state.user.usersSuccess,
        getSuccessInfo: state.user.infoSuccess,
    }
}


export default connect(mapStateToProps, actions)(Layout);