import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

class ProjectTab extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        if(confirm("Are you sure?")) this.props.projectDelete(this.props.id);
    }
    render() {
        return (
            <button type="button" className="close glyphicon glyphicon-remove" aria-label="Close" onClick={this.handleSubmit}><span aria-hidden="true"></span></button>)
    }

}
function mapStateToProps(state) {
    return {

    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectTab));

