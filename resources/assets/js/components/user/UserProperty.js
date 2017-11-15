import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

class UserProperty extends Component {

    constructor(props){
        super(props);
        this.state = {name:'',value:''};
        this.handleName = this.handleName.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }
    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleValue(e) {
        this.setState({
            value:e.target.value
        })
    }

    render() {
        // if(!this.props.editing) {
            return (
                <tr>
                    <td className="user-property">{this.props.name}</td>
                    <td className="user-value">{this.props.value}</td>
                </tr>
            );
        }
        // else return (
        //     <tr>
        //         <td><label htmlFor="prop" className="user-property control-label">{this.props.name}</label></td>
        //         <td><input name="prop" type="text" className="user-value form-control"  value={this.props.value} onChange={this.handleValue}/></td>
        //     </tr>
        // )
   // }
}

export default UserProperty;