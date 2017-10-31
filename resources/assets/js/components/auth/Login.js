import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PasswordForget from "./PasswordReset";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', remember: '', fireRedirect: false};
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
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

    handleRemember(e) {
        this.setState({
            remember: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({fireRedirect: true});
        const user = {
            email: this.state.email,
            password: this.state.password,
            remember: this.state.remember
        };
        let uri = 'http://localhost:8000/api/login';
        axios.post(uri, user);

    }

    render() {
        const {fireRedirect} = this.state.fireRedirect;
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Login</div>
                        <div className="panel-body">

                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <input type="hidden" value={window.Laravel.csrfToken}/>

                                <div className="form-group">
                                    <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control"
                                               placeholder="johndoe@example.com" name="email" required autoFocus
                                               onChange={this.handleEmail}/>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control"
                                               placeholder="Minimum length: 6 symbols" name="password" required
                                               onChange={this.handlePassword}/>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-6 col-md-offset-4">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" onChange={this.handleRemember}/>
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-8 col-md-offset-4">
                                        <button type="submit" className="btn btn-primary">
                                            Login
                                        </button>

                                        <Link to="/passwordreset">Forgot Your Password?</Link>
                                    </div>
                                </div>
                            </form>
                            {fireRedirect && (<Redirect to='/home'/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Login;