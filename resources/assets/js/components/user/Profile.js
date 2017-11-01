import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import UserProperty from "./UserProperty";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {user:null};
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/profile')
            .then(response => {
                this.setState({user: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    userProperty(){
        if(this.state.user instanceof Array) {
            return this.state.user.map((name,value)=>{
                return <UserProperty name={name} value={value}/>;
            })
        }
        //else return <thead>Please, sign in</thead>
    }
    render()
    {
        return (
            <div>
                <h1>User</h1>
                <h2>{this.state.user}</h2>
                <table className="table table-hover">
                    <tbody>
                    {this.userProperty()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Profile;