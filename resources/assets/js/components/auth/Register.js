import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import * as actions from '../../actions/index';
import Cards from 'react-credit-cards';
import Panel from "../Panel";
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

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
        this.props.history.push("/projects");
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
            phone: this.state.phone.replace(/[^0-9]/g, ''),
            bank_card: this.state.bankCard,
        };
        this.props.registerUser(user, this.handleRedirect);
    }

    render() {
        return (
            <Row className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <form onSubmit={this.handleSubmit}>
                                        <h1>Зарегистрироваться</h1>
                                        <p className="text-muted">Создайте свой профиль</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon>@</InputGroupAddon>
                                            <Input type="text" placeholder="Электронная почта" onChange={this.handleEmail} required autoFocus/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon><i className="icon-tag"></i></InputGroupAddon>
                                            <Input type="text" placeholder="ФИО" onChange={this.handleFullName} required/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                            <Input type="text" placeholder="Логин" onChange={this.handleLogin} required/>
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <InputGroupAddon><i className="icon-map"></i></InputGroupAddon>
                                            <Input type="text" placeholder="Адрес" onChange={this.handleAddress} required/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon><i className="icon-phone"></i></InputGroupAddon>
                                            <Input type="text" placeholder="Номер телефона" onChange={this.handlePhone} required/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon><i className="icon-credit-card"></i></InputGroupAddon>
                                            <Input type="text" placeholder="Номер банковской карты" onChange={this.handleBankCard} required/>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                            <Input type="password" placeholder="Пароль" onChange={this.handlePassword} required/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                            <Input type="password" placeholder="Повторите пароль" onChange={this.handlePasswordConfirmation} required/>
                                        </InputGroup>
                                        <Button type="submit" color="primary" block>Зарегистрироваться</Button>
                                    </form>
                                </CardBody>
                                <CardFooter>
                                    <div className="form-group mb-0 clearfix text-center">
                                        <Link to="/login" className="btn btn-link">Уже есть профиль? Войти</Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        authenticated: state.auth.authenticated,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(Register));