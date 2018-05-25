import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Link} from 'react-router-dom';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class TeamEdit extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.user.roles.some(item => item.role === 'project_manager') &&
            !this.props.user.roles.some(item => item.role === 'admin')) this.props.history.push("/teams");
    }

    constructor(props) {
        super(props);
        const {id} = this.props.match.params;
        let team = this.props.teams.find(item => item.id == id);
        this.state = {
            id: team.id,
            author_id: team.author_id,
            name: team.name,
            description: team.description,
        };
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);;
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.state);
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

    handleRedirect() {
        this.props.history.push("/team/info/" + this.state.id);
    }

    handleSubmit(e) {
        e.preventDefault();
        const team = {
            id: this.state.id,
            author_id: this.state.author_id,
            name: this.state.name,
            description: this.state.description,
        };
        this.props.teamUpdate(team, this.handleRedirect);
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Panel title="Изменение команды">
                <Form onSubmit={this.handleSubmit}>
                    {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                    <FormGroup row>
                        <Label for="name" sm={4}>Название</Label>
                        <Col sm={8}>
                            <Input id="name" type="text" name="name" value={this.state.name} required onChange={this.handleName}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={4}>Описание</Label>
                        <Col sm={8}>
                            <Input id="description" type="textarea" value={this.state.description} name="description" required onChange={this.handleDescription}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={8}>
                            <Button type="submit" color="primary">
                                Изменить команду
                            </Button>
                            <Link to={"/team/info/" + id} className="btn btn-default">
                                Назад к команде
                            </Link>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user: state.user.user,
        teams: state.team.teams,
        isError: state.team.isError,
        error: state.team.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TeamEdit));

