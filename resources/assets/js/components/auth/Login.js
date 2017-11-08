import React, {Component} from 'react';
import LoginForm from "./LoginForm";

class Login extends Component {

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Login</div>
                        <div className="panel-body">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
    
}

export default Login;

