import React, {Component} from 'react';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InfoProperty from '../InfoProperty';
import Panel from "../Panel";

class TeamInfo extends Component {
    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push("/login");
    }

    filterTeam(team) {
        return (({title, customer_id, customer_name, manager_id, deadline, description, specification_path}) => ({
            title,
            customer_id,
            customer_name,
            manager_id,
            deadline,
            description,
            specification_path
        }))(team)
    }

    getPropertyNames() {
        return {title:"Название", customer_id:"Заказчик", manager_id:"Менеджер проекта",deadline: "Дата завершения",description: "Описание", specification_path: "Спецификация"};
    }

    teamTab(id) {
        let team = this.filterTeam(
            this.props.teams.find(item => item.id == id));
        console.log(team);
        if(team.customer_id!=null) team.customer_id = this.props.users.find(item => item.id === team.customer_id).full_name;
        else team.customer_id = team.customer_name;
        team.manager_id = this.props.users.find(item => item.id === team.manager_id).full_name;
        if(team.manager_id===this.props.user.id)
            team.manager_id += "(you)";
        let names = this.getPropertyNames();
        return Object.keys(team).map((key) => {
                if(team[key])
                    return <InfoProperty style="list" name={names[key]} value={team[key]}/>
            }
        )
    }

    render() {
        const {id} = this.props.match.params;
        return (
            <Panel title="Информация о проекте">
                {/*<img src={this.props.user.img_path}/>*/}
                <ul className="list-group">
                    {this.teamTab(id)}
                </ul>
                <div className="col-md-8 col-md-offset-4">
                    <Link to={"/team/edit/" + id} className="btn btn-primary">
                        Изменить проект
                    </Link>
                    <Link to={"/teams"} className="btn btn-default">
                        Назад к списку
                    </Link>
                </div>
            </Panel>);
    }

}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        users: state.user.users,
        authenticated: state.auth.authenticated,
        teams: state.team.teams,
    }
}

export default withRouter(connect(mapStateToProps, actions)(TeamInfo));

