import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Panel from "../Panel";

class PasswordChange extends Component {
    componentDidMount(){
        if (!this.props.authenticated) this.props.history.push("/login");
    }
    constructor(props) {
        super(props);
        this.state = {
            oldPassword:'',
            newPassword:'',
            passwordConfirmation:'',
        };
        this.handleOldPassword = this.handleOldPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }

    handleNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    handlePasswordConfirmation(e) {
        this.setState({
            passwordConfirmation: e.target.value
        })
    }
    handleRedirect() {
        this.props.logoutUser();
        this.props.history.push("/login");
    }

    handleSubmit(e) {
        e.preventDefault();
        const credentials = {
            old_password:this.state.oldPassword,
            password:this.state.newPassword,
            password_confirmation:this.state.passwordConfirmation,
        };
        this.props.changePassword(credentials, this.handleRedirect);

    }

    render() {
        return (
            <Panel title="Change Password">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="password" className="col-md-4 control-label">Old Password</label>

                        <div className="col-md-6">
                            <input id="old_password" type="password" className="form-control"
                                   placeholder="Type your password" name="old_password" required
                                   onChange={this.handleOldPassword}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="col-md-4 control-label">New Password</label>

                        <div className="col-md-6">
                            <input id="password" type="password" className="form-control"
                                   placeholder="Minimum length: 6 symbols" name="old_password" required
                                   onChange={this.handleNewPassword}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation" className="col-md-4 control-label">Confirm
                            Password</label>

                        <div className="col-md-6">
                            <input id="password_confirmation" type="password" className="form-control"
                                   placeholder="Repeat your password" name="password_confirmation"
                                   required onChange={this.handlePasswordConfirmation}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <div className="col-md-6 col-md-offset-4">
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <Link to={"/profile/info"} className="btn btn-default">
                                Back to profile
                            </Link>
                        </div>
                    </div>
                </form>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(PasswordChange));