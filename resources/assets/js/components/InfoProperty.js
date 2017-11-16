import React, {Component} from 'react';

class InfoProperty extends Component {

    render() {
        switch(this.props.style){
            case "list":
                return <li className="list-group-item">
                    <h4>{this.props.name}</h4>
                    <p>{this.props.value}</p>
                </li>;
            case "table":
                return <tr>
                    <td className="user-property">{this.props.name}</td>
                    <td className="user-value">{this.props.value}</td>
                </tr>;
            default:
        }

    }

}
export default (InfoProperty);