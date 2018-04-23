import React, {Component} from 'react';

class DeleteButton extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(){
        if(confirm("Вы уверены?")) this.props.submit();
    }
    render() {
        return (
            <button type="button" className="close" aria-label="Close" onClick={this.handleSubmit}>
            <span aria-hidden="true">&times;</span>
            </button>
        )
    }

}
export default (DeleteButton);