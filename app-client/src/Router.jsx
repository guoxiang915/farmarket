import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './pages/mainLayout/MainLayout';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainLayout} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
