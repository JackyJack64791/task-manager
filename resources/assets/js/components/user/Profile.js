import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Panel from "../Panel";
import InfoProperty from "../InfoProperty";

class Profile extends Component {
    constructor(props) {
        super(props);
        // this.state = {editing:false};
        // this.handleClick = this.handleClick.bind(this);
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

    // handleClick(e){
    //     this.setState({
    //         editing:!this.state.editing
    //     });
    //     console.log(this.state.editing);
    // }
    getPropertyNames() {
        return ["Full Name", "Email", "Login", "Address", "Bank card number", "Phone number"];
    }

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        // if (!this.props.infoSuccess) this.props.userInfo();
    }

    userProperty() {
        let user = this.filterUser(this.props.user);
        let names = this.getPropertyNames();
        return Object.keys(user).map((key, i) =>
            <InfoProperty style="table" name={names[i]} value={this.props.user[key]} />//editing={this.state.editing}/>
        )
    }

    render() {
        let user;
        if (!this.props.isLoading) {
            user = this.props.user;
        }
        else {
            return <p>Loading...</p>;
        }
        return (user &&
            <Panel title="User">
                <table className="table table-responsive">
                    <tbody>
                    {this.userProperty()}
                    </tbody>
                </table>
                <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                        <Link className="btn btn-primary" to='/profile/settings'>Edit Profile</Link>
                        {/*<button className="btn btn-primary" onClick={this.handleClick}>Edit Profile</button>*/}
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