import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Card, CardBody, CardGroup, CardHeader, Col, Container, Row} from "reactstrap";

class PasswordResetInfo extends Component {
    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
        if (!this.props.location.state.email) this.props.history.push("/reset/email");
    }

    render() {
        return             <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card>
                                <CardHeader>Сброс пароля</CardHeader>
                                <CardBody>
            <p>Письмо с ссылкой на страницу сброса пароля отправлено на {this.props.location.state.email}. Проверьте ваш почтовый ящик</p>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>;
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    }
}
export default withRouter(connect(mapStateToProps, null)(PasswordResetInfo));