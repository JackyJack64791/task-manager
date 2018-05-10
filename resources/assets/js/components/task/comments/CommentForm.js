import React, {Component} from 'react';
import * as actions from '../../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from "../../Tab";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            'text': '',
            'task_id': this.props.id,
        };
        this.handleText = this.handleText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleText(e) {
        this.setState({
            text: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const comment = {
            text: this.state.text,
            task_id: this.state.task_id,

        };
        this.props.commentCreate(comment);
    }

    render() {
        return <Row>
          <Col sm={12}>
              <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                      <Input id="task_id" type="hidden" value={this.state.id}/>
                      <Col sm={12}>
                          <Input id="text" type="textarea" onChange={this.handleText}
                                 required>
                          </Input>
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Col sm={8}>
                          <Button type="submit" color="primary">
                              Комментировать
                          </Button>
                      </Col>
                  </FormGroup>
              </Form>
          </Col>
        </Row>
    }

}

export default connect(null,actions)(CommentForm);

