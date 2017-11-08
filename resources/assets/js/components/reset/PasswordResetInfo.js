import React, {Component} from 'react';

class PasswordResetInfo extends Component {
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Password Reset</div>
                        <div className="panel-body">
                            <p>Email was sent to 123. Check your inbox.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default PasswordResetInfo;