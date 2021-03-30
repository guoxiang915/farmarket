import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/auth/Login';
import MainLayout from './pages/mainLayout/MainLayout';

const Router = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={MainLayout} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Router;
