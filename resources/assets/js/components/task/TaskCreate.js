import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';


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
            hoursCount: this.state.hoursCount,
            dateCompletion: this.state.dateCompletion,
            performer: this.state.performer,
            timeSearch: this.state.timeSearch
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
            <label><input type="radio" name="priority" onChange={this.handlePriority} required value={key}/>{key}</label>
        </div>)
    }
    difficulty(){
        let difficulties = ['easy','medium','hard'];
        return difficulties.map((key)=> <div className="radio-inline">
            <label><input type="radio" name="difficulty" onChange={this.handleDifficulty} required value={key}/>{key}</label>
        </div>)
    }
    performers(){
        return this.props.users.map((key) =>
            <option value={key.id}>{key.full_name}</option>
        )
    }

    render() {
        if(!this.props.projects.length)
            return <Panel title="Create Task">
                <p>Oops,seems like you don't have any projects. For creating tasks you need a project. You can <Link to="/project/create">create</Link> one
                </p>
            </Panel>;
        else return <Panel title="Create Task">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="project" className="col-md-4 control-label">Project</label>
                    <div className="col-md-6">
                        <select id="project" defaultValue="0" className="form-control" onChange={this.handleProject}
                                required>
                            <option disabled value="0">Choose project...</option>
                            {this.projects()}
                        </select>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="title"
                           className="col-md-4 control-label">Title</label>

                    <div className="col-md-6">
                        <input id="title" type="text" className="form-control"
                               name="title" required onChange={this.handleTitle}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="description" className="col-md-4 control-label">Description</label>

                    <div className="col-md-6">
                        <textarea id="description" className="form-control"
                               name="description" required onChange={this.handleDescription}/>

                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="priority" className="col-md-4 control-label">Priority</label>
                    <div className="col-md-6">
                            {this.priority()}
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="difficulty" className="col-md-4 control-label">Difficulty</label>
                    <div className="col-md-6">
                            {this.difficulty()}
                    </div>
                </fieldset>
                <hr/>
                <fieldset className="form-group">
                    <label htmlFor="hoursCount"
                           className="col-md-4 control-label">Hours count</label>

                    <div className="col-md-6">
                        <input id="hoursCount" type="number" className="form-control"
                               name="hoursCount"  onChange={this.handleHoursCount}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="dateCompletion"
                           className="col-md-4 control-label">Date completion</label>

                    <div className="col-md-6">
                        <input id="dateCompletion" type="date" className="form-control"
                               name="dateCompletion"  onChange={this.handleDateCompletion}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="performer" className="col-md-4 control-label">Performer</label>
                    <div className="col-md-6">
                        <select id="performer" defaultValue="0" className="form-control" onChange={this.handlePerformer}
                                >
                            <option disabled value="0">Choose performer...</option>
                            {this.performers()}
                        </select>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="timeSearch"
                           className="col-md-4 control-label">Search time</label>

                    <div className="col-md-6">
                        <input id="timeSearch" type="number" className="form-control"
                               name="timeSearch" onChange={this.handleTimeSearch}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <div className="col-md-8 col-md-offset-4">
                        <button type="submit" className="btn btn-primary">
                            Create Task
                        </button>
                    </div>
                </fieldset>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </form>
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
        isLoading: state.task.isLoading,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskCreate));

