import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import LoginHeader from '../../components/auth/LoginHeader';
import SocialNetworks from '../../components/auth/SocialNetworks';
import LoginForm from '../../components/auth/LoginForm';
import HorizontalDivider from '../../components/divider/HorizontalDivider';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 350,
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

const Login = () => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.paper}>
      <LoginHeader
        classes={{ container: classes.titleWrapper }}
        title="Saving 'Your Business Name'"
        subtitle="Your Business Name"
      />

      <LoginForm />

      <HorizontalDivider className={classes.divider} text="or" />

      <SocialNetworks />
    </Paper>
  );
};

export default Login;
