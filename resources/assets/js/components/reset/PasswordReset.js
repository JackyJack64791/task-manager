import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import queryString from 'query-string';
import Panel from "../Panel";

class PasswordReset extends Component {
    componentDidMount(){
        if(this.props.authenticated) this.props.history.push("/profile/info");
    }

    constructor(props) {
        super(props);
        this.state = {token: '', email: '', password: '', passwordConfirmation: ''};
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handlePasswordConfirmation(e) {
        this.setState({
            passwordConfirmation: e.target.value
        })
    }
    handleRedirect()
    {
        this.props.history.push("/login");
    }
    parseQuery(query)
    {
        let queryParams = Object.keys(queryString.parse(query));
        return queryParams[0];
    }
    handleSubmit (e) {
        e.preventDefault();
        this.state.token = this.parseQuery(this.props.location.search);
        const reset = {
            token:this.state.token,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation
        };
        this.props.resetPassword(reset,this.state.token,this.handleRedirect);

    }
    render() {
        return (
            <Panel title="Password Reset">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <input type="hidden" name="token" value={this.state.token}/>
                            <fieldset className="form-group">
                                <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>
                                <div className="col-md-6">
                                    <input id="email" type="email" className="form-control"
                                           placeholder="johndoe@example.com" name="email" required autoFocus onChange={this.handleEmail}/>
                                </div>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control"
                                           placeholder="Minimum length: 6 symbols" name="password" required onChange={this.handlePassword}/>

                                </div>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="password_confirmation" className="col-md-4 control-label">Password</label>

                                <div className="col-md-6">
                                    <input id="password_confirmation" type="password" className="form-control"
                                           placeholder="Repeat your password" name="password_confirmation" required onChange={this.handlePasswordConfirmation}/>

                                </div>
                            </fieldset>
                            <fieldset className="form-group">
                                <div className="col-md-8 col-md-offset-4">
                                    <button type="submit" className="btn btn-primary">
                                        Reset Password
                                    </button>
                                </div>
                            </fieldset>
                            </form>
                            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </Panel>);
    }
}

export default withRouter(connect(null,actions)(PasswordReset));