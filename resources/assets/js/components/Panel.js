import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";

class Panel extends Component {

    render() {
        return (<Container>
            <Row className="justify-content-center">
                <Col sm={12}>
                    <Card>
                        <CardHeader>{this.props.title}</CardHeader>
                        <CardBody>
                            {this.props.children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>);
    }

}

export default Panel;