import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Panel from "../Panel";
import TaskTab from "./TaskTab";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";


class TaskList extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    projectsRender() {
        return this.props.projects.map((key) => (
            <Row>
            <Col sm="12">
                <Card className="card-accent-primary">
                    <CardHeader>
                        <Link to={"/project/info/"+key.id}>{key.title}</Link>
                    </CardHeader>
                    <CardBody>
                        {this.tasksRender(key.id)}
                    </CardBody>
                </Card>
            </Col>
        </Row>));
            {/*</Col><div>*/}
            {/*<ul className="list-group">*/}
                {/*<h4 className="h4 bold">{key.title}</h4>*/}
                {/*{this.tasksRender(key.id)}*/}
            {/*</ul>*/}
            {/*<hr/>*/}
        {/*</div>))*/}
    }

    tasksRender(id) {
        return this.props.tasks.map((key) => {
                if (key.project_id === id) return <TaskTab id={key.id} name={key.title} description={key.description}/>
            }
        )
    }

    render() {
        if (!this.props.tasks.length)
            return <Panel title="Задачи">
                <p>У вас нет ни одной задачи. Вы можете создать новую.
                </p>
                <Row className="justify-content-center">
                    <Col sm={12}>
                        <Link className="btn btn-primary btn-lg" to='/task/create'>Создать задачу</Link>
                    </Col>
                </Row>
            </Panel>;
        else return <Panel title="Задачи">
            {this.projectsRender()}
            <Link className="btn btn-primary" to='/task/create'>Создать задачу</Link>
        </Panel>
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        tasks: state.task.tasks,
        projects: state.project.projects,
    }
}

export default withRouter(connect(mapStateToProps, null)(TaskList));

