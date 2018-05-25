import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import * as actions from '../../actions/index';
import Cards from 'react-credit-cards';
import Panel from "../Panel";
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class LoginTeam extends Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.user.id,
            team: '',
        };
        console.log(this.props.user.id,'ID');
        this.handleTeam = this.handleTeam.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleTeam(e) {
        this.setState({
            team: e.target.value
        })
    }

    teams(){
        return this.props.teams.map((key) =>
            <option value={key.id}>{key.name}</option>
        )
    }

    handleRedirect() {
        this.props.history.push("/projects");
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.setState({fireRedirect: true});
        const team = this.state.team;
        this.props.loginTeam(team, this.handleRedirect);
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
                                        <h1>Выберите команду</h1>
                                        <p className="text-muted">Выберите одну из ваших команд, с которой вы хотите работать сейчас</p>
                                        <InputGroup className="mb-3">
                                            <Input type="select" defaultValue="0" onChange={this.handleTeam} required autoFocus>
                                                <option disabled value="0">Выберите команду...</option>
                                                {this.teams()}
                                            </Input>
                                        </InputGroup>
                                        <Button type="submit" color="primary" block>Выбрать</Button>
                                    </form>
                                </CardBody>
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
        user: state.user.user,
        teams: state.team.teams,
    }
}

export default withRouter(connect(mapStateToProps, actions)(LoginTeam));