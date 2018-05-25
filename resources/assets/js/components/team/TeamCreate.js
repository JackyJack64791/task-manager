import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class TeamCreate extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        this.state = {name: '',  description: ''};
        // this.handleCustomer = this.handleCustomer.bind(this);
        this.handleName = this.handleName.bind(this);
        // this.handleDeadline = this.handleDeadline.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        // this.handleSpecification = this.handleSpecification.bind(this);
        // this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const team = {
            name: this.state.name,
            description: this.state.description,
        };
        this.props.teamCreate(team, this.handleRedirect);
    }

    handleRedirect() {
        if (!this.props.isError) this.props.history.push("/teams");
    }

    render() {
        return (<Panel title="Создание новой команды">
            <Form onSubmit={this.handleSubmit}>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                <FormGroup row>
                    <Label for="name" sm={4}>Название</Label>
                    <Col sm={8}>
                        <Input id="name" type="text" name="name" required onChange={this.handleName}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="name" sm={4}>Описание</Label>
                    <Col sm={8}>
                        <Input id="description" type="textarea" name="description" required onChange={this.handleDescription}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={8}>
                        <Button type="submit" color="primary">
                            Создать команду
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.user.isError,
        error: state.team.error,
        users: state.user.users,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TeamCreate));

