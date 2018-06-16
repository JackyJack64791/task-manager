import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Panel from "../Panel";
import TaskTab from "./TaskTab";
import {Button, Card, CardBody, CardHeader, Col, Form, Row} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";


class TaskList extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");

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
    constructor(props) {
        super(props);
        let statuses = this.getStatuses();
        let allTasks = Object.assign(this.props.tasks || []);
        let userTasks = [];
        let userTasksItems = this.props.tasks.length > 0 ? this.props.tasks.find(item => item.performer_id === this.props.user.id) : null;
        if(userTasksItems) userTasks.push(Object.assign(userTasksItems));
        let proposedTasks = [];
        let proposedTasksItems = this.props.tasks.length > 0 ? this.props.tasks.find(item => item.possible_performer_id === this.props.user.id) : null;
        if(proposedTasksItems) proposedTasks.push(Object.assign(proposedTasksItems));
        console.log(proposedTasks,'PROPOSED TASKS');
        this.tasksAll = allTasks.map((r) => {
            r.project_name = this.props.projects.find(item => item.id === r.project_id).title;
            r.possible_performer_name = r.possible_performer_id ? this.props.users.find(item => item.id === r.possible_performer_id).full_name : "-";
            r.performer_name = r.performer_id ? this.props.users.find(item => item.id === r.performer_id).full_name : "-";
            r.status_ru = statuses[r.status];
            return r;
        });
        this.tasksUser = userTasks.map((r) => {
            // r.project_name = this.props.projects.find(item => item.id === r.project_id).title;
            r.status_ru = statuses[r.status];
            return r;
        });
        console.log(this.tasksUser,'TASKSUSER');
        this.tasksProposed = proposedTasks.map((r) => {
            r.project_name = this.props.projects.find(item => item.id === r.project_id).title;
            r.status_ru = statuses[r.status];
            return r;
        });
        console.log(this.tasksProposed,'PROPOSED TASKS');
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
        this.extraCellIds = this.props.tasks.map(r => {return r.id});
    }

    colFormatter(cell, row) {
        return (
            <Link to={"/task/info/"+cell}>
                {cell}
            </Link>
        )
    }

    render() {
        if (!this.props.tasks.length)
            return <Panel title="Задачи">
                {this.props.user.roles.some(item => item.role === 'project_manager') ||
                this.props.user.roles.some(item => item.role === 'admin') ?
                    <div>
                <p>У вас нет ни одной задачи. Вы можете создать новую.
                </p>
                <Row className="justify-content-center">
                    <Col sm={12}>
                        <Link className="btn btn-primary btn-lg" to='/task/create'>Создать задачу</Link>
                    </Col>
                </Row>
                    </div>: <p>У вас нет ни одной задачи.</p>}
            </Panel>;
        else return <div>
            <Panel title="Предложенные задачи">
                <div className="animated">
                    {this.tasksProposed.length >0 ?
                        <BootstrapTable data={this.tasksProposed} version="4" striped hover pagination search options={this.options}>
                            <TableHeaderColumn dataField="id" dataFormat={this.colFormatter} dataSort >ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="title" dataSort >Название</TableHeaderColumn>
                            <TableHeaderColumn isKey dataField="project_name" dataSort>Проект</TableHeaderColumn>
                            <TableHeaderColumn dataField="status_ru" dataSort>Статус</TableHeaderColumn>
                            {/*<TableHeaderColumn dataField={this.actionCell} formatExtraData={this.cellStatuses}>Действие</TableHeaderColumn>*/}
                        </BootstrapTable> :
                        <p>У вас нет предложенных задач</p>
                    }
                </div>
            </Panel>
            <Panel title="Ваши задачи">
                <div className="animated">
                    {this.tasksUser.length > 0 ?
                    <BootstrapTable data={this.tasksUser} version="4" striped hover pagination search options={this.options}>
                        <TableHeaderColumn dataField="id" dataFormat={this.colFormatter} dataSort >ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataSort >Название</TableHeaderColumn>
                        <TableHeaderColumn isKey dataField="project_id" dataSort>Проект</TableHeaderColumn>
                        {/*<TableHeaderColumn dataField="possible_performer_id" dataSort>Возможный исполнитель</TableHeaderColumn>*/}
                        {/*<TableHeaderColumn dataField="performer_id">Исполнитель</TableHeaderColumn>*/}
                        <TableHeaderColumn dataField="status_ru">Статус</TableHeaderColumn>
                    </BootstrapTable> :
                    <p>У вас нет задач</p>
                    }
                </div>
            </Panel>
        <Panel title="Все задачи">
            <div className="animated">
                <BootstrapTable data={this.tasksAll} version="4" striped hover pagination search options={this.options}>
                    <TableHeaderColumn dataField="id" dataFormat={this.colFormatter} dataSort >ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="title" dataSort >Название</TableHeaderColumn>
                    <TableHeaderColumn isKey dataField="project_name" dataSort>Проект</TableHeaderColumn>
                    {/*<TableHeaderColumn dataField="possible_performer_id" dataSort>Возможный исполнитель</TableHeaderColumn>*/}
                    <TableHeaderColumn dataField="performer_name">Исполнитель</TableHeaderColumn>
                    <TableHeaderColumn dataField="status_ru">Статус</TableHeaderColumn>
                    {/*<TableHeaderColumn dataField={this.actionCell} formatExtraData={this.cellStatuses}>Действие</TableHeaderColumn>*/}
                </BootstrapTable>
            </div>
            {this.props.user.roles.some(item => item.role === 'project_manager') ||
            this.props.user.roles.some(item => item.role === 'admin') ?
            <Link className="btn btn-primary" to='/task/create'>Создать задачу</Link>
                : ''}
        </Panel>
        </div>
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        tasks: state.task.tasks,
        user: state.user.user,
        users: state.user.users,
        projects: state.project.projects,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskList));

