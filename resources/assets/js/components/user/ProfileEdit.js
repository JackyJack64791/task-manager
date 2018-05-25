import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Panel from "../Panel";
import {Button, Card, CardBody, CardGroup, Col, Form, FormGroup, Input, InputGroup, Label, Row} from "reactstrap";
import ImageUpload from "../ImageUpload";
import {Creatable} from "react-select";

class ProfileEdit extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        let initSkills = Object.values(this.props.skills);
        let userSkills = this.props.user.skills ? Object.values(this.props.user.skills) : [];
        this.state = {
            fullName: this.props.user.full_name,
            email: this.props.user.email,
            login: this.props.user.login,
            address: this.props.user.address,
            phone: this.props.user.phone,
            bankCard: this.props.user.bank_card,
            skills: userSkills ,
            initSkills: initSkills,
        };
        this.handleFullName = this.handleFullName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleBankCard = this.handleBankCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkills = this.handleSkills.bind(this);
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
    handleSkills(skills) {
        // console.log(e);
        this.setState({
            skills: skills
        })
    }

    handleRedirect() {
        this.props.history.push("/profile/info");
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            id: this.props.user.id,
            full_name: this.state.fullName,
            email: this.state.email,
            login: this.state.login,
            address: this.state.address,
            phone: this.state.phone.replace(/[^0-9]/g, ''),
            bank_card: this.state.bankCard,
            skills: this.state.skills,
        };
        this.props.updateUser(user, this.handleRedirect);

    }

    render() {
        return (
            <Panel title="Изменить профиль">
                <Row className="justify-content-center">
                    <Col md="12">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="email" sm={4}>Электронная
                                    почта</Label>

                                <Col sm={8}>
                                    <Input id="email" type="email" name="email"
                                           required autoFocus placeholder="johndoe@example.com"
                                           value={this.state.email}
                                           onChange={this.handleEmail}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="full_name" sm={4}>ФИО</Label>

                                <Col sm={8}>
                                    <Input id="full_name" type="text"
                                           name="full_name"
                                           placeholder="Иванов Иван Иванович" required onChange={this.handleFullName}
                                           value={this.state.fullName}/>

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="login" sm={4}>Логин</Label>

                                <Col sm={8}>
                                    <Input id="login" type="text" name="login"
                                           required
                                           placeholder="AnyLogin43" onChange={this.handleLogin}
                                           value={this.state.login}/>

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="address" sm={4}>Адрес</Label>

                                <Col sm={8}>
                                    <Input id="address" type="text" name="address"
                                           placeholder="Москва, Россия" required
                                           onChange={this.handleAddress} value={this.state.address}/>

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="phone" sm={4}>Номер телефона</Label>

                                <Col sm={8}>
                                    <Input id="phone" type="tel" pattern="(\+?\d[- .]*){7,13}"
                                           placeholder="8-800-555-3535" name="phone"
                                           required onChange={this.handlePhone} value={this.state.phone}/>

                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor="bank_card" sm={4}>Номер банковской карты</Label>

                                <Col sm={8}>
                                    <Input id="bank_card" type="text" maxLength="16" name="bank_card"
                                           placeholder="16-значный номер карты" required
                                           onChange={this.handleBankCard} value={this.state.bankCard}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="skills" sm={4}>Навыки</Label>
                                <Col sm={8}>
                                    <Creatable
                                        name="skills"
                                        value={this.state.skills}
                                        multi={true}
                                        onChange={this.handleSkills}
                                        options={this.state.initSkills}
                                        labelKey="skill"
                                        valueKey="id"
                                    />
                                </Col>
                            </FormGroup>
                            <hr/>
                            {/*<ImageUpload/>*/}
                            <FormGroup row>
                                <Col md={10}>
                                    <Button type="submit" color="primary" className="btn btn-primary">
                                        Обновить
                                    </Button>
                                    <Link to={"/profile/info"} className="btn btn-default">
                                        Назад к профилю
                                    </Link>
                                    <Link to={"/password/change"} className="btn btn-default">
                                        Изменить пароль
                                    </Link>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.user.user,
        skills: state.skill.skills,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProfileEdit));