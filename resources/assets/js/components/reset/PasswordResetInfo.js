import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";

class PasswordResetInfo extends Component {
    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
        if (!this.props.location.state.email) this.props.history.push("/reset/email");
    }

    render() {
        return <Panel title="Password Reset">
            <p>Email was sent to {this.props.location.state.email}. Check your inbox.</p>
        </Panel>;
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    }
}
export default withRouter(connect(mapStateToProps, null)(PasswordResetInfo));