import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

class ProjectList extends Component {

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Project List</div>
                        <div className="panel-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}
function mapStateToProps(state) {
    return {

    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectList));

