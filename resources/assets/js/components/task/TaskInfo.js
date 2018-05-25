import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";
import {Col, Row} from "reactstrap";
import CommentList from "./comments/CommentList";

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
        let names = this.getPropertyNames();
        return Object.keys(task).map((key, i) => {
                return <InfoProperty style="list" name={names[i]} value={task[key]}/>
            }
        )
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
                <Link to={"/tasks"} className="btn btn-default">
                    Назад к задачам
                </Link>

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

export default withRouter(connect(mapStateToProps, null)(TaskInfo));

