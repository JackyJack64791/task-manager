// import React, {Component} from 'react';
// import Header from './Header';

//
// class Layout extends Component {

//
//     render() {


//     }
// }
//


import React, {Component} from 'react';
import * as actions from '../../actions/actions';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../src/components/Header/';
import Sidebar from '../../src/components/Sidebar/';
import Breadcrumb from '../../src/components/Breadcrumb/';
import Aside from '../../src/components/Aside/';
import Footer from '../../src/components/Footer/';
import Dashboard from '../../src/views/Dashboard/';
import Charts from '../../src/views/Charts/';
import Widgets from '../../src/views/Widgets/';

// Components
import Buttons from '../../src/views/Components/Buttons/';
import Cards from '../../src/views/Components/Cards/';
// import Forms from '../../views/Components/Forms/';
import Modals from '../../src/views/Components/Modals/';
import SocialButtons from '../../src/views/Components/SocialButtons/';
import Switches from '../../src/views/Components/Switches/';
import Tables from '../../src/views/Components/Tables/';
import Tabs from '../../src/views/Components/Tabs/';

// Icons
import FontAwesome from '../../src/views/Icons/FontAwesome/';
import SimpleLineIcons from '../../src/views/Icons/SimpleLineIcons/';

// Forms
import BasicForms from '../../src/views/Forms/BasicForms/';
import AdvancedForms from '../../src/views/Forms/AdvancedForms';

// Editors
import CodeEditors from '../../src/views/Editors/CodeEditors';

// Plugins
import Calendar from '../../src/views/Plugins/Calendar/';
import DataTable from '../../src/views/Plugins/DataTable/';
import LoadingButtons from '../../src/views/Plugins/LoadingButtons/';
import Notifications from '../../src/views/Plugins/Notifications/';
import Spinners from '../../src/views/Plugins/Spinners/';

// UI Kits
import Invoice from '../../src/views/UI-Kits/Invoicing/';
import Inbox from '../../src/views/UI-Kits/Email/Inbox/';
import Message from '../../src/views/UI-Kits/Email/Message/';
import Compose from '../../src/views/UI-Kits/Email/Compose/';

import Loading from 'react-loading-spinkit';

class Layout extends Component {

    componentDidMount() {
        if (this.props.authenticated) {
            if (!this.props.getSuccessInfo && !this.props.isLoadingUsers) this.props.userInfo();
            if (!this.props.getSuccessUsers && !this.props.isLoadingUsers) this.props.getUsers();
            if (!this.props.getSuccessProjects && !this.props.isLoadingProjects) this.props.getProjects();
            if (!this.props.getSuccessTasks && !this.props.isLoadingTasks) this.props.getTasks();
        }
    }

    render() {
        // return (
        if (this.props.authenticated) {
            let projects;
            let users;
            let user;
            let tasks;
            if (this.props.getSuccessInfo && this.props.getSuccessProjects && this.props.getSuccessUsers && this.props.getSuccessTasks
                && !this.props.isLoadingProjects && !this.props.isLoadingUsers && !this.props.isLoadingTasks && !this.props.isLoadingAuth) {
                user = this.props.user;
                projects = this.props.projects;
                users = this.props.users;
                tasks = this.props.tasks;
            }
            else return <div className="app flex-row align-items-center">
                <div style={{ height: '100vh', width: '100vw' }}>
                    <Loading show={true} fadeIn="500" color="#00bfff" />
                </div>
            </div>;
            return (user && projects && users && tasks &&
                <div>
                    <div className="app">
                        <Header/>
                        <div className="app-body">
                            <Sidebar {...this.props}/>

                            <main className="main">
                                {/*<Breadcrumb/>*/}
                                <Container fluid className="mt-5">
                                    {this.props.children}
                                </Container>
                            </main>
                            <Aside/>
                        </div>
                    </div>
                </div>
            )
        }
        else return <div>
            {/*<Header/>*/}
            {/*<div className="container">*/}
            {this.props.children}
            {/*</div>*/}
        </div>
        // <div className="app">
        //     <Header />
        //     <div className="app-body">
        //         <Sidebar {...this.props}/>
        //
        //         <main className="main">
        //             <Breadcrumb />
        //             <Container fluid>
        //                 {this.props.children}
        //             </Container>
        //         </main>
        //         <Aside />
        //     </div>
        // </div>
    // );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        isLoadingAuth: state.auth.isLoading,
        user: state.user.user,
        users: state.user.users,
        projects: state.project.projects,
        tasks: state.task.tasks,
        isLoadingProjects: state.project.isLoading,
        isLoadingTasks: state.task.isLoading,
        isLoadingUsers: state.user.isLoading,
        getSuccessProjects: state.project.getSuccess,
        getSuccessUsers: state.user.usersSuccess,
        getSuccessInfo: state.user.infoSuccess,
        getSuccessTasks: state.task.getSuccess,
    }
}


export default connect(mapStateToProps, actions)(Layout);