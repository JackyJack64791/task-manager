import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Panel from "../Panel";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class PasswordChange extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            passwordConfirmation: '',
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
            old_password: this.state.oldPassword,
            password: this.state.newPassword,
            password_confirmation: this.state.passwordConfirmation,
        };
        this.props.changePassword(credentials, this.handleRedirect);

    }

    render() {
        return (
            <Panel title="Изменить пароль">
                <Form onSubmit={this.handleSubmit}>

                    <FormGroup row>
                        <Label for="password" sm={4}>Старый пароль</Label>
                        <Col sm={8}>
                            <Input id="old_password" type="password"
                                   placeholder="Введите ваш пароль" name="old_password" required
                                   onChange={this.handleOldPassword}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="password" sm={4}>Новый пароль</Label>
                        <Col sm={8}>
                            <Input id="password" type="password"
                                   placeholder="Минимальная длина: 6 символов" name="old_password" required
                                   onChange={this.handleNewPassword}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password_confirmation" sm={4}>Подтвердить пароль</Label>

                        <Col sm={8}>
                            <Input id="password_confirmation" type="password"
                                   placeholder="Повторите пароль" name="password_confirmation"
                                   required onChange={this.handlePasswordConfirmation}/>
                        </Col>
                    </FormGroup>
                    <hr/>
                    <FormGroup row>
                        <Col md={6}>
                            <Button type="submit" color="primary">
                                Обновить
                            </Button>
                            <Link to={"/profile/info"} className="btn btn-default">
                                Назад к профилю
                            </Link>
                        </Col>
                    </FormGroup>
                </Form>
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