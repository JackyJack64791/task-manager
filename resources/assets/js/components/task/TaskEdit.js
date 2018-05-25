import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';
import {Badge, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import { Creatable } from 'react-select';
import Select from 'react-select';
import DeleteButton from "../DeleteButton";


const SelectOption = React.createClass({
    handleMouseDown (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    },
    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event);
    },
    handleMouseMove (event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    },
    skillsBadges() {
        return this.props.option.skills.map((key) =>
            <Badge style={{margin:2, fontSize: 0.9 +'em'}}>{key.skill}</Badge>
        )
    },
    render () {

        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 >

                <div style={{marginRight:10}}>{this.props.children}</div>
                <Label>{this.skillsBadges()}</Label>
            </div>
        );
    }
});

class TaskCreate extends Component {
    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        let task = this.props.tasks.find(item => item.id == id);
        console.log(task.skills,"TASK");
        let initSkills = Object.values(this.props.skills);
        this.state = {
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            difficulty: task.difficulty,
            hoursCount: task.hours_count,
            dateCompletion: task.date_completion,
            performer: task.possible_performer_id,
            timeSearch: task.time_search,
            skills: task.skills,
            initSkills: initSkills,
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handlePriority = this.handlePriority.bind(this);
        this.handleDifficulty = this.handleDifficulty.bind(this);
        this.handleHoursCount = this.handleHoursCount.bind(this);
        this.handleDateCompletion = this.handleDateCompletion.bind(this);
        this.handlePerformer = this.handlePerformer.bind(this);
        this.handleTimeSearch = this.handleTimeSearch.bind(this);
        this.handleInitSkills = this.handleInitSkills.bind(this);
        this.handleSkills = this.handleSkills.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        console.log(this.state);
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.user.roles.some(item => item.role === 'project_manager') &&
            !this.props.user.roles.some(item => item.role === 'admin')) this.props.history.push("/tasks");
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

    handlePerformer(value) {
        this.setState({
            performer: value.id
        })
    }

    handleTimeSearch(e) {
        this.setState({
            timeSearch: e.target.value
        })
    }

    handleInitSkills(e) {
        this.setState({
            initSkills: e.target.value
        })
    }
    handleSkills(skills) {
        // console.log(e);
        this.setState({
            skills: skills
        })
    }



    handleRedirect() {
        if (!this.props.isError) this.props.history.push("/task/info/" + this.state.id);
    }

    handleSubmit(e) {
        e.preventDefault();
        const task = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority,
            difficulty: this.state.difficulty,
            hours_count: this.state.hoursCount,
            date_completion: this.state.dateCompletion,
            possible_performer_id: this.state.performer,
            time_search: this.state.timeSearch,
            skills: this.state.skills,
        };
        this.props.taskUpdate(task, this.handleRedirect);
    }

    projects() {
        return this.props.projects.map((key) =>
            <option value={key.id}>{key.title}</option>
        )
    }

    priority() {
        let priorities = ['1', '2', '3'];
        return priorities.map((key) => {
            let checked = key === this.state.priority;
            return <div className="radio-inline">
                <Label><Input type="radio" name="priority" onChange={this.handlePriority} checked={checked} required
                              value={key}/>{key}</Label>
            </div>
        })


    }

    difficulty() {
        let difficulties = ['easy', 'medium', 'hard'];
        let difficulties_ru = {easy: 'Легко', medium: 'Средне', hard: 'Сложно'};
        return difficulties.map((key) => {
            let checked = key === this.state.difficulty;
            return <div className="radio-inline">
                <Label><Input type="radio" name="difficulty" checked={checked} onChange={this.handleDifficulty} required
                              value={key}/>{difficulties_ru[key]}</Label>
            </div>
        })
    }

    performers() {
        return this.props.users.map((key) =>
            <option value={key.id}>{key.full_name}</option>
        )
    }

    render() {
        const {id} = this.props.match.params;
        return <Panel title="Изменение задачи">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="title" sm={4}>Название</Label>
                    <Col sm={8}>
                        <Input id="title" type="text"
                               name="title" required onChange={this.handleTitle} value={this.state.title}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={4}>Описание</Label>

                    <Col sm={8}>
                        <Input type="textarea" id="description"
                                  name="description" required onChange={this.handleDescription}
                                  value={this.state.description}/>
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
                    <Label for="hoursCount" sm={4}>Необходимое количество часов</Label>

                    <Col sm={8}>
                        <Input id="hoursCount" type="number"
                               name="hoursCount" value={this.state.hoursCount} onChange={this.handleHoursCount}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="skills" sm={4}>Необходимые навыки</Label>
                    <Col sm={8}>
                        <Creatable
                            name="skills"
                            value={this.state.skills}
                            multi={true}
                            onChange={this.handleSkills}
                            options={this.state.initSkills}
                            labelKey="skill"
                            valueKey="id"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="performer" sm={4}>Возможный исполнитель</Label>
                    <Col sm={8}>
                        <Select
                            name="performer"
                            value={this.state.performer}
                            multi={false}
                            onChange={this.handlePerformer}
                            options={this.props.users}
                            optionComponent={SelectOption}
                            labelKey="full_name"
                            valueKey="id"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="dateCompletion" sm={4}>Предположительная дата завершения</Label>

                    <Col sm={8}>
                        <Input id="dateCompletion" type="date"
                               name="dateCompletion" value={this.state.dateCompletion}
                               onChange={this.handleDateCompletion}/>
                    </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                    {/*<Label for="performer" sm={4}>Возможный исполнитель</Label>*/}
                    {/*<Col sm={8}>*/}
                        {/*<Input id="performer" type="select" defaultValue="0" value={this.state.performer}*/}
                                {/*onChange={this.handlePerformer}*/}
                        {/*>*/}
                            {/*{!this.state.performer ? <option disabled value="0">Choose performer...</option> : ""}*/}
                            {/*{this.performers()}*/}
                        {/*</Input>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}
                <FormGroup row>
                    <Label for="timeSearch" sm={4}>Время на поиск исполнителя</Label>

                    <Col sm={8}>
                        <Input id="timeSearch" type="time" step="1"
                               name="timeSearch" value={this.state.timeSearch} onChange={this.handleTimeSearch}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={8}>
                        <Button type="submit" color="primary">
                            Изменить задачу
                        </Button>
                        <Link to={"/task/info/" + id} className="btn btn-default">
                            Назад к задаче
                        </Link>
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
        tasks: state.task.tasks,
        skills: state.skill.skills,
        users: state.user.users,
        user: state.user.user,
        isError: state.task.isError,
        error: state.task.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskCreate));

