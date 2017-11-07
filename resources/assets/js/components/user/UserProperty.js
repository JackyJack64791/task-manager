import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

class UserProperty extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>
                <td className="user-property">{this.props.name}</td>
                <td className="user-value">{this.props.value}</td>
            </tr>
        );
    }
}

export default UserProperty;