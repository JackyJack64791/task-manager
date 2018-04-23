import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from '../Tab';

class ProjectTab extends Component {
    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }
    deleteProject(){
        this.props.projectDelete(this.props.id);
    }
    render() {
        return <Tab deleteAction={this.deleteProject} linkEdit={`/project/edit/${this.props.id}`}>
            <h3><Link to={"/project/info/"+this.props.id}>{this.props.name}</Link></h3>
             <p>{this.props.description}</p>
         </Tab>;
    }

}
export default connect(null,actions)(ProjectTab);

