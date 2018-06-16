import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import Panel from "../Panel";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class ProjectCreate extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
        if (!this.props.user.roles.some(item => item.role === 'project_manager') &&
            !this.props.user.roles.some(item => item.role === 'admin')) this.props.history.push("/projects");
    }

    constructor(props) {
        super(props);
        this.state = {
            customer_name: '',
            customer_id: '',
            title: '',
            deadline: '',
            description: '',
            specification: '',
            specification_file: '',
            handleCustomerChange: true,
            handleSpecificationChange: true
        };
        this.handleCustomerId = this.handleCustomerId.bind(this);
        this.handleCustomerName = this.handleCustomerName.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSpecification = this.handleSpecification.bind(this);
        this.handleSpecificationFile = this.handleSpecificationFile.bind(this);
        this.createImage = this.createImage.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSpecificationChange = this.handleSpecificationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    customers() {
        return this.props.users.map((key) =>
            <option value={key.id}>{key.full_name}</option>
        )

    }

    handleCustomerName(e) {
        this.setState({
            customer_name: e.target.value
        })
    }
    handleCustomerId(e) {
        this.setState({
            customer_id: e.target.value
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
        this.state.handleSpecificationChange ?
            this.setState({specification_file: e.target.files[0]}) :
            this.setState({specification_path: e.target.value})
    }

    handleCustomerChange(e) {
        this.setState({
            handleCustomerChange: e.target.checked
        })
    }

    handleSpecificationChange(e) {
        this.setState({
            handleSpecificationChange: e.target.checked
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const project = {
            customer_name: this.state.customer_name,
            customer_id: this.state.customer_id,
            title: this.state.title,
            deadline: this.state.deadline,
            description: this.state.description,
            specification_path: this.state.specification_path,
            specification_file: this.state.specification_file,
            team_id: this.props.currentTeam,
        };
        this.props.projectCreate(project, this.handleRedirect);
    }
    handleSpecificationFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                specification_file: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }

    handleRedirect() {
        if (!this.props.isError) this.props.history.push("/projects");
    }

    customerChange() {
        if (this.state.handleCustomerChange)
            return (<Input type="select" id="customer" defaultValue="0" onChange={this.handleCustomerId} required>
                <option disabled value="0">Выберите заказчика</option>
                {this.customers()}
            </Input>);
        else return <Input id="customer" type="text" name="customer" required onChange={this.handleCustomerName}/>
    }

    specificationChange() {
        // if (this.state.handleSpecificationChange)
            // return (<Input type="file" id="specification" name="specification" onChange={this.handleSpecification} required>
            {/*</Input>);*/}
        // else
            return <Input id="specification" type="text" name="specification" required onChange={this.handleSpecification}/>
    }

    render() {
        return (<Panel title="Создание нового проекта">
            {this.props.isError ? <p className="error">{this.props.error}</p> : ""}
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label for="customer_choose" sm={4}>Заказчик из вашей команды?</Label>
                    <Col sm={8}>
                        <Label className="switch switch-3d switch-primary">
                            <Input id="customer_choose" type="checkbox" className="switch-input" defaultChecked
                                   onChange={this.handleCustomerChange}/>
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
                        <Input type="textarea" id="description" name="description" required
                               onChange={this.handleDescription}/>
                    </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                    {/*<Label for="specification_choose" sm={4}>Спецификация представлена файлом?</Label>*/}
                    {/*<Col sm={8}>*/}
                        {/*<Label className="switch switch-3d switch-primary">*/}
                            {/*<Input id="customer_choose" type="checkbox" className="switch-input" defaultChecked*/}
                                   {/*onChange={this.handleSpecificationChange}/>*/}
                            {/*<span className="switch-label"></span>*/}
                            {/*<span className="switch-handle"></span>*/}
                        {/*</Label>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}
                <FormGroup row>
                    <Label for="specification" sm={4}>Спецификация</Label>
                    <Col sm={8}>
                        {/*<Input id="specification" type="text"*/}
                               {/*name="specification" required onChange={this.handleSpecification}/>*/}
                        {this.specificationChange()}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={8}>
                        <Button type="submit" color="primary">
                            Создать проект
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isError: state.user.isError,
        error: state.project.error,
        user: state.user.user,
        users: state.user.users,
        currentTeam: state.auth.currentTeam,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectCreate));

