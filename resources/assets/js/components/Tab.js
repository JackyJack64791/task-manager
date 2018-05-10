import React, {Component} from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

class Tab extends Component {

    render() {
        return <li className="list-group-item">
            <DeleteButton submit={this.props.deleteAction}/>
            {/*{this.props.linkEdit ? <EditButton link={this.props.linkEdit} : ''}*/}
            {this.props.children}
        </li>;
    }

}

export default Tab;

