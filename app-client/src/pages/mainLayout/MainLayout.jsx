import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ReactMapboxGl from 'react-mapbox-gl';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import LoginModal from '../../components/auth/Login';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZWZmZXJ2ZXNjZW5jZS0xOSIsImEiOiJjanpmZGRiZXAwYmFuM29zOWRybzB3cHRyIn0.yRS9YBIfjwPhrvzw50TZWw',
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
  const [loginModal, showLoginModal] = useState(false);

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
      <Button onClick={() => showLoginModal(true)} />
      {loginModal && <LoginModal open onClose={() => showLoginModal(false)} />}
    </div>
  );
};

export default MainLayout;
