import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";
import {Button, Col, Form, Row} from "reactstrap";
import CommentList from "./comments/CommentList";
import * as actions from '../../actions/index';

class TaskInfo extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        // if (!this.props.comments) this.props.getComments();
    }

    filterTask(project) {
        return (({author_id, project_id, title, description, priority, difficulty,status,completion_percent, hours_count, date_completion, performer_id,possible_performer_id, time_search}) => ({
            author_id,
            project_id,
            title,
            description,
            priority,
            difficulty,
            status,
            completion_percent,
            hours_count,
            date_completion,
            performer_id,
            possible_performer_id,
            time_search
        }))(project)
    }

    getPropertyNames() {
        return ["Автор", "Проект", "Название", "Описание", "Приоритет", "Сложность", "Статус", "Процент готовности", "Количество часов", "Дата завершения", "Исполнитель", "Возможный исполнитель", "Время на поиск(ч)"];
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
    projectTab(id) {
        let task = this.filterTask(
            this.props.tasks.find(item => item.id == id));
        if(task.author_id === this.props.user.id)
        task.author_id = this.props.user.full_name + "(you)";
        else
            task.author_id = this.props.user.full_name;
        task.project_id = this.props.projects.find(item => item.id === task.project_id).title;
        if(task.performer_id != null) task.performer_id = this.props.users.find(item => item.id === task.performer_id).full_name;
        if(task.possible_performer_id != null) task.possible_performer_id = this.props.users.find(item => item.id === task.possible_performer_id).full_name;
        let statuses = this.getStatuses();
        task.status = statuses[task.status];
        let names = this.getPropertyNames();
        return Object.keys(task).map((key, i) => {
                return <InfoProperty style="list" name={names[i]} value={task[key]}/>
            }
        )
    }
    constructor(props){
        super(props);
        let task = Object.assign(this.filterTask(
            this.props.tasks.find(item => item.id == this.props.match.params.id)));
        this.state = {
            task: task,
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmitAccept = this.handleSubmitAccept.bind(this);
        this.handleSubmitStatus = this.handleSubmitStatus.bind(this);
    }
    handleRedirect() {
        if (!this.props.isError) this.props.history.push("/tasks");
    }
    handleSubmitAccept(e) {
        e.preventDefault();
        this.props.taskChoose(this.props.match.params.id);
    }
    handleSubmitStatus(e) {
        e.preventDefault();

        let newStatus = this.state.task.status === "task_is_ready" ? "task_is_confirmed" :
            this.state.task.status === "task_is_performing" ? "task_is_testing" : "task_is_ready";

        this.props.taskStatus({id:this.props.match.params.id,status:newStatus});
    }

    handleDelete(e){
        e.preventDefault();
        if(confirm("Вы уверены?"))
            this.props.taskDelete(this.props.match.params.id,this.handleRedirect);
    }
    render() {
        const {id} = this.props.match.params;
         return (<div>
            <Panel title="Информация о задаче">
            <ul className="list-group">
                {this.projectTab(id)}
            </ul>
            <Row className="mt-2">
            <Col sm={8}>
                {this.props.user.roles.some(item => item.role === 'project_manager') ||
                this.props.user.roles.some(item => item.role === 'admin') ?
                <Link to={"/task/edit/" + id} className="btn btn-primary">
                    Изменить задачу
                </Link>

                    : ''}
                {this.props.user.roles.some(item => item.role === 'project_manager') ||
                this.props.user.roles.some(item => item.role === 'admin') ?
                    <Button onClick={this.handleDelete} className="btn btn-primary">
                        Удалить задачу
                    </Button>

                    : ''}
                <Link to={"/tasks"} className="btn btn-default">
                    Назад к задачам
                </Link>
                {this.props.user.roles.some(item => item.role === 'developer') && this.state.task.status=="new_task" ?
                        <Button color="primary" onClick={this.handleSubmitAccept}>Принять задачу</Button>
                    : ''}
                {this.props.user.roles.some(item => item.role === 'project_manager') && this.state.task.status=="task_is_ready" ?
                        <Button color="primary" onClick={this.handleSubmitStatus}>Задача готова</Button>
                    : ''}
                {this.props.user.roles.some(item => item.role === 'tester') && (this.state.task.status=="task_is_performing")?
                        <Button color="primary" onClick={this.handleSubmitStatus}>Начать тестирование</Button>
                    : ''}
                {this.props.user.roles.some(item => item.role === 'tester') && (this.state.task.status=="task_is_testing")?
                    <Button color="primary" onClick={this.handleSubmitStatus}>Завершить тестирование</Button>
                    : ''}

            </Col>
            </Row>
        </Panel>
                 <CommentList id={id}/>
         </div>);
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        tasks: state.task.tasks,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskInfo));

