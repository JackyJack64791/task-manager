import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from '../Tab';
import {Badge} from "reactstrap";

class ProjectTab extends Component {
    constructor(props){
        super(props);
        this.deleteProject = this.deleteProject.bind(this);
    }
    deleteProject(){
        this.props.projectDelete(this.props.id);
    }
    render() {
        let statuses = {
            'new_project': 'Новый проект',
            'project_is_performing': 'Проект в разработке',
            'project_is_ready': 'Проект закончен',
        };
        return <Tab deleteAction={this.deleteProject} linkEdit={`/project/edit/${this.props.id}`}>
            <h3><Link to={"/project/info/"+this.props.id}>{this.props.name}</Link></h3>
             <p>{this.props.description}</p>
            <Badge style={{margin:2, fontSize: 1.2 +'em'}}>{statuses[this.props.status]}</Badge>
         </Tab>;
    }

}
export default connect(null,actions)(ProjectTab);

