import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Register from "../auth/Register";
import Login from "../auth/Login";
import * as actions from '../../actions/actions';
import Profile from "../user/Profile";
import {connect} from 'react-redux';

class Header extends Component{
    componentDidMount(){
        if(this.props.authenticated !== false) this.props.userInfo();
    }
    renderLinks(){
        if(this.props.authenticated){
            return this.userLogged();
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
        <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                     <a id="drop1" href="#" className="dropdown-toggle" data-toggle="dropdown">
                                         {this.props.user.full_name}
                                         <span className="caret"></span>
                                     </a>
                                     <ul className="dropdown-menu">
                                         <li><Link className="dropdown-item" to="/profile/info">Profile</Link></li>
                                         <li className="divider"></li>
                                         <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                                     </ul>
                                 </li>
                             </ul>
        )
    }
    render(){
        // return (
        //     <nav className="navbar navbar-default navbar-static">
        //         <div className="container-fluid">
        //             <div className="navbar-header">
        //                 <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".js-navbar">
        //                     <span className="sr-only">Toggle navigation</span>
        //                     <span className="icon-bar"></span>
        //                     <span className="icon-bar"></span>
        //                     <span className="icon-bar"></span>
        //                 </button>
        //                 <a className="navbar-brand" href="#" >Название проекта</a>
        //             </div>
        //             <div className="collapse navbar-collapse js-navbar">
        //                 <ul className="nav navbar-nav">
        //                     <li><a href="#">Главная</a></li>
        //                     <li className="dropdown">
        //                         <a id="drop1" href="#" className="dropdown-toggle" data-toggle="dropdown">
        //                             Меню
        //                             <span className="caret"></span>
        //                         </a>
        //                         <ul className="dropdown-menu">
        //                             <li><a href="#">Текст подпункта</a></li>
        //                             <li><a href="#">Текст подпункта</a></li>
        //                             <li className="divider"></li>
        //                             <li><a href="#">Текст подпункта</a></li>
        //                         </ul>
        //                     </li>
        //                     <li className="dropdown">
        //                         <a id="drop1" href="#" className="dropdown-toggle" data-toggle="dropdown">
        //                             Меню
        //                             <span className="caret"></span>
        //                         </a>
        //                         <ul className="dropdown-menu">
        //                             <li><a href="#">Текст подпункта</a></li>
        //                             <li><a href="#">Текст подпункта</a></li>
        //                             <li className="divider"></li>
        //                             <li><a href="#">Текст подпункта</a></li>
        //                         </ul>
        //                     </li>
        //                 </ul>
        //                 <ul className="nav navbar-nav navbar-right">
        //                     <li className="dropdown">
        //                         <a id="drop1" href="#" className="dropdown-toggle" data-toggle="dropdown">
        //                             Меню
        //                             <span className="caret"></span>
        //                         </a>
        //                         <ul className="dropdown-menu">
        //                             <li><a href="#">Текст подпункта</a></li>
        //                             <li><a href="#">Текст подпункта</a></li>
        //                             <li className="divider"></li>
        //                             <li><a href="#">Текст подпункта</a></li>
        //                         </ul>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        //)
        return (
                <nav className="navbar navbar-default navbar-static">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to='/'>Task Manager</Link>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            {this.renderLinks()}
                        </ul>
                    </div>

                </nav>

        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated:state.auth.authenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, actions)(Header);