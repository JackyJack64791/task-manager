import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

class PasswordResetEmail extends Component {
    componentDidMount(){
        if(this.props.authenticated) this.props.history.push("/profile/info");
    }

    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleRedirect()
    {
        this.props.history.push({
            pathname: "/reset/info",
            state: {email: this.state.email}
        })
    }
    handleSubmit (e) {
        e.preventDefault();
        this.props.resetSendEmail(this.state.email,this.handleRedirect);
    }
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Password Reset</div>
                        <div className="panel-body">
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <fieldset className="form-group">
                                    <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control"
                                               placeholder="johndoe@example.com" name="email" required autoFocus onChange={this.handleEmail}/>
                                    </div>
                                </fieldset>
                                <fieldset className="form-group">
                                    <div className="col-md-8 col-md-offset-4">
                                        <button type="submit" className="btn btn-primary">
                                            Send Link
                                        </button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        authenticated:state.auth.authenticated,
    }
}
export default withRouter(connect(mapStateToProps,actions)(PasswordResetEmail));