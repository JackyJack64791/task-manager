import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../../actions/actions';
import {Link} from 'react-router-dom';

class ProjectEditButton extends Component {
    render() {
        // if (this.props.projects.find(function (item) {
        //         return item.id === this.props.id;
        //     })) {
            return (
                <Link type="button" className="button glyphicon glyphicon-pencil edit_button" to={`/project/edit/${this.props.id}`} aria-label="Edit"><span
                    aria-hidden="true"></span></Link>)
        }
        // else return <p>Ooops, you don't have access to this project</p>
   // }


}
function mapStateToProps(state) {
    return {
        //projects: state.project.projects,
    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectEditButton));

