import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import Panel from "../Panel";

class Login extends Component {

    render() {
        return (<Panel title="Login">
            <LoginForm/>
        </Panel>);
    }

}

export default Login;

