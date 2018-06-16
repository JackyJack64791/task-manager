import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from "../../actions";
import Button from "bootstrap/js/src/button";

class TeamUserRemove extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(i, e) {
        e.preventDefault();
        if (confirm("Вы уверены?")) this.props.teamUserRemove({
            team_id: this.props.teamId,
            user_id: this.props.userId
        })
    }

    render() {
        return <Button color="secondary" type="button"
                       onClick={(e) => this.handleDelete(this.props.userId, e)}><span
            aria-hidden="true">&times;</span>
        </Button>;
    }


}
function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, actions)(TeamUserRemove);