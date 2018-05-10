import React, {Component} from 'react';
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from "../../Tab";

class CommentTab extends Component {
    constructor(props){
        super(props);
        // this.deleteComment = this.deleteComment.bind(this);
        console.log(this.props.text,"COMMENT");
    }
    deleteComment(){
        this.props.commentDelete(this.props.id);
    }
    author() {
        return this.props.users.find(key => key.id === this.props.author).full_name;
    }
    render() {
        // return
        return <Tab deleteAction={this.deleteComment}>
            <h4 className="list-property">{this.author()}</h4>
            <p className="list-value">{this.props.text}</p>
        </Tab>;
    }

}
function mapStateToProps(state) {
    return {
        // authenticated: state.auth.authenticated,
        // projects: state.project.projects,
        users: state.user.users,
        // isError: state.task.isError,
        // error: state.task.error,
    }
}

export default connect(mapStateToProps,actions)(CommentTab);

