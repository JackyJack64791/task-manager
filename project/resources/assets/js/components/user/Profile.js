import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Panel from "../Panel";
import InfoProperty from "../InfoProperty";

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
        return ["Full Name", "Email", "Login", "Address", "Bank card number", "Phone number"];
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
    }
}

export default connect(mapStateToProps, null)(Profile);