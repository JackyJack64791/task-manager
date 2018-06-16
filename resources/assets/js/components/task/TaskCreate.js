import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';
import {Badge, Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
// import Select from 'react-select';
import { Creatable } from 'react-select';
import Select from 'react-select';

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
        let initSkills = Object.values(this.props.skills);
        this.state = {
            project: this.props.location.state ? this.props.location.state.project_id : '',
            title: '',
            description: '',
            priority: '',
            difficulty: '',
            hoursCount: '',
            dateCompletion: '',
            performer: '',
            timeSearch: '',
            skills: [],
            initSkills: initSkills,
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
        this.handleInitSkills = this.handleInitSkills.bind(this);
        this.handleSkills = this.handleSkills.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        // console.log(this.state);
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.user.roles.some(item => item.role === 'project_manager') &&
            !this.props.user.roles.some(item => item.role === 'admin')) this.props.history.push("/tasks");
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
        if(!this.props.isError) this.props.history.push("/tasks");
    }

    handleSubmit(e) {
        e.preventDefault();
        // let isNew = this.state.skills.some( r => this.state.initSkills.indexOf(r) < 0);
        const task = {
            project: this.state.project,
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
        this.props.taskCreate(task, this.handleRedirect);
    }

    projects() {
        return this.props.projects.map((key) => {
            let selected = key.id === this.state.project.id;
            return <option value={key.id} >{key.title}</option>
        })
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
                <p>Похоже у вас нет ни одного проекта. Для создания задач вам необходим проект. Вы можете  <Link to="/project/create">создать</Link> новый.</p>
            </Panel>;
        else return <Panel title="Новая задача">
            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="project" sm={4}>Проект</Label>
                    <Col sm={8}>
                        <Input id="project" defaultValue={this.state.project === '' ? '0' : this.state.project} type="select" onChange={this.handleProject}
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
                {/*<FormGroup row>*/}
                    {/*<Label for="performer" sm={4}>Возможный исполнитель</Label>*/}
                    {/*<Col sm={8}>*/}
                        {/*<Input type="select" id="performer" defaultValue="0" onChange={this.handlePerformer}*/}
                                {/*>*/}
                            {/*<option disabled value="0">Выберите исполнителя...</option>*/}
                            {/*{this.performers()}*/}
                        {/*</Input>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}
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

            </Form>
        </Panel>
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        skills: state.skill.skills,
        users: state.user.users,
        user: state.user.user,
        isError: state.task.isError,
        error: state.task.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskCreate));

