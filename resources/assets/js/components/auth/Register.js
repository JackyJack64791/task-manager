import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from '../../actions/actions';
import Panel from "../Panel";

class Register extends Component {

    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
    }

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            login: '',
            password: '',
            passwordConfirmation: '',
            address: '',
            phone: '',
            bankCard: ''
        };
        this.handleFullName = this.handleFullName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleBankCard = this.handleBankCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleFullName(e) {
        this.setState({
            fullName: e.target.value
        })
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleLogin(e) {
        this.setState({
            login: e.target.value
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

    handleAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    handlePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    handleBankCard(e) {
        this.setState({
            bankCard: e.target.value
        })
    }

    handleRedirect() {
        this.props.history.push("/home");
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({fireRedirect: true});
        const user = {
            full_name: this.state.fullName,
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation,
            address: this.state.address,
            phone: this.state.phone,
            bank_card: this.state.bankCard,
        };
        this.props.registerUser(user, this.handleRedirect);
    }

    render() {
        return (
            <Panel title="Register">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                        <div className="col-md-6">
                            <input id="email" type="email" className="form-control" name="email"
                                   required autoFocus placeholder="johndoe@example.com"
                                   onChange={this.handleEmail}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="full_name" className="col-md-4 control-label">Full Name</label>

                        <div className="col-md-6">
                            <input id="full_name" type="text" className="form-control" name="full_name"
                                   placeholder="John Doe" required onChange={this.handleFullName}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="login" className="col-md-4 control-label">Login</label>

                        <div className="col-md-6">
                            <input id="login" type="text" className="form-control" name="login" required
                                   placeholder="MomDestroyer2002" onChange={this.handleLogin}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" className="col-md-4 control-label">Address</label>

                        <div className="col-md-6">
                            <input id="address" type="text" className="form-control" name="address"
                                   placeholder="NY,Brighton Beach" required
                                   onChange={this.handleAddress}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="col-md-4 control-label">Phone number</label>

                        <div className="col-md-6">
                            <input id="phone" type="tel" pattern="(\+?\d[- .]*){7,13}"
                                   className="form-control" placeholder="88005553535" name="phone"
                                   required onChange={this.handlePhone}/>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bank_card" className="col-md-4 control-label">Bank card
                            number</label>

                        <div className="col-md-6">
                            <input id="bank_card" type="text" maxLength="16" name="bank_card"
                                   placeholder="16-digit card number" required
                                   onChange={this.handleBankCard}/>
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
                        <label htmlFor="password_confirmation" className="col-md-4 control-label">Confirm
                            Password</label>

                        <div className="col-md-6">
                            <input id="password_confirmation" type="password" className="form-control"
                                   placeholder="Repeat your password" name="password_confirmation"
                                   required onChange={this.handlePasswordConfirmation}/>
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-md-6 col-md-offset-4">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                            <button type="reset" className="btn btn-default">
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </Panel>)
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(Register));