import React, {Component} from 'react';

class InfoProperty extends Component {

    render() {
        switch(this.props.style){
            case "list":
                return <li className="list-group-item">
                    <h4 className="list-property">{this.props.name}</h4>
                    <p className="list-value">{this.props.value ? this.props.value : '-'}</p>
                </li>;
            case "table":
                return <tr>
                    <td className="user-property">{this.props.name}</td>
                    <td className="user-value">{this.props.value ? this.props.value : '-'}</td>
                </tr>;
            default:
        }

    }

}
export default (InfoProperty);