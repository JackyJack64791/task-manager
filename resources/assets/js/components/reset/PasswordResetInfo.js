import React, {Component} from 'react';
import {withRouter} from 'react-router';

class PasswordResetInfo extends Component {
    componentDidMount() {
        if (this.props.authenticated) this.props.history.push("/profile/info");
    }

    render() {
        return <Panel title="Password Reset">
            <p>Email was sent to {this.props.location.state.email}. Check your inbox.</p>
        </Panel>;
    }
}

export default withRouter(PasswordResetInfo);