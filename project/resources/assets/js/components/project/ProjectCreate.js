import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";

class ProjectCreate extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        this.state = {customer: '', title: '', deadline: '', description: '', specification: ''};
        this.handleCustomer = this.handleCustomer.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSpecification = this.handleSpecification.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    customers() {
        return this.props.users.map((key) =>
            <option value={key.id}>{key.full_name}</option>
        )

    }

    handleCustomer(e) {
        this.setState({
            customer: e.target.value
        })
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
            specification: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const project = {
            customer: this.state.customer,
            title: this.state.title,
            deadline: this.state.deadline,
            description: this.state.description,
            specification: this.state.specification,
        };
        this.props.projectCreate(project, this.handleRedirect);
    }

    handleRedirect() {
        if(!this.props.isError) this.props.history.push("/projects");
    }

    render() {
        return (<Panel title="Create New Project">
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="customer" className="col-md-4 control-label">Customer</label>
                    <div className="col-md-6">
                        <select id="customer" defaultValue="0" className="form-control" onChange={this.handleCustomer}
                                required>
                            <option disabled value="0">Choose customer...</option>
                            {this.customers()}
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
                    <label htmlFor="deadline" className="col-md-4 control-label">Deadline</label>

                    <div className="col-md-6">
                        <input id="deadline" type="datetime-local" className="form-control"
                               name="deadline" required onChange={this.handleDeadline}/>

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
                    <label htmlFor="specification"
                           className="col-md-4 control-label">Specification</label>

                    <div className="col-md-6">
                        <input id="specification" type="text" className="form-control"
                               name="specification" required onChange={this.handleSpecification}/>

                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <div className="col-md-8 col-md-offset-4">
                        <button type="submit" className="btn btn-primary">
                            Create Project
                        </button>
                    </div>
                </fieldset>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </form>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.user.isError,
        error: state.user.error,
        users: state.user.users,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectCreate));

