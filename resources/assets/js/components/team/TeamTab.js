import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from '../Tab';

class TeamTab extends Component {
    constructor(props){
        super(props);
        this.deleteTeam = this.deleteTeam.bind(this);
    }
    deleteTeam(){
        this.props.teamDelete(this.props.id);
    }
    render() {
        return <Tab deleteAction={this.deleteTeam} linkEdit={`/team/edit/${this.props.id}`}>
            <h3><Link to={"/team/info/"+this.props.id}>{this.props.name}</Link></h3>
            <p>{this.props.description}</p>
        </Tab>;
    }

}
export default connect(null,actions)(TeamTab);

