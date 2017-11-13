import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import ProjectInfoProperty from './ProjectInfoProperty';

class ProjectInfo extends Component {
    componentDidMount(){
        if(!this.props.authenticated) this.props.history.push("/login");
        if(!this.props.infoSuccess) this.props.userInfo();
        if(Object.keys(this.props.projects).length === 0 &&!this.props.getSuccess) this.props.getProjects();
    }
    findProject(item) {
        return item.id===this.props.id;
    }
    filterProject(project){
        return (({ title, customer_id, manager_id, deadline, description, specification }) => ({title, customer_id, manager_id, deadline, description, specification }))(project)
    }
    getPropertyNames()
    {
        return ["Title","Customer","Project Manager","Deadline","Description", "Specification"];
    }
    projectTab() {
        let project = this.filterProject(
            this.props.projects.find(this.findProject));
        let names = this.getPropertyNames();
        // return Object.keys(project).map((key, i) =>
        //     <ProjectInfoProperty name={names[i]} value={project[key]}/>
        //)
    }
    render() {
        let project;
        if (this.props.getSuccess && !this.props.isLoading) {
            project = this.props.projects.find(this.findProject);
        }
        else return <p>Loading...</p>;
        return (project && <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">Project Info</div>
                        <div className="panel-body">
                            <ul className="list-group">
                                {/*{this.projectTab()}*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

}
function mapStateToProps(state) {
    return {
        user: state.user.user,
        authenticated:state.auth.authenticated,
        infoSuccess: state.user.infoSuccess,
        projects: state.project.projects,
        isLoading: state.project.isLoading,
        isError: state.project.isError,
        getSuccess: state.project.getSuccess,
    }
}
export default withRouter(connect(mapStateToProps,actions)(ProjectInfo));

