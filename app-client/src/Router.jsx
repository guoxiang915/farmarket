import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginDialog from './components/auth/LoginDialog';
import MainLayout from './pages/mainLayout/MainLayout';
import { closeModal } from './store/actions/appActions';
import { setUser } from './store/actions/authActions';

const getMeInfo = gql`
  query getMeInfo {
    meInfo {
      email
    }
  }
`;

const Router = () => {
  const { modalId } = useSelector(state => state.appState);
  const dispatch = useDispatch();
  const { error, data } = useQuery(getMeInfo, {
    variables: {
      token: localStorage.getItem('token') || '',
    },
  });

  if (!error && data && data.meInfo) {
    dispatch(setUser({ user: data.meInfo, isLoggedIn: true }));
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainLayout} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>

      {modalId === 'login-modal' && (
        <LoginDialog open onClose={() => dispatch(closeModal('login-modal'))} />
      )}
    </div>
  );
};

export default Router;
