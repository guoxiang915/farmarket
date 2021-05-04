import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navigation/Navigation';

// eslint-disable-next-line
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

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
  })
);

const MainLayout = () => {
  const classes = useStyles();

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
    </div>
  );
};

export default MainLayout;
