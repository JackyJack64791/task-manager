import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class Login extends Component {
    componentDidMount(){
        if(this.props.authenticated) this.props.history.push("/profile/info");
    }
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
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

    handleRedirect()
    {
        this.props.history.push("/team_choose");
    }
    handleSubmit (e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.authUser(user,this.handleRedirect);
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <form onSubmit={this.handleSubmit}>
                                            <h1>Войти</h1>
                                            <p className="text-muted">Введите данные для входа</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                                                <Input type="text" placeholder="Электронная почта" onChange={this.handleEmail}/>
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                                                <Input type="password" placeholder="Пароль" onChange={this.handlePassword}/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4">Войти</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Link to='/reset/email' color="link" className="px-0 btn">Забыли пароль?</Link>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Нет профиля?</h2>
                                            <p>Для использования "Менеджера IT-проектов" необходимо зарегистрироваться в системе. Вы можете это сделать, нажав кнопку ниже
                                                Это абсолютно бесплатно.</p>
                                            <Link to="/register/step1" className="mt-3 btn btn-primary active">Зарегистрироваться</Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated:state.auth.authenticated,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps,actions)(Login));