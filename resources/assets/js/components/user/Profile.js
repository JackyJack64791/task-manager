import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Panel from "../Panel";
import InfoProperty from "../InfoProperty";
import {Col, FormGroup, Table} from "reactstrap";

class Profile extends Component {

    filterUser(user) {
        return (({full_name, email, login, address, bank_card, phone}) => ({
            full_name,
            email,
            login,
            address,
            bank_card,
            phone,
        }))(user)
    }

    getPropertyNames() {
        return ["ФИО", "Электронная почта", "Логин", "Адрес", "Номер банковской карты", "Номер телефона"];
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    userProperty() {
        let user = this.filterUser(this.props.user);
        // if(this.props.user.skills) user.skills = JSON.stringify(this.props.user.skills);
        let names = this.getPropertyNames();
        return Object.keys(user).map((key, i) =>
            <InfoProperty style="table" name={names[i]} value={this.props.user[key]} />
        )
    }
    skillProperty() {
        let skills = this.props.user.skills.map(a=>a.skill);
        return <InfoProperty style="table" name="Навыки" value={skills.join(', ')} />
    }

    // roleProperty() {
    //     let roles = this.props.user.roles.map(a=>a.role);
    //     let roleNames = {
    //       project_manager: 'Менеджер проектов',
    //       developer: 'Разработчик',
    //       tester: 'Тестировщик',
    //       client: 'Заказчик',
    //       admin: 'Администратор',
    //     };
    //     return <InfoProperty style="table" name="Роли в команде" value={roleNames.filter((a) => {return a === }).join(', ')} />
    // }

    render() {
        return (
            <Panel title="Профиль">
                <Table bordered striped hover responsive>
                    <tbody>
                    {this.userProperty()}
                    {this.skillProperty()}
                    {/*{this.roleProperty()}*/}
                    </tbody>
                </Table>
                <FormGroup row>
                    <Col sm={6}>
                        <Link className="btn btn-primary" to='/profile/settings'>Изменить профиль</Link>
                    </Col>
                </FormGroup>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentTeam: state.auth.currentTeam,
        user: state.user.user,
        authenticated: state.auth.authenticated,
    }
}

export default connect(mapStateToProps, null)(Profile);