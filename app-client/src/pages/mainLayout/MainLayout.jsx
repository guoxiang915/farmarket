import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Avatar, Box, Fab, Grid, Snackbar } from '@material-ui/core';
import { Add, MyLocation, Remove } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navigation/Navigation';
import LoginDialog from '../../components/auth/LoginDialog';
import { closeModal, showSnackbar } from '../../store/actions/appActions';
import { setUser } from '../../store/actions/authActions';

// eslint-disable-next-line
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import RegisterDialog from '../../components/auth/RegisterDialog';
import AddPlaceDialog from '../../components/place/AddPlaceDialog';
import { GET_ME_INFO_QUERY, SEARCH_PLACES_QUERY } from '../../graphql/query';

import normalMarker from '../../assets/normal-marker.png';
import selectedMarker from '../../assets/selected-marker.jpg';
import { getAddressFromCoordinates } from '../../utils/functions';

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
      fontSize: '16px',
      fontWeight: 'bold',

      '& img': {
        height: 32,
      },
    },

    markerPopup: {
      paddingBottom: 50,
    },

    advanced: {
      position: 'fixed',
      top: 30,
      right: 30,
      bottom: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },

    controls: {
      width: 50,
    },
  })
);

/** TODO: Clusterize markers */
// const ClusterMarker = classes => coordinates => (
//   <Marker coordinates={coordinates} className={classes.clusterMarker}>
//     <Room color="primary" fontSize="large" />
//   </Marker>
// );

const MainLayout = () => {
  const { push } = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const { modals, snackbar, selectedPlace: selectedPlaceId } = useSelector(
    state => state.appState
  );
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(14);
  const [location, setLocation] = useState('');

  const gotoUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCenter([
          position.coords.longitude || 0,
          position.coords.latitude || 0,
        ]);
        setZoom(14);
      },
      error => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (center[0] === 0 && center[1] === 0) {
      gotoUserLocation();
    }
  }, [navigator.geolocation, center]);

  const { error, data } = useQuery(GET_ME_INFO_QUERY, {
    variables: {
      token: localStorage.getItem('token') || '',
    },
  });
  const [getPlaces, { data: places }] = useLazyQuery(SEARCH_PLACES_QUERY);

  if (!error && data && data.meInfo) {
    dispatch(setUser({ user: data.meInfo?.email, isLoggedIn: true }));
  }

  const handleCloseSnackbar = () => {
    dispatch(showSnackbar({ open: false }));
  };

  useEffect(() => getPlaces(), []);

  useEffect(() => {
    if (selectedPlaceId && places?.searchPlaces?.length) {
      const selectedPlace = places?.searchPlaces?.find(
        item => item.place_id === selectedPlaceId
      );
      if (selectedPlace) {
        setCenter([
          selectedPlace.location.longitude || 0,
          selectedPlace.location.latitude || 0,
        ]);
        setZoom(14);
      } else {
        getPlaces();
      }
    }
  }, [selectedPlaceId, places?.searchPlaces]);

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
        center={center}
        zoom={[zoom]}
        animationOptions={{
          animate: true,
          duration: 2000,
        }}
        onMoveEnd={map => {
          getAddressFromCoordinates({
            // eslint-disable-next-line
            latitude: map.transform._center.lat,
            // eslint-disable-next-line
            longitude: map.transform._center.lng,
          }).then(response => {
            response.json().then(newLocation => {
              if (newLocation.features?.length) {
                const text =
                  newLocation.features.find(
                    item => item.place_type[0] === 'place'
                  )?.text || newLocation.features[0].text;
                if (text !== location) {
                  setLocation(text);
                }
              }
            });
          });
        }}
        onZoomEnd={map => {
          // eslint-disable-next-line
          if (zoom !== map.transform._zoom) {
            // eslint-disable-next-line
            setZoom(map.transform._zoom);
          }
        }}
      >
        {places?.searchPlaces?.map(place => (
          <Marker
            key={place.place_id}
            className={classes.marker}
            coordinates={[
              place.location.longitude || 0,
              place.location.latitude || 0,
            ]}
            // eslint-disable-next-line
            onClick={() => push('/place/' + place.place_id)}
            anchor="bottom"
          >
            <img
              src={
                place.place_id === selectedPlaceId
                  ? selectedMarker
                  : normalMarker
              }
              alt=""
            />
            <Box mt={0.5}>{place.name}</Box>
          </Marker>
        ))}
      </Map>

      <div className={classes.advanced}>
        {data?.meInfo ? (
          <Avatar className={classes.avatar}>
            {data?.meInfo?.first_name?.charAt?.(0) || ''}
          </Avatar>
        ) : (
          <div />
        )}
        <Grid container spacing={2} className={classes.controls}>
          <Grid item xs={12}>
            <Fab
              onClick={() => {
                setZoom(zoom + 1);
              }}
              size="small"
            >
              <Add fontSize="small" />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <Fab
              onClick={() => {
                setZoom(zoom - 1);
              }}
              size="small"
            >
              <Remove fontSize="small" />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <Fab
              onClick={() => {
                gotoUserLocation();
              }}
              size="small"
            >
              <MyLocation fontSize="small" />
            </Fab>
          </Grid>
        </Grid>
      </div>

      <Sidebar location={location} />

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
      {modals.map(({ modalId, modalInfo }) => (
        <>
          {modalId === 'login-modal' && (
            <LoginDialog
              open
              onClose={() => dispatch(closeModal('login-modal'))}
            />
          )}
          {modalId === 'register-modal' && (
            <RegisterDialog
              open
              onClose={() => {
                dispatch(closeModal('register-modal'));
              }}
            />
          )}
          {modalId === 'add-place-modal' && (
            <AddPlaceDialog
              open
              onClose={() => dispatch(closeModal('add-place-modal'))}
              category={modalInfo?.category || ''}
              places={places?.searchPlaces}
            />
          )}
        </>
      ))}
    </div>
  );
};

export default MainLayout;
