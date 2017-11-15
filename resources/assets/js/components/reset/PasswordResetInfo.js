import React, {Component} from 'react';
import {withRouter} from 'react-router';
import Panel from "../Panel";

class PasswordResetInfo extends Component {
    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
        if(!this.props.location.state.email) this.props.history.push("/reset/email");
    }

    render() {
        return <Panel title="Password Reset">
            <p>Email was sent to {this.props.location.state.email}. Check your inbox.</p>
        </Panel>;
    }
}

export default withRouter(PasswordResetInfo);