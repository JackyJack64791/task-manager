import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class ProjectCreate extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    constructor(props) {
        super(props);
        this.state = {customer: '', title: '', deadline: '', description: '', specification: '', handleCustomerChange: true};
        this.handleCustomer = this.handleCustomer.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSpecification = this.handleSpecification.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    customers() {
        return this.props.users.map((key) =>
            <option value={key.id}>{key.full_name}</option>
        )

    }

    handleCustomer(e) {
        this.setState({
            customer: e.target.value
        })
    }

    handleTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDeadline(e) {
        this.setState({
            deadline: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }


    handleSpecification(e) {
        this.setState({
            specification: e.target.value
        })
    }

    handleCustomerChange(e) {
        this.setState({
            handleCustomerChange: e.target.checked
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const project = {
            customer: this.state.customer,
            title: this.state.title,
            deadline: this.state.deadline,
            description: this.state.description,
            specification_path: this.state.specification_path,
        };
        this.props.projectCreate(project, this.handleRedirect);
    }

    handleRedirect() {
        if (!this.props.isError) this.props.history.push("/projects");
    }

    customerChange() {
        console.log(this.state.handleCustomerChange);
        if(this.state.handleCustomerChange)
            return (<Input type="select" id="customer" defaultValue="0" onChange={this.handleCustomer} required>
                <option disabled value="0">Выберите заказчика</option>
                {this.customers()}
            </Input>);
        else return <Input id="customer" type="text" name="customer" required onChange={this.handleCustomer}/>
    }
    render() {
        return (<Panel title="Создание нового проекта">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="customer_choose" sm={4}>Заказчик из вашей команды?</Label>
                    <Col sm={8}>
                <Label className="switch switch-3d switch-primary">
                    <Input id="customer_choose" type="checkbox" className="switch-input" defaultChecked onChange={this.handleCustomerChange}/>
                    <span className="switch-label"></span>
                    <span className="switch-handle"></span>
                </Label>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="customer" sm={4}>Заказчик</Label>
                    <Col sm={8}>
                        {/*<Input type="select" id="customer" defaultValue="0" onChange={this.handleCustomer}*/}
                                {/*required>*/}
                            {/*<option disabled value="0">Choose customer...</option>*/}
                            {/*{this.customers()}*/}
                        {/*</Input>*/}
                        {this.customerChange()}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="title" sm={4}>Название</Label>
                    <Col sm={8}>
                        <Input id="title" type="text" name="title" required onChange={this.handleTitle}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="deadline" sm={4}>Дата окончания</Label>

                    <Col sm={8}>
                        <Input id="deadline" type="date" name="deadline" required onChange={this.handleDeadline}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={4}>Описание</Label>
                    <Col sm={8}>
                        <Input type="textarea" id="description" name="description" required onChange={this.handleDescription}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="specification" sm={4}>Спецификация</Label>
                    <Col sm={8}>
                        <Input id="specification" type="text"
                               name="specification" required onChange={this.handleSpecification}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={8}>
                        <Button type="submit" color="primary">
                            Создать проект
                        </Button>
                    </Col>
                </FormGroup>
                {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            </Form>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.user.isError,
        error: state.user.error,
        users: state.user.users,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectCreate));

