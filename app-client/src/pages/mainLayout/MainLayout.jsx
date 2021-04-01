import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'reactstrap';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Sidebar from '../../components/sidebar/Sidebar';

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
  const { push } = useHistory();

  return (
    <div className={classes.root}>
      <Sidebar />
      <Button onClick={() => push('/login')} />
    </div>
  );
};

export default MainLayout;
