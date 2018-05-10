import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Panel from "../../Panel";
import CommentTab from "./CommentTab";
import * as actions from '../../../actions/index';
import CommentForm from "./CommentForm";


class CommentList extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.getSuccessComments && !this.props.isLoadingComments) {
            // console.log(this.props.key);
            this.props.getComments(this.props.id);
        }
    }


    commentsRender() {
        if(this.props.comments.length) {
            return this.props.comments.map((key) => {
                    return <CommentTab id={key.id} author={key.author_id} text={key.text}/>
                }
            )
        }

    }

    render() {
        // if (this.props.comments.length)
            return <Panel title="Комментарии">
            {this.commentsRender() }
                <hr/>
            <CommentForm id={this.props.id}/>
            {/*<Link className="btn btn-primary" to='/task/create'>Create New Task</Link>*/}
        </Panel>
    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        authenticated: state.auth.authenticated,
        tasks: state.task.tasks,
        projects: state.project.projects,
        comments: state.comment.comments,
        getSuccessComments: state.comment.getSuccess,
        isLoadingComments: state.comment.isLoading,
    }
}

export default withRouter(connect(mapStateToProps, actions)(CommentList));

