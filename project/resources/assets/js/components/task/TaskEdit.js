import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';


class TaskCreate extends Component {
    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        let task = this.props.tasks.find(item => item.id == id);
        this.state = {
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            difficulty: task.difficulty,
            hoursCount: task.hours_count,
            dateCompletion: task.date_completion,
            performer: task.performer_id,
            timeSearch: task.time_search
        };
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
            performer_id: this.state.performer,
            time_search: this.state.timeSearch
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
                <label><input type="radio" name="priority" onChange={this.handlePriority} checked={checked} required
                              value={key}/>{key}</label>
            </div>
        })


    }

    difficulty() {
        let difficulties = ['easy', 'medium', 'hard'];
        return difficulties.map((key) => {
            let checked = key === this.state.difficulty;
            return <div className="radio-inline">
                <label><input type="radio" name="difficulty" checked={checked} onChange={this.handleDifficulty} required
                              value={key}/>{key}</label>
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
        return <Panel title="Task Edit">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="title"
                           className="col-md-4 control-label">Title</label>

                    <div className="col-md-6">
                        <input id="title" type="text" className="form-control"
                               name="title" required onChange={this.handleTitle} value={this.state.title}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="description" className="col-md-4 control-label">Description</label>

                    <div className="col-md-6">
                        <textarea id="description" className="form-control"
                                  name="description" required onChange={this.handleDescription}
                                  value={this.state.description}/>

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
                               name="hoursCount" value={this.state.hoursCount} onChange={this.handleHoursCount}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="dateCompletion"
                           className="col-md-4 control-label">Date completion</label>

                    <div className="col-md-6">
                        <input id="dateCompletion" type="date" className="form-control"
                               name="dateCompletion" value={this.state.dateCompletion}
                               onChange={this.handleDateCompletion}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="performer" className="col-md-4 control-label">Performer</label>
                    <div className="col-md-6">
                        <select id="performer" className="form-control" defaultValue="0" value={this.state.performer}
                                onChange={this.handlePerformer}
                        >
                            {!this.state.performer ? <option disabled value="0">Choose performer...</option> : ""}
                            {this.performers()}
                        </select>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="timeSearch"
                           className="col-md-4 control-label">Search time</label>

                    <div className="col-md-6">
                        <input id="timeSearch" type="time" step="1" className="form-control"
                               name="timeSearch" value={this.state.timeSearch} onChange={this.handleTimeSearch}/>
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <div className="col-md-8 col-md-offset-4">
                        <button type="submit" className="btn btn-primary">
                            Edit Task
                        </button>
                        <Link to={"/task/info/" + id} className="btn btn-default">
                            Return
                        </Link>
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
        tasks: state.task.tasks,
        users: state.user.users,
        isError: state.task.isError,
        error: state.task.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TaskCreate));

