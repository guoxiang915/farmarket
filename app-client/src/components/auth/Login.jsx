import React from 'react';
import { makeStyles, Dialog, Paper } from '@material-ui/core';
import LoginHeader from './LoginHeader';
import SocialNetworks from './SocialNetworks';
import LoginForm from './LoginForm';
import HorizontalDivider from '../divider/HorizontalDivider';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 450,
    padding: '24px 27px 27px',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      padding: '24px 17px 24px',
    },
  },

  titleWrapper: {
    height: '40px',
    display: 'flex',
  },

  divider: {
    margin: '33px 0 20px 0',
  },
}));

const LoginDialog = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper elevation={2} className={classes.paper}>
        <LoginHeader
          classes={{ container: classes.titleWrapper }}
          title="Saving 'Your Business Name'"
          subtitle="Your Business Name"
          onBack={onClose}
        />

        <LoginForm description="To submit your contribution, please create an account or login below" />

        <HorizontalDivider className={classes.divider} text="or" />

        <SocialNetworks />
      </Paper>
    </Dialog>
  );
};

export default LoginDialog;
