import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";
import {Card, CardBody, CardHeader, Row} from "reactstrap"
import Dropzone from 'react-dropzone';
import {Bar, Pie} from "react-chartjs-2";

class ProjectStats extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }
    constructor(props) {
        super(props);
        // const id = this.props.match.params;
        this.state = {
            tasks: this.props.tasks.filter(r => r.project_id == this.props.match.params.id)
        }
    }
    random_rgb() {
        var o = Math.round, r = Math.random, s = 255;
        return "rgb("+o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
    }
    render(){
        const colors = this.props.tasks.map(a => this.random_rgb())
        console.log(colors);
        const pie = {
            labels: this.state.tasks.map(a => a.title),
            datasets: [{
                data: this.state.tasks.map(a => a.hours_count || 0),
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        };
        return (
            <Card>
                <CardHeader>
                    Распределение нагрузки задач
                </CardHeader>
                <CardBody>

                    <div className="chart-wrapper">
                        <Pie data={pie}
                             options={{
                                 maintainAspectRatio: false
                             }}
                        />
                    </div>
                </CardBody>
            </Card>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        authenticated: state.auth.authenticated,
        projects: state.project.projects,
        tasks: state.task.tasks,
    }
}

export default withRouter(connect(mapStateToProps, actions)(ProjectStats));

