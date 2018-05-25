import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import TeamTab from "./TeamTab";
import Panel from "../Panel";
import {Col, Row} from "reactstrap";

class TeamList extends Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    teamsRender() {
         // if(this.props.teams.length > 0)
        return this.props.teams.map((key) => <TeamTab id={key.id} name={key.name} description={key.description}/>
        );
    }

    render() {
            if (!this.props.teams.length) {
                return <Panel title="Команды">
                    <p>Ошибка загрузки команд, попробуйте еще раз.
                    </p>
                    <Row className="justify-content-center">
                        <Col sm={12}>
                            <Link className="btn btn-primary btn-lg" to='/team/create'>Создать команду</Link>
                        </Col>
                    </Row>
                </Panel>
            }
            else return (<Panel title="Команды">
            {/*<img src={this.props.user.img_path}/>*/}
            <ul className="list-group">
                {this.teamsRender()}
            </ul>
            <Link className="btn btn-primary mt-4" to='/team/create'>Создать новую команду</Link>
                <Link className="btn btn-primary mt-4 ml-2" to='/team_choose'>Выбрать команду</Link>
        </Panel>);
    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        authenticated: state.auth.authenticated,
        teams: state.team.teams,
        isLoading: state.team.isLoading,
        getSuccess: state.team.getSuccess,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TeamList));

