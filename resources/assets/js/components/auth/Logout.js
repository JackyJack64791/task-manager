import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';

class Logout extends Component {
    componentWillMount(){
        this.props.logoutUser();
        this.props.history.push("/");
    }
    render(){
        return <div></div>
    }
}

export default withRouter(connect(null,actions)(Logout));