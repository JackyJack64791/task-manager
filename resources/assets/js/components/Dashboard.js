import React, {Component} from 'react';
import {connect} from "react-redux";

class Dashboard extends Component{
    componentDidMount() {
        if(!this.props.authenticated) this.props.history.push("/login")
    }
    render(){
        return (
            <div>
                <h1 className="h1">Home page</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    }
}

export default connect(mapStateToProps, null)(Dashboard);