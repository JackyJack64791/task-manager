import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";
import {Row} from "reactstrap"
import Dropzone from 'react-dropzone';

class ProjectInfo extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
    }


    filterProject(project) {
        return (({title, customer_id, customer_name, manager_id, deadline, description, specification_path}) => ({
            title,
            customer_id,
            customer_name,
            manager_id,
            deadline,
            description,
            specification_path
        }))(project)
    }

    getPropertyNames() {
        return {
            title: "Название",
            customer_id: "Заказчик",
            customer_name: 'Заказчик',
            manager_id: "Менеджер проекта",
            deadline: "Дата завершения",
            description: "Описание",
            specification_path: "Спецификация"
        };
    }

    projectTab(id) {
        let project = this.filterProject(
            this.props.projects.find(item => item.id == id)
        );
        console.log(project);
        if(project.customer_name) delete project.customer_id;
        else if (project.customer_id != null) project.customer_id = this.props.users.find(item => item.id === project.customer_id).full_name;
        project.manager_id = this.props.users.find(item => item.id == project.manager_id).full_name;
        if (project.manager_id === this.props.user.id)
            project.manager_id += "(you)";
        let names = this.getPropertyNames();
        return Object.keys(project).map((key) => {
                if (project[key])
                    return <InfoProperty style="list" name={names[key]} value={project[key]}/>
            }
        )
    }

    handleDrop(acceptedFiles) {
        console.log('Handle drop');
        // this.setState({ preview })

        let formData = new FormData();

        acceptedFiles.forEach(function (file) {
            formData.append('avatar', file);
        });

        console.log('Send fetch request');
        fetch('/talent/uploadUserAvatar', {
            method: 'POST',
            credentials: 'include',   //send the files to serverside
            body: formData
        })
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Panel title="Информация о проекте">
                <ul className="list-group">
                    {this.projectTab(id)}
                </ul>
                <Row className="mt-2">
                    <div className="col-md-8 col-md-offset-4">
                        {this.props.user.roles.some(item => item.role === 'project_manager') ||
                        this.props.user.roles.some(item => item.role === 'admin') ?
                            <div>
                                <Link to={"/project/edit/" + id} className="btn btn-primary mr-2">
                                    Изменить проект
                                </Link>
                                <Link to={"/project/stats/" + id} className="btn btn-primary mr-2">
                                    Статистика проекта
                                </Link>
                                <Link to={{pathname: "/task/create", state: {project_id: id}}}
                                      className="btn btn-primary">
                                    Добавить задачу
                                </Link>
                            </div> : ''}
                        <Link to={"/projects"} className="btn btn-default">
                            Назад к списку
                        </Link>

                    </div>
                </Row>
            </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectInfo));

