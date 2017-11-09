import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

class LoginForm extends Component {
    componentDidMount(){
        if(this.props.authenticated) this.props.history.push("/profile/info");
    }
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', remember: false};
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        // this.handleRemember = this.handleRemember.bind(this);
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

    // handleRemember(e) {
    //     this.setState({
    //         remember: !this.state.remember
    //     })
    // }
    handleRedirect()
    {
        this.props.history.push("/home");
    }
    handleSubmit (e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            // remember: this.state.remember
        };
        this.props.authUser(user,this.handleRedirect);
    }

    render() {
        return (
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
                {/*<fieldset className="form-group">*/}
                    {/*<div className="col-md-6 col-md-offset-4">*/}
                        {/*<div className="checkbox">*/}
                            {/*<label>*/}
                                {/*<input type="checkbox" name="remember" onChange={this.handleRemember}/>*/}
                                {/*Remember Me*/}
                            {/*</label>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</fieldset>*/}
                <fieldset className="form-group">
                    <div className="col-md-8 col-md-offset-4">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <Link className="btn btn-link" to='/reset/email'>Forgot Your Password?</Link>
                    </div>
                </fieldset>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </form>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated:state.auth.authenticated,
        isLoading: state.auth.isLoading,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps,actions)(LoginForm));