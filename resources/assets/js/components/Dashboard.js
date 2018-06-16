import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader} from "reactstrap";
import {Bar} from "react-chartjs-2";

class Dashboard extends Component{

    componentDidMount() {
        if(!this.props.authenticated) this.props.history.push("/login")
    }
    constructor(props)
    {
        super(props);
        this.state = {
            barData: {}
        }
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        tasks: state.task.tasks,
    }
}

export default connect(mapStateToProps, null)(Dashboard);