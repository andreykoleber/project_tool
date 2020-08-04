import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/userManagement/Register';
import Login from './components/userManagement/Login';
import jwt_decode from "jwt-decode";
import setJwtToken from "./securityUtils/setJwtToken";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
    setJwtToken(jwtToken);
    const decodetJwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decodetJwtToken
    });
    const currentTime = Date.now() / 1000;
    if (decodetJwtToken.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />

                    <Switch>
                        <SecuredRoute exact path="/dashboard" component={Dashboard} />
                        <SecuredRoute exact path="/addProject" component={AddProject} />
                        <SecuredRoute exact path="/updateProject/:id" component={UpdateProject} />
                        <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} />
                        <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
                        <SecuredRoute exact path="/updateProjectTask/:projectIdentifier/:projectSequence" component={UpdateProjectTask} />
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;
