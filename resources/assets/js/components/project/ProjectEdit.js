import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';

class ProjectEdit extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.user.roles.some(item => item.role === 'project_manager') &&
            !this.props.user.roles.some(item => item.role === 'admin')) this.props.history.push("/projects");
    }

    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        let project = this.props.projects.find(item => item.id == id);
        this.state = {
            id: project.id,
            customer_id: project.customer_id,
            manager_id: project.manager_id,
            title: project.title,
            deadline: project.deadline,
            description: project.description,
            specification_path: project.specification_path,
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSpecification = this.handleSpecification.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state);
    }

    handleTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDeadline(e) {
        this.setState({
            deadline: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    handleSpecification(e) {
        this.setState({
            specification_path: e.target.value
        })
    }

    handleRedirect() {
        this.props.history.push("/project/info/" + this.state.id);
    }

    handleSubmit(e) {
        e.preventDefault();
        const project = {
            id: this.state.id,
            customer_id: this.state.customer_id,
            manager_id: this.state.manager_id,
            title: this.state.title,
            deadline: this.state.deadline,
            description: this.state.description,
            specification_path: this.state.specification_path,
            team_id: this.props.currentTeam,
        };
        this.props.projectUpdate(project, this.handleRedirect);
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Panel title="Изменение проекта">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="title" className="col-md-4 control-label">Название</label>

                        <div className="col-md-6">
                            <input id="title" type="text" className="form-control" name="title"
                                   required autoFocus placeholder="My awesome project" value={this.state.title}
                                   onChange={this.handleTitle}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="deadline" className="col-md-4 control-label">Дата завершения</label>

                        <div className="col-md-6">
                            <input id="deadline" type="datetime-local" className="form-control" name="deadline"
                                   placeholder="2017.12.12" required onChange={this.handleDeadline}
                                   value={this.state.deadline}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="col-md-4 control-label">Описание</label>

                        <div className="col-md-6">
                            <textarea id="description" className="form-control" name="description" required
                                      placeholder="Describe your project." onChange={this.handleDescription}
                                      value={this.state.description}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="specification" className="col-md-4 control-label">Спецификация</label>

                        <div className="col-md-6">
                            <input id="specification" type="text" className="form-control" name="specification_path"
                                   placeholder="Спецификация проекта(ссылка)" required
                                   onChange={this.handleSpecification} value={this.state.specification_path}/>

                        </div>
                    </div>

                    <hr/>

                    <div className="form-group">
                        <div className="col-md-6 col-md-offset-4">
                            <button type="submit" className="btn btn-primary">
                                Обновить
                            </button>
                            <button type="reset" className="btn btn-default">
                                Отменить изменения
                            </button>
                            <Link to={"/project/info/" + id} className="btn btn-default">
                                Назад к проекту
                            </Link>
                        </div>
                    </div>
                </form>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </Panel>
        )
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        isError: state.project.isError,
        error: state.project.error,
        user: state.user.user,
        currentTeam: state.auth.currentTeam,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectEdit));

