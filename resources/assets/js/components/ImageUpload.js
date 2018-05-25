import * as actions from "../actions";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import React, {Component} from 'react';
// const { Component } = React
// const { render } = ReactDOM
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import {Col, FormGroup} from "reactstrap";


const handleDropRejected = (...args) => console.log('reject', args);

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = { preview: null };
        this.handleDrop = this.handleDrop.bind(this)
    }

    handleDrop([{ preview }]) {
        this.setState({ preview })
    }

    render() {
        const { preview } = this.state;

        return (
            <FormGroup row>
                <Col md={4}>
                    <div>
                <Dropzone className="dropzone"
                          onDrop={ this.handleDrop }
                          accept="image/jpeg,image/jpg,image/tiff,image/gif"
                          multiple={ false }
                          onDropRejected={ handleDropRejected }
                >
                    Drag a file here or click to upload.
                    {/*<img className="img">*/}

                </Dropzone>
                        <div className="img_preview">

                        </div>
                    </div>
                </Col>
                <Col md={8}>
                { preview && <Cropper
                    ref='cropper'
                    dragMode="crop"

                    style={{height: 400,}}
                    src={ preview }
                    guides={false}
                    preview=".img_preview"
                /> }
                </Col>
            </FormGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        teams: state.team.teams,
        authenticated: state.auth.authenticated,
    }
}
export default withRouter(connect(mapStateToProps, actions)(ImageUpload));