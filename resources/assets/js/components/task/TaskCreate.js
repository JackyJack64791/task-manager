import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";


class TaskCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            title: '',
            description: '',
            priority: '',
            difficulty: '',
            hoursCount: '',
            dateCompletion: '',
            performer: '',
            timeSearch: ''
        };
        this.handleProject = this.handleProject.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
        this.handleDifficulty = this.handleDifficulty.bind(this);
        this.handleHoursCount = this.handleHoursCount.bind(this);
        this.handleDateCompletion = this.handleDateCompletion.bind(this);
        this.handlePerformer = this.handlePerformer.bind(this);
        this.handleTimeSearch = this.handleTimeSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    handleProject(e) {
        this.setState({
            project: e.target.value
        })
    }
    handleTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    handlePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    handleDifficulty(e) {
        this.setState({
            difficulty: e.target.value
        })
    }


    handleHoursCount(e) {
        this.setState({
            hoursCount: e.target.value
        })
    }

    handleDateCompletion(e) {
        this.setState({
            dateCompletion: e.target.value
        })
    }

    handlePerformer(e) {
        this.setState({
            performer: e.target.value
        })
    }

    handleTimeSearch(e) {
        this.setState({
            timeSearch: e.target.value
        })
    }

    handleRedirect() {
        if(!this.props.isError) this.props.history.push("/tasks");
    }

    handleSubmit(e) {
        e.preventDefault();
        const task = {
            project: this.state.project,
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority,
            difficulty: this.state.difficulty,
            hours_count: this.state.hoursCount,
            date_completion: this.state.dateCompletion,
            performer_id: this.state.performer,
            time_search: this.state.timeSearch
        };
        this.props.taskCreate(task, this.handleRedirect);
    }

    projects() {
        return this.props.projects.map((key) =>
            <option value={key.id}>{key.title}</option>
        )
    }
    priority() {
        let priorities = ['1','2','3'];
        return priorities.map((key)=><div className="radio-inline">
            <Label><Input type="radio" name="priority" onChange={this.handlePriority} required value={key}/>{key}</Label>
        </div>)
    }
    difficulty(){
        let difficulties = ['easy','medium','hard'];
        let difficulties_ru = { easy:'Легко', medium:'Средне', hard:'Сложно'};
        return difficulties.map((key)=> <div className="radio-inline">
            <Label><Input type="radio" name="difficulty" onChange={this.handleDifficulty} required value={key}/>{difficulties_ru[key]}</Label>
        </div>)
    }
    performers(){
        return this.props.users.map((key) =>
            <option value={key.id}>{key.full_name}</option>
        )
    }

    render() {
        if(!this.props.projects.length)
            return <Panel title="Новая задача">
                <p>Похоже у вас нет ни одного проекта. Для создания задач вам необходим проект. Вы можете  <Link to="/project/create">создать</Link> новый.
                </p>
            </Panel>;
        else return <Panel title="Новая задача">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="project" sm={4}>Проект</Label>
                    <Col sm={8}>
                        <Input id="project" defaultValue="0" type="select" onChange={this.handleProject}
                                required>
                            <option disabled value="0">Выберите проект...</option>
                            {this.projects()}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="title" sm={4}>Название</Label>

                    <Col sm={8}>
                        <Input id="title" type="text" className="form-control"
                               name="title" required onChange={this.handleTitle}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={4}>Описание</Label>

                    <Col sm={8}>
                        <Input  type="textarea" id="description" className="form-control"
                               name="description" required onChange={this.handleDescription}/>

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="priority" sm={4}>Приоритет</Label>
                    <Col sm={8}>
                            {this.priority()}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="difficulty" sm={4}>Сложность</Label>
                    <Col sm={8}>
                            {this.difficulty()}
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup row>
                    <Label for="hoursCount" sm={4}>Предположительное время разработки(ч.)</Label>
                    <Col sm={8}>
                        <Input id="hoursCount" type="number"
                               name="hoursCount"  onChange={this.handleHoursCount}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="dateCompletion"
                           sm={4}>Дата завершения</Label>

                    <Col sm={8}>
                        <Input id="dateCompletion" type="date"
                               name="dateCompletion"  onChange={this.handleDateCompletion}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="performer" sm={4}>Возможный исполнитель</Label>
                    <Col sm={8}>
                        <Input type="select" id="performer" defaultValue="0" onChange={this.handlePerformer}
                                >
                            <option disabled value="0">Выберите исполнителя...</option>
                            {this.performers()}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="timeSearch" sm={4}>Время на поиск исполнителя</Label>

                    <Col sm={8}>
                        <Input id="timeSearch" type="time" className="form-control"
                               name="timeSearch" onChange={this.handleTimeSearch}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={8}>
                        <Button type="submit" color="primary">
                            Создать задачу
                        </Button>
                    </Col>
                </FormGroup>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </Form>
        </Panel>
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        users: state.user.users,
        isError: state.task.isError,
        error: state.task.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskCreate));

