import React, {Component} from 'react';
import {withRouter} from 'react-router';

class PasswordResetInfo extends Component {
    componentDidMount(){
        if(this.props.authenticated) this.props.history.push("/profile/info");
    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Password Reset</div>
                        <div className="panel-body">
                            <p>Email was sent to {this.props.location.state.email}. Check your inbox.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default withRouter(PasswordResetInfo);