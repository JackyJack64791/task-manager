import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProjectDelete from './ProjectDelete';
import ProjectEditButton from './ProjectEditButton';

class ProjectTab extends Component {

    render() {
        return <li className="list-group-item">
            <ProjectDelete id={this.props.id}/>
            <ProjectEditButton id={this.props.id}/>
            <h3><Link to={`/project/info/${this.props.id}`} params={{id:this.props.id}}>{this.props.name}</Link></h3>
             <p>{this.props.description}</p>
        </li>;
    }

}
function mapStateToProps(state) {
    return {

    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectTab));

