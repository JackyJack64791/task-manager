import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';

class RegisterAvatar extends Component {
    render(){
        return <div></div>
    }
}

export default withRouter(connect(null,actions)(RegisterAvatar));