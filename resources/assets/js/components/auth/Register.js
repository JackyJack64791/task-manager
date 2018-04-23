import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import RegisterCredentials from "./RegisterCredentials";
import RegisterAvatar from "./RegisterAvatar";
import RegisterTeam from "./RegisterTeam";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step:1,
            // fullName: '',
            // email: '',
            // login: '',
            // password: '',
            // passwordConfirmation: '',
            // address: '',
            // phone: '',
            // bankCard: ''
        }
    }
    // saveValues: function(field_value) {
    //     return function() {
    //         fieldValues = assign({}, fieldValues, field_value)
    //     }.bind(this)()
    // },

    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }
    previousStep() {
        this.setState({
            step: this.state.step + 1
        })
    }
    showStep() {
        switch (this.state.step) {
            case 1:
                return <RegisterCredentials />;
            case 2:
                return <RegisterAvatar />;
            case 3:
                return <RegisterTeam />;
            case 4:
                return <Success />;
            default:
                return;
        }
    }
    render(){

    }
}

export default withRouter(connect(null,actions)(Register));