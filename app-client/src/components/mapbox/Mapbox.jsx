import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Mapbox = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.805,
    longitude: -122.447,
    zoom: 15.5,
    bearing: 0,
    pitch: 0,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
};

export default Mapbox;
