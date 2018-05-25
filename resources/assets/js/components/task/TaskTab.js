import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from "../Tab";
import {Button, Form} from "reactstrap";

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
    handleSubmitAccept(e) {
            e.preventDefault();
            this.props.taskChoose(this.props.id);
    }
    handleSubmitStatus(e) {
        e.preventDefault();
        let newStatus = this.state.status === "task_is_ready" ? "task_is_confirmed" :
            this.state.status === "task_is_performing" ? "task_is_testing" : "task_is_ready";

        this.props.taskStatus({id:this.props.id,status:newStatus});
    }
    deleteTask(){
        this.props.taskDelete(this.props.id);
    }
    render() {
        return <Tab deleteAction={this.deleteTask} linkEdit={`/task/edit/${this.props.id}`}>
            <h3><Link to={"/task/info/"+this.props.id}>{this.props.name}</Link></h3>
            <p>{this.props.description}</p>
            {this.props.user.roles.some(item => item.role === 'developer') && this.state.status=="new_task" ?
            <Form onSubmit={this.handleSubmitAccept}>
                <Button color="primary" type="submit">Принять задачу</Button>
            </Form> : ''}
            {this.props.user.roles.some(item => item.role === 'project_manager') && this.state.status=="task_is_ready" ?
                <Form onSubmit={this.handleSubmitStatus}>
                    <Button color="primary" type="submit">Задача готова</Button>
                </Form> : ''}
            {this.props.user.roles.some(item => item.role === 'tester') && (this.state.status=="task_is_performing" || this.state.status=="task_is_testing")?
                <Form onSubmit={this.handleSubmitStatus}>
                    <Button color="primary" type="submit">Начать тестирование</Button>
                </Form> : ''}
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

