import React, {Component} from 'react';
import Header from './Header';

class Layout extends Component {

    render(){
        return (
            <div>
                <Header />
                <div className="content">
                    <h1>What a layout</h1>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout;