import React, {Component} from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";
import {Button, Col, Form, FormGroup, Input, Label, Table} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import TeamUserRemove from "./TeamUserRemove";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            value: value,
        });
        this.props.onChangeEmail(value ? value : '');
    }

    getUsers(input) {
        if (!input || input.length < 3) {
            return Promise.resolve({options: []});
        }
        const ROOT_URL = location.protocol + '//' + location.host;
        return fetch(ROOT_URL + "/api/users/all/" + input,
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                return {options: json.items};
            });
    }

    render() {
        const AsyncComponent = Select.Async;
        return (
            <AsyncComponent multi={false}
                            value={this.state.value}
                            onChange={this.onChange}
                            valueKey="id"
                            labelKey="email"
                            loadOptions={this.getUsers}
                            backspaceRemoves={true}
                            placeholder="Поиск пользователей"
                            searchPromptText="Введите электронную почту"/>

        );
    }
}

class TeamInfo extends Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    filterTeam(team) {
        return (({name, description, author_id}) => ({
            name,
            description,
            author_id
        }))(team)
    }

    getPropertyTeamNames() {
        return {name: "Название", author_id: "Основатель", description: "Описание"};
    }

    teamTab(id) {
        let team = this.filterTeam(
            this.props.teams.find(item => item.id == id));
        console.log(team);
        console.log(this.props.users);
        // if(team.customer_id!=null) team.customer_id = this.props.users.find(item => item.id === team.customer_id).full_name;
        // else team.customer_id = team.customer_name;
        team.author_id = this.props.users.find(item => item.id === team.author_id).full_name;
        if (team.author_id === this.props.user.id)
            team.author_id += "(you)";
        let names = this.getPropertyTeamNames();
        return Object.keys(team).map((key) => {
                if (team[key])
                    return <InfoProperty style="list" name={names[key]} value={team[key]}/>
            }
        )
    }

    getPropertyUserNames() {
        return ["ФИО", "Электронная почта", "Логин", "Адрес"];
    }

    filterUser(user) {
        return (({full_name, email, login, address}) => ({
            full_name,
            email,
            login,
            address,
        }))(user)
    }

    participantsKeys(id) {
        let userKeys = this.getPropertyUserNames();
        return Object.keys(this.filterUser(this.props.users[0])).map((key, i) => {
                return <th>{userKeys[i]}</th>
            }
        )
    }

    participantsValues() {
        return this.props.users.map((key, i) =>
            <tr>
                <td>{key.full_name}</td>
                <td>{key.email}</td>
                <td>{key.login}</td>
                <td>{key.address}</td>
                {this.props.user.roles.some(item => item.role === 'project_manager') ||
                this.props.user.roles.some(item => item.role === 'admin') ?
                    <td>{key.id !== this.props.user.id ?
                        <Button color="secondary" type="button" onClick={(e) => this.handleDelete(key.id, e)}><span
                            aria-hidden="true">&times;</span>
                        </Button> : ''}
                    </td> : ''}

            </tr>
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.table = this.props.users;
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(value) {

        this.setState({
            email: value.email
        })
    }

    deleteFormat(cell, row, id) {
        return <TeamUserRemove userId={cell} teamId={id}/>
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const request = {
            id: this.props.match.params.id,
            email: this.state.email,
        };
        this.props.teamInvite(request);
        this.setState = {
            email: ''
        }
    }

    render() {
        const {id} = this.props.match.params;
        return (<div>
            <Panel title="Информация о команде">
                {/*<img src={this.props.user.img_path}/>*/}
                <ul className="list-group">
                    {this.teamTab(id)}
                </ul>
                <FormGroup row className="mt-2">
                    <div className="col-md-8 col-md-offset-4">
                        {this.props.user.roles.some(item => item.role === 'project_manager') ||
                        this.props.user.roles.some(item => item.role === 'admin') ?
                            <Link to={"/team/edit/" + id} className="btn btn-primary">
                                Изменить команду
                            </Link>
                            : ''}
                        <Link to={"/teams"} className="btn btn-default">
                            Назад к списку
                        </Link>
                    </div>
                </FormGroup>
            </Panel>
            <Panel title="Участники команды">
                <div className="animated">
                    <BootstrapTable data={this.table} version="4" striped hover pagination search
                                    options={this.options}>
                        <TableHeaderColumn dataField="full_name" dataSort>ФИО</TableHeaderColumn>
                        <TableHeaderColumn isKey dataField="email" dataSort>Электронная почта</TableHeaderColumn>
                        <TableHeaderColumn dataField="login" dataSort>Логин</TableHeaderColumn>
                        <TableHeaderColumn dataField="phone">Телефон</TableHeaderColumn>
                        {/*<TableHeaderColumn dataField="id" dataFormat={this.deleteFormat} extrafFormatData={id}>Выгнать*/}
                            {/*участника</TableHeaderColumn>*/}
                    </BootstrapTable>
                </div>
                <FormGroup row className="mt-2">
                    <div className="col-md-8 col-md-offset-4">
                        {this.props.user.roles.some(item => item.role === 'project_manager') ||
                        this.props.user.roles.some(item => item.role === 'admin') ?
                            <Form onSubmit={this.handleSubmit}>
                                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
                                <FormGroup row>
                                    <Label for="name" sm={4}>Добавить участника</Label>
                                    <Col sm={4}>
                                        <Users onChangeEmail={this.handleEmail}/>
                                    </Col>
                                    <Col sm={4}>
                                        <Button color="primary" type="submit">
                                            Добавить участника
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                            : ''}
                    </div>
                </FormGroup>
            </Panel>
        </div>);
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        authenticated: state.auth.authenticated,
        teams: state.team.teams,
        error: state.team.error,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TeamInfo));

