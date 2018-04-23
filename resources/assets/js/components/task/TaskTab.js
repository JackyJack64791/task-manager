import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from "../Tab";

class TaskTab extends Component {
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
    }
    deleteTask(){
        this.props.taskDelete(this.props.id);
    }
    render() {
        return <Tab deleteAction={this.deleteTask} linkEdit={`/task/edit/${this.props.id}`}>
            <h3><Link to={"/task/info/"+this.props.id}>{this.props.name}</Link></h3>
            <p>{this.props.description}</p>
        </Tab>;
    }

}

export default connect(null,actions)(TaskTab);

