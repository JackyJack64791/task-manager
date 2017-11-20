import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EditButton extends Component {
    render() {
        return (
            <Link type="button" className="button glyphicon glyphicon-pencil edit_button" to={this.props.link} aria-label="Edit"><span
                aria-hidden="true"></span></Link>)
    }
}

export default (EditButton);

