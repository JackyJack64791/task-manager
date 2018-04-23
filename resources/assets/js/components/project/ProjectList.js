import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ProjectTab from "./ProjectTab";
import Panel from "../Panel";

class ProjectList extends Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
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
                return <Panel title="Проекты">
                    <p>Похоже, у вас нет ни одного проекта. Вы можете <Link to="/project/create">создать</Link> новый.
                </p>
                </Panel>
            } else return <p>Loading...</p>;
        }
        return (projects && <Panel title="Проекты">
            <ul className="list-group">
                {this.projectsRender()}
            </ul>
            <Link className="btn btn-primary" to='/project/create'>Создать новый проект</Link>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        isLoading: state.project.isLoading,
        getSuccess: state.project.getSuccess,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectList));

