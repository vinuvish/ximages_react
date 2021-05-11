import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';
import AuthContainer from '../containers/Auth';

const RouterRoutes = () => {
    return (
        <Router>
            <Switch>
                {[UnauthenticatedRoutes, <Route key={1} component={NotFoundPage} />]}
            </Switch>
            <Redirect to="/dashboard/summary" />
        </Router>
    );
};

const UnauthenticatedRoutes = [
    <Route exact path='/dashboard/:page' render={props => (
        <HomePage
            {...props}
        />
    )} />,
    <Route
        exact
        path="/auth/:tab"
        render={props => (
            <AuthContainer
                {...props}
            />
        )}
    />
];

const AuthenticatedRoutes = [];

export default RouterRoutes;
