import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";
import {Row} from "reactstrap";

class ProjectInfo extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
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
        return {title:"Название", customer_id:"Заказчик", manager_id:"Менеджер проекта",deadline: "Дата завершения",description: "Описание", specification_path: "Спецификация"};
    }

    projectTab(id) {
        let project = this.filterProject(
            this.props.projects.find(item => item.id == id));
        console.log(project);
        if(project.customer_id!=null) project.customer_id = this.props.users.find(item => item.id === project.customer_id).full_name;
        else project.customer_id = project.customer_name;
        console.log(this.props.users);
        project.manager_id = this.props.users.find(item => item.id == project.manager_id).full_name;
        if(project.manager_id===this.props.user.id)
            project.manager_id += "(you)";
        let names = this.getPropertyNames();
        return Object.keys(project).map((key) => {
            if(project[key])
                return <InfoProperty style="list" name={names[key]} value={project[key]}/>
            }
        )
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Panel title="Информация о проекте">
                {/*<img src={this.props.user.img_path}/>*/}
            <ul className="list-group">
                {this.projectTab(id)}
            </ul>
                <Row className="mt-2">
            <div className="col-md-8 col-md-offset-4">
                <Link to={"/project/edit/" + id} className="btn btn-primary">
                    Изменить проект
                </Link>
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

