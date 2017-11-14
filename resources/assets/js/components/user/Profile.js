import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import UserProperty from "./UserProperty";
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Panel from "../Panel";

class Profile extends Component {
    constructor(props) {
        super(props);
    }

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
        return ["Full Name", "Email", "Login", "Address", "Bank card number", "Phone number"];
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.infoSuccess) this.props.userInfo();
    }

    userProperty() {
        let user = this.filterUser(this.props.user);
        let names = this.getPropertyNames();
        return Object.keys(user).map((key, i) =>
            <UserProperty name={names[i]} value={this.props.user[key]}/>
        )
    }

    render() {
        return (
            <Panel title="User">
                <table className="table table-responsive">
                    <tbody>
                    {this.userProperty()}
                    </tbody>
                </table>
                <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                        <Link className="btn btn-primary" to='/profile/settings'>Edit Profile</Link>
                    </div>
                </div>
            </Panel>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        authenticated: state.auth.authenticated,
        infoSuccess: state.user.infoSuccess,

    }
}

export default connect(mapStateToProps, actions)(Profile);