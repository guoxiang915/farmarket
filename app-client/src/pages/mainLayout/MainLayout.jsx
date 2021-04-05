import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import LoginModal from '../../components/auth/Login';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      overflow: 'auto',
    },
  })
);
const MainLayout = () => {
  const classes = useStyles();
  const [loginModal, showLoginModal] = useState(false);

  return (
    <div className={classes.root}>
      <Sidebar />
      <Button onClick={() => showLoginModal(true)} />
      {loginModal && <LoginModal open onClose={() => showLoginModal(false)} />}
    </div>
  );
};

export default MainLayout;
