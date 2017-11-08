import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import UserProperty from "./UserProperty";
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Profile extends Component {
    constructor(props){
        super(props);
    }
    filterUser(user){
        return Array.filter(Object.keys(user),function(value){
            return value !== "id" && value !== "created_at" && value !== "updated_at"
        });
    }
    getPropertyNames()
    {
        return ["Full Name","Email","Login","Address","Bank card number", "Phone number"];
    }
    componentDidMount()
    {
        if(this.props.user === null) this.props.userInfo();
    }
    userProperty(){

        if (this.props.authenticated === false) {

            return <thead>Please, <Link to="/login">sign in</Link></thead>
        } else {
            let user = this.filterUser(this.props.user);
            let names = this.getPropertyNames();
                return user.map((key, i)=>
                   <UserProperty name={names[i]} value={this.props.user[key]}/>
                )
        }
    }
    render()
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">User</div>
                            <div className="panel-body">
                                <table className="table table-responsive">
                                    <tbody>
                                    {this.userProperty()}
                                    </tbody>
                                </table>
                                <div className="form-group">
                                    <div className="col-md-6 col-md-offset-4">
                                        <Link className="btn btn-primary" to='/profile/settings'>Edit Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        authenticated:state.auth.authenticated,

    }
}
export default connect(mapStateToProps,actions)(Profile);