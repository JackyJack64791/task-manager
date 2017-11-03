import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import UserProperty from "./UserProperty";
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Profile extends Component {
    // constructor(props){
    //     super(props);
    //     //this.state = {user:null};
    // }
    userProperty(){
        if(this.props.user !==null){//instanceof Array) {
            return <thead>{this.props.user.full_name}</thead>
            // return this.state.user.map((name,value)=>{
            //     return <UserProperty name={name} value={value}/>;
            // })
        }
        else {

            return <thead>Please, <Link to="/login">sign in</Link></thead>
        }
    }
    render()
    {
        return (
            <div>
                <h1>User</h1>
                {/*<h2>{this.state.user}</h2>*/}
                <table className="table table-hover">
                    <tbody>
                    {this.userProperty()}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        user: state.auth.user,
        //authenticated:state.auth.authenticated,

    }
}
export default connect(mapStateToProps,actions)(Profile);