import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";

class TaskInfo extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    filterTask(project) {
        return (({author_id, project_id, title, description, priority, difficulty,status,completion_percent, hours_count, date_completion, performer_id, time_search}) => ({
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
            time_search
        }))(project)
    }

    getPropertyNames() {
        return ["Автор", "Проект", "Название", "Описание", "Приоритет", "Сложность", "Статус", "Процент готовности", "Количество часов", "Дата завершения", "Исполнитель", "Время на поиск(ч)"];
    }

    projectTab(id) {
        let task = this.filterTask(
            this.props.tasks.find(item => item.id == id));
        if(task.author_id === this.props.user.id)
        task.author_id = this.props.user.full_name + "(you)";
        else
            task.author_id = this.props.user.full_name;
        task.project_id = this.props.projects.find(item => item.id === task.project_id).title;
        if(task.performer_id!= null) task.performer_id = this.props.users.find(item => item.id === task.performer_id).full_name;
        let names = this.getPropertyNames();
        return Object.keys(task).map((key, i) => {
                return <InfoProperty style="list" name={names[i]} value={task[key]}/>
            }
        )
    }

    render() {
        const {id} = this.props.match.params;
         return (
            <Panel title="Инфморация о задаче">
            <ul className="list-group">
                {this.projectTab(id)}
            </ul>
            <div className="col-md-8 col-md-offset-4">
                <Link to={"/task/edit/" + id} className="btn btn-primary">
                    Изменить задачу
                </Link>
                <Link to={"/tasks"} className="btn btn-default">
                    Назад к задачам
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
        projects: state.project.projects,
        tasks: state.task.tasks,
    }
}

export default withRouter(connect(mapStateToProps, null)(TaskInfo));

