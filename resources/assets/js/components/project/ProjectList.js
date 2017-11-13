import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ProjectTab from "./ProjectTab";

class ProjectList extends Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
         if(Object.keys(this.props.projects).length === 0 &&!this.props.getSuccess) this.props.getProjects();
    }

    projectsRender() {
        return this.props.projects.map((key) =>
            <ProjectTab id={key.id} name={key.title} description={key.description}/>
        )
    }

    render() {
        let projects;
        if (this.props.projects.length && !this.props.isLoading) {
            projects = this.props.projects;
        }
        else {
            if (!this.props.isLoading) {
                return <p>Looks like you don't have any projects. You can <Link to="/project/create">create</Link> one
                </p>
            } else return <p>Loading...</p>;
        }
        return (projects && <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Project List</div>
                        <div className="panel-body">
                            <ul className="list-group">
                                {this.projectsRender()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        isLoading: state.project.isLoading,
        isError: state.project.isError,
        getSuccess: state.project.getSuccess,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectList));

