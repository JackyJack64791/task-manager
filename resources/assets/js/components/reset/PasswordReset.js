import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import queryString from 'query-string';
import Panel from "../Panel";
import {
    Button, Card, CardBody, CardGroup, CardHeader, Col, Container, Form, FormGroup, Input, Label,
    Row
} from "reactstrap";

class PasswordReset extends Component {
    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
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

    handleRedirect() {
        this.props.history.push("/login");
    }

    parseQuery(query) {
        let queryParams = Object.keys(queryString.parse(query));
        return queryParams[0];
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.token = this.parseQuery(this.props.location.search);
        const reset = {
            token: this.state.token,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation
        };
        this.props.resetPassword(reset, this.state.token, this.handleRedirect);

    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                            <CardGroup>
                                <Card>
                                    <CardHeader>Сброс пароля</CardHeader>
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Input type="hidden" name="token" value={this.state.token}/>
                                            <FormGroup row>
                                                <Label for="email" sm={4}>Электронная почта</Label>
                                                <Col sm={8}>
                                                    <Input id="email" type="email"
                                                           placeholder="johndoe@example.com" name="email" required
                                                           autoFocus
                                                           onChange={this.handleEmail}/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="password" sm={4}>Пароль</Label>

                                                <Col sm={8}>
                                                    <Input id="password" type="password"
                                                           placeholder="Минимальная длина - 6 символов" name="password"
                                                           required
                                                           onChange={this.handlePassword}/>

                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="password_confirmation" sm={4}>Повторите пароль</Label>

                                                <Col sm={8}>
                                                    <Input id="password_confirmation" type="password"
                                                           placeholder="Повторите пароль" name="password_confirmation"
                                                           required
                                                           onChange={this.handlePasswordConfirmation}/>

                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={8}>
                                                    <Button type="submit" color="primary">
                                                        Сбросить пароль
                                                    </Button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(PasswordReset));