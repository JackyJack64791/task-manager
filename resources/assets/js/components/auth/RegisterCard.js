import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import * as actions from '../../actions/index';
import Card from 'react-credit-cards';
import {
    Container, Row, Col, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon,
    FormGroup
} from 'reactstrap';
import {Card as CardContainer} from 'reactstrap';
// import SupportedCards from './Cards';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './creditCard/utils';
// import styles from './styles.css';

// import 'react-credit-cards/es/styles-compiled.css';

class RegisterCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '',
            formData: null,
        };
        // this.handleFullName = this.handleFullName.bind(this);
        // this.handleEmail = this.handleEmail.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        // this.handlePassword = this.handlePassword.bind(this);
        // this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
        // this.handleAddress = this.handleAddress.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleExpiry = this.handleExpiry.bind(this);
        this.handleCvc = this.handleCvc.bind(this);
        // this.handleIssuer = this.handleIssuer.bind(this);
        this.handleCallback = this.handleCallback.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleNumber(e) {
        e.target.value = formatCreditCardNumber(e.target.value);
        this.setState({
            number: e.target.value
        })
    }

    // handleIssuer(e) {
    //     this.setState({
    //         issuer: e.target.value
    //     })
    // }
    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleExpiry(e) {
        e.target.value = formatExpirationDate(e.target.value);
        this.setState({
            expiry: e.target.value
        })
    }

    handleCvc(e) {
        e.target.value = formatCVC(e.target.value);
        this.setState({
            cvc: e.target.value
        })
    }

    handleCallback(issuer, isValid) {
        // console.log(issuer.issuer);
        if (isValid) {
            this.setState({
                issuer: issuer.issuer
            });
        }
    };

    handleInputFocus(e) {
        // console.log("Input Focused: " + e);
        this.setState({
            focused: e.target.name,
        });
    };

    // handleInputChange(target) {
    //     console.log("Input Changed: "+target.value);
    //     if (target.name === 'number') {
    //         target.value = formatCreditCardNumber(target.value);
    //     } else if (target.name === 'expiry') {
    //         target.value = formatExpirationDate(target.value);
    //     } else if (target.name === 'cvc') {
    //         target.value = formatCVC(target.value);
    //     }
    //
    //     this.setState({[target.name]: target.value});
    //     console.log(this.state);
    // };

    handleSubmit(e) {
        e.preventDefault();
        // const {issuer} = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({
            formData: formData
        });
        console.log(this.state.formData);
        // this.form.reset();
    };

    render() {
        // const {name, number, expiry, cvc, focused, issuer, formData} = this.state;
        console.log(this.state.issuer);
        return (
            <Row className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                            <CardContainer className="mx-4">
                                <CardBody className="p-4">
                                    <form  onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col sm={12}>
                                                <Card
                                                    number={this.state.number}
                                                    name={this.state.name}
                                                    expiry={this.state.expiry}
                                                    cvc={this.state.cvc}
                                                    focused={this.state.focused}
                                                    callback={this.handleCallback}
                                                />
                                            </Col>
                                        </Row>
                                        <InputGroup className="mb-3">
                                            <Input
                                                type="tel"
                                                name="number"
                                                placeholder="Card Number"
                                                pattern="[\d| ]{16,22}"
                                                required
                                                onChange={this.handleNumber}
                                                onFocus={this.handleInputFocus}
                                            />
                                            <small className="form-text text-muted">Например: 49..., 51..., 36...,
                                                37...
                                            </small>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                onChange={this.handleName}
                                                onFocus={this.handleInputFocus}
                                            />
                                        </InputGroup>
                                        <Row>
                                            <Col sm={6}>
                                                <InputGroup className="mb-3">
                                                    <Input
                                                        type="tel"
                                                        name="expiry"
                                                        placeholder="Valid Thru"
                                                        pattern="\d\d/\d\d"
                                                        required
                                                        onChange={this.handleExpiry}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col sm={6}>
                                                <InputGroup className="mb-3">
                                                    <Input
                                                        type="tel"
                                                        name="cvc"
                                                        placeholder="CVC"
                                                        pattern="\d{3,4}"
                                                        required
                                                        onChange={this.handleCvc}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Input type="hidden" name="issuer" value={this.state.issuer}/>
                                        {/*<div className="form-actions">*/}
                                        {/*<Button color="primary">PAY</Button>*/}
                                        <Button type="submit" color="primary" block>Зарегистрироваться</Button>
                                        {/*</div>*/}
                                        {/*</form>*/}
                                        {this.state.formData && (
                                            <div className="App-highlight">
                                                {formatFormData(this.state.formData).map((d, i) => <div
                                                    key={i}>{d}</div>)}
                                            </div>
                                        )}
                                        <hr style={{margin: '60px 0 30px'}}/>
                                        {/*</div>*/}
                                        {/*</div>*/}
                                    </form>
                                </CardBody>
                                <CardFooter>
                                    <div className="form-group mb-0 clearfix text-center">
                                        <Link to="/login" className="btn btn-link">Уже есть профиль? Войти</Link>
                                    </div>
                                </CardFooter>
                            </CardContainer>

                        </Col>
                    </Row>
                </Container>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.auth.isError,
        error: state.auth.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(RegisterCard));