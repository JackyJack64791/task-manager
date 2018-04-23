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
            phone
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
        let names = this.getPropertyNames();
        return Object.keys(user).map((key, i) =>
            <InfoProperty style="table" name={names[i]} value={this.props.user[key]} />
        )
    }

    render() {
        return (
            <Panel title="Профиль">
                <Table bordered striped hover responsive>
                    <tbody>
                    {this.userProperty()}
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
        user: state.user.user,
        authenticated: state.auth.authenticated,
    }
}

export default connect(mapStateToProps, null)(Profile);