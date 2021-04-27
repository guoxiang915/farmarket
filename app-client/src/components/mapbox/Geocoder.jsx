import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MapboxGeocoder from 'react-mapbox-gl-geocoder';
import ReactMapboxGl from 'react-mapbox-gl';
import { ListItem, TextField } from '@material-ui/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';

// eslint-disable-next-line
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const useStyles = makeStyles(theme =>
  createStyles({
    geocoder: {
      position: 'relative',
      '& .react-geocoder-results': {
        position: 'absolute',
        top: 32,
        width: '100%',
        maxHeight: 150,
        overflow: 'auto',
        zIndex: 10,
        background: theme.colors.primary.white,
        boxShadow:
          '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
      },
    },
    input: {
      marginBlockEnd: 6,
    },
  })
);

export default function Geocoder({ showMap = true }) {
  const classes = useStyles();

  const [viewport, setViewport] = useState({});

  const handleSelected = (selectedViewport, item) => {
    setViewport(selectedViewport);
    console.log(selectedViewport, item);
  };

  return (
    <>
      <MapboxGeocoder
        className={classes.geocoder}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onSelected={handleSelected}
        viewport={viewport}
        hideOnSelect
        updateInputOnSelect
        inputComponent={inputProps => (
          <TextField className={classes.input} fullWidth {...inputProps} />
        )}
        itemComponent={itemProps => <ListItem button {...itemProps} />}
      />

      {showMap && (
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100px',
            width: '100%',
          }}
          zoom={[viewport.zoom * 20 || 11]}
          center={
            viewport.longitude && viewport.latitude
              ? [viewport.longitude, viewport.latitude]
              : undefined
          }
          onViewportChange={newViewport => setViewport(newViewport)}
        />
      )}
    </>
  );
}
