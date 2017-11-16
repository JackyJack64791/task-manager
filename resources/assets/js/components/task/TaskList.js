import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Panel from "../Panel";
import TaskTab from "./TaskTab";


class TaskList extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    projectsRender() {
        return this.props.projects.map((key) => (<div>
            <ul className="list-group">
                <h4 className="h4">{key.title}</h4>
                {this.tasksRender(key.id)}
            </ul>
            <hr/>
        </div>))
    }

    tasksRender(id) {
        return this.props.tasks.map((key) => {
                if (key.project_id === id) return <TaskTab id={key.id} name={key.title} description={key.description}/>
            }
        )
    }

    render() {
        if (!this.props.tasks.length)
            return <Panel title="Tasks">
                <p>You haven't any tasks. You can <Link to="/task/create">create</Link> one
                </p>
            </Panel>;
        else return <Panel title="Tasks">
            {this.projectsRender()}
            <Link className="btn btn-primary" to='/task/create'>Create New Task</Link>
        </Panel>
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        tasks: state.task.tasks,
        projects: state.project.projects,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskList));

