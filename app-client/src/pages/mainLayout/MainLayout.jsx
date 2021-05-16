import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navigation/Navigation';
import LoginDialog from '../../components/auth/LoginDialog';
import { closeModal, openModal } from '../../store/actions/appActions';
import { setUser } from '../../store/actions/authActions';

// eslint-disable-next-line
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import RegisterDialog from '../../components/auth/RegisterDialog';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const getMeInfo = gql`
  query getMeInfo {
    meInfo {
      email
    }
  }
`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    },
  })
);

const MainLayout = () => {
  const classes = useStyles();
  const { modalId, snackbar } = useSelector(state => state.appState);
  const dispatch = useDispatch();
  const { error, data } = useQuery(getMeInfo, {
    variables: {
      token: localStorage.getItem('token') || '',
    },
  });

  if (!error && data && data.meInfo) {
    dispatch(setUser({ user: data.meInfo, isLoggedIn: true }));
  }

  const handleCloseSnackbar = () => {};

  return (
    <div className={classes.root}>
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: 'calc(100vh + 1px)',
          width: 'calc(100vw + 1px)',
          top: -1,
        }}
      />
      <Sidebar />
      <Navigation />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration || 6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {modalId === 'login-modal' && (
        <LoginDialog open onClose={() => dispatch(closeModal('login-modal'))} />
      )}
      {modalId === 'register-modal' && (
        <RegisterDialog
          open
          onClose={() => {
            dispatch(openModal('login-modal'));
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;
