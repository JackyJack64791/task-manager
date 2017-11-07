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
    componentDidMount()
    {
        if(this.props.authenticated !== false) this.props.userInfo();
    }
    userProperty(){

        if (this.props.authenticated === false) {

            return <thead>Please, <Link to="/login">sign in</Link></thead>
        } else {//instanceof Array) {
            // return <tr>{this.props.user.address}</tr>
                Object.keys(this.props.user).map(function(key){
                    return <UserProperty key={key} value=1/>
                });//this.props.user.map(function(key, value){
                  //return <UserProperty key={key} value={value}/>
                //});
            // return Object.keys(this.props.user).map((name,value)=> {
            //         return <UserProperty name={name} value={value}/>;
            //     });
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
                                <table>
                                    {this.userProperty()}
                                </table>
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
        user: state.auth.user,
        authenticated:state.auth.authenticated,

    }
}
export default connect(mapStateToProps,actions)(Profile);