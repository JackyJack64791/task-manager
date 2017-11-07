import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

class UserProperty extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.key}</td>
                <td>{this.props.value}</td>
            </tr>
        );
    }
}

export default UserProperty;