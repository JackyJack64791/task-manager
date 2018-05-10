import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ProjectTab from "./ProjectTab";
import Panel from "../Panel";
import {Col, Row} from "reactstrap";

class ProjectList extends Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    projectsRender() {
        return this.props.projects.map((key) =>
            <ProjectTab id={key.id} name={key.title} description={key.description}/>
        )
    }

    render() {
        let projects;
        if (this.props.projects.length && !this.props.isLoading) {
            projects = this.props.projects;
        }
        else {
            if (!this.props.isLoading) {
                return <Panel title="Проекты">
                    <p>Похоже, у вас нет ни одного проекта. Вы можете создать новый.
                </p>
                    <Row className="justify-content-center">
                        <Col sm={12}>
                            <Link className="btn btn-primary btn-lg" to='/project/create'>Создать проект</Link>
                        </Col>
                    </Row>
                </Panel>
            } else return <p>Loading...</p>;
        }
        return (projects && <Panel title="Проекты">
            {/*<img src={this.props.user.img_path}/>*/}
            <ul className="list-group">
                {this.projectsRender()}
            </ul>
            <Link className="btn btn-primary mt-4" to='/project/create'>Создать новый проект</Link>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        isLoading: state.project.isLoading,
        getSuccess: state.project.getSuccess,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectList));

