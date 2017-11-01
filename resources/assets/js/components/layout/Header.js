import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../user/Profile";

class Header extends Component{
    renderLinks(){
        if(this.props.authenticated){
            return[
                <li className="nav-item pull-xs-right" key={3}>
                    <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                </li>,

            ];
        }else{
            return [
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/register" component={Register}>&nbsp;Register</Link>
                </li>,
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/login" component={Login}>Login</Link>
                </li>,
                <li className="nav-item" key={0}>
                    <Link className="nav-link" to="/profile" component={Profile}>Profile</Link>
                </li>
            ];
        }
    }
    userInfo(){

    }
    render(){
        return (
        <nav className="navbar navbar-default">
            <div className="navbar-header">
                <Link className="nav-item nav-link" to='/'>Task Manager</Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
                {this.userInfo()}
            </ul>
        </nav>
        )
    }
}

export default Header;