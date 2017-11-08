import React, {Component} from 'react';

class PasswordReset extends Component {
    componentDidMount(){
        if(this.props.authenticated) this.props.history.push("/profile/info");
    }

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', passwordConfirmation: ''};
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit (e) {
        e.preventDefault();
        const reset = {
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        };
        this.props.resetPassword(reset);
        this.props.history.push("/login");

    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Password Reset</div>
                        <div className="panel-body">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default PasswordReset;