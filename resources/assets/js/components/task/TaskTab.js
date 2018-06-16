import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from "../Tab";
import {Badge, Button, Form} from "reactstrap";

class TaskTab extends Component {
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleSubmitAccept = this.handleSubmitAccept.bind(this);
        this.handleSubmitStatus = this.handleSubmitStatus.bind(this);
        this.state = {
            status: this.props.status,
        }
    }

    getStatuses() {
        return {
            new_task: "Новая задача",
            task_is_performing: "Процесс выполнения",
            task_is_testing: "Задача тестируется",
            task_is_ready: "Задача реализована",
            task_is_confirmed: "Задача готова"
        };
    }
    deleteTask(){
        this.props.taskDelete(this.props.id);
    }
    render() {
        let statuses = this.getStatuses();
        return <Tab deleteAction={this.deleteTask} linkEdit={`/task/edit/${this.props.id}`}>
            <h3><Link to={"/task/info/"+this.props.id}>{this.props.name}</Link></h3>
            <p>{this.props.description}</p>
            <Badge style={{margin:2, fontSize: 1.2 +'em'}}>{statuses[this.state.status]}</Badge>

        </Tab>;
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        tasks: state.task.tasks,
        user: state.user.user,
        projects: state.project.projects,
        teams: state.team.teams,
    }
}


export default connect(mapStateToProps,actions)(TaskTab);

