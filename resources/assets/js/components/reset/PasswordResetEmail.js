import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {
    Button, Card, CardBody, CardGroup, CardHeader, Col, Container, Form, FormGroup, Input, Label,
    Row
} from "reactstrap";
import {Link} from "react-router-dom";

class PasswordResetEmail extends Component {
    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
    }

    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleRedirect() {
        this.props.history.push({
            pathname: "/reset/info",
            state: {email: this.state.email}
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.resetSendEmail(this.state.email, this.handleRedirect);
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
                                                <Col sm={8}>
                                                    <Button type="submit" color="primary">
                                                        Сбросить пароль
                                                    </Button>
                                                    <Link to="/login" className="btn btn-default">
                                                        Перейти к авторизации
                                                    </Link>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    }
}

export default withRouter(connect(mapStateToProps, actions)(PasswordResetEmail));