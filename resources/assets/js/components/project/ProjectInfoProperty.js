import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class ProjectInfoProperty extends Component {

    render() {
        return <li className="list-group-item">
            <h4>{this.props.name}</h4>
            <p>{this.props.value}</p>
        </li>
    }

}
function mapStateToProps(state) {
    return {

    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectInfoProperty));

