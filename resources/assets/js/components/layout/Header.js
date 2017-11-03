import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../user/Profile";
import {connect} from 'react-redux';

class Header extends Component{
    renderLinks(){
        if(this.props.authenticated){
            return[
                <li className="nav-item pull-xs-right" key={3}>
                    <Link className="nav-item nav-link" to="/logout">Logout</Link>
                </li>,
                this.userLogged()

            ]
        }else{
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/register" component={Register}>&nbsp;Register</Link>
                </li>,
                <li className="nav-item" key={0}>
                    <Link className="nav-link" to="/login" component={Login}>Login</Link>
                </li>,

            ];
        }
    }
    userLogged(){
        return (
            <li className="nav-item" key={2}>
                <Link className="nav-link" to="/profile" component={Profile}>Profile</Link>
            </li>
        );
    }
    render(){
        return (
        <nav className="navbar navbar-default">
            <div className="navbar-header">
                <Link className="navbar-brand" to='/'>Task Manager</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
            </ul>
        </nav>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated:state.auth.authenticated
    }
}

export default connect(mapStateToProps, null)(Header);