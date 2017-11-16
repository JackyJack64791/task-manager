import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";

class ProjectInfo extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.infoSuccess) this.props.userInfo();
        if (!this.props.getSuccess) this.props.getProjects();
        if (!this.props.usersSuccess) this.props.getUsers();
    }

    filterProject(project) {
        return (({title, customer_id, manager_id, deadline, description, specification}) => ({
            title,
            customer_id,
            manager_id,
            deadline,
            description,
            specification
        }))(project)
    }

    getPropertyNames() {
        return ["Title", "Customer", "Project Manager", "Deadline", "Description", "Specification"];
    }

    projectTab(id) {
        let project = this.filterProject(
            this.props.projects.find(item => item.id == id));
        project.customer_id = this.props.users.find(item => item.id === project.customer_id).full_name;
        project.manager_id = this.props.user.full_name + "(you)";
        console.log(project);
        let names = this.getPropertyNames();
        return Object.keys(project).map((key, i) => {
                return <InfoProperty style="list" name={names[i]} value={project[key]}/>
            }
        )
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Panel title="Project Info">
            <ul className="list-group">
                {this.projectTab(id)}
            </ul>
            <div className="col-md-8 col-md-offset-4">
                <Link to={"/project/edit/" + id} className="btn btn-primary">
                    Edit Project
                </Link>
                <Link to={"/projects"} className="btn btn-default">
                    Back To Projects
                </Link>
            </div>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        authenticated: state.auth.authenticated,
        infoSuccess: state.user.infoSuccess,
        usersSuccess: state.user.usersSuccess,
        projects: state.project.projects,
        isLoading: state.project.isLoading,
        isError: state.project.isError,
        getSuccess: state.project.getSuccess,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectInfo));

