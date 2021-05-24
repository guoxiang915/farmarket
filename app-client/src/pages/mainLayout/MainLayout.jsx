import React from 'react';
import ReactMapboxGl, { Cluster, Marker, Popup } from 'react-mapbox-gl';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Snackbar, Typography } from '@material-ui/core';
import { Room } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navigation/Navigation';
import LoginDialog from '../../components/auth/LoginDialog';
import { closeModal, selectPlace } from '../../store/actions/appActions';
import { setUser } from '../../store/actions/authActions';

// eslint-disable-next-line
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import RegisterDialog from '../../components/auth/RegisterDialog';
import AddPlaceDialog from '../../components/place/AddPlaceDialog';
import { GET_ME_INFO_QUERY, SEARCH_PLACES_QUERY } from '../../graphql/query';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    },

    clusterMarker: {
      cursor: 'pointer',
    },

    marker: {
      cursor: 'pointer',
    },

    markerPopup: {
      paddingBottom: 50,
    },
  })
);

const ClusterMarker = classes => coordinates => (
  <Marker coordinates={coordinates} className={classes.clusterMarker}>
    <Room color="primary" fontSize="large" />
  </Marker>
);

const MainLayout = () => {
  const classes = useStyles();
  const {
    modalId,
    modalInfo,
    snackbar,
    selectedPlace: selectedPlaceId,
  } = useSelector(state => state.appState);

  const dispatch = useDispatch();
  const { error, data } = useQuery(GET_ME_INFO_QUERY, {
    variables: {
      token: localStorage.getItem('token') || '',
    },
  });
  const { data: places } = useQuery(SEARCH_PLACES_QUERY);

  if (!error && data && data.meInfo) {
    dispatch(setUser({ user: data.meInfo?.email, isLoggedIn: true }));
  }

  const handleCloseSnackbar = () => {};

  const selectedPlace =
    selectedPlaceId === null
      ? null
      : places?.searchPlaces?.find(item => item.id === selectedPlaceId);

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
        center={
          selectedPlace
            ? [
                selectedPlace.location.longitude || 0,
                selectedPlace.location.latitude || 0,
              ]
            : [24.93375, 60.170282]
        }
        zoom={[14]}
      >
        <Cluster ClusterMarkerFactory={ClusterMarker(classes)}>
          {places?.searchPlaces?.map(place => (
            <Marker
              key={place.id}
              className={classes.marker}
              coordinates={[
                place.location.longitude || 0,
                place.location.latitude || 0,
              ]}
              onClick={() => dispatch(selectPlace(place.id))}
              anchor="bottom"
            >
              <Room color="primary" />
              <Box mt={0.5}>{place.name}</Box>
            </Marker>
          ))}
        </Cluster>
        {selectedPlace && (
          <Popup
            key={selectedPlace.id}
            coordinates={[
              selectedPlace.location.longitude || 0,
              selectedPlace.location.latitude || 0,
            ]}
            className={classes.markerPopup}
          >
            <Typography variant="subtitle1" color="primary">
              {selectedPlace.name}
            </Typography>
            <Typography variant="body2">{selectedPlace.bio}</Typography>
          </Popup>
        )}
      </Map>
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

      {/* Show modals here */}
      {modalId === 'login-modal' && (
        <LoginDialog open onClose={() => dispatch(closeModal('login-modal'))} />
      )}
      {modalId === 'register-modal' && (
        <RegisterDialog
          open
          onClose={() => {
            dispatch(closeModal('login-modal'));
          }}
        />
      )}
      {modalId === 'add-place-modal' && (
        <AddPlaceDialog
          open
          onClose={() => dispatch(closeModal('add-place-modal'))}
          category={modalInfo?.category || ''}
        />
      )}
    </div>
  );
};

export default MainLayout;
