import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';

class Logout extends Component {
    componentWillMount(){
        this.props.logoutUser(this.handleRedirect.bind(this));
        console.log('LOGOUT');
        // this.props.history.push("/login");
    }
    handleRedirect() {
        this.props.history.push("/login");
    }
    render(){
        return <div></div>
    }
}

export default withRouter(connect(null,actions)(Logout));