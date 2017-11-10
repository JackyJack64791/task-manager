import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ProjectDelete from './ProjectDelete';

class ProjectTab extends Component {

    render() {
        return <li className="list-group-item">{this.props.title}<ProjectDelete id={this.props.id}/>
        <blockquote>{this.props.description}</blockquote>
        </li>;
    }

}
function mapStateToProps(state) {
    return {

    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectTab));

