import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

class UserProperty extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.value}</td>
            </tr>
        );
    }
}

export default UserProperty;