import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import LoginHeader from '../../components/auth/LoginHeader';
import SocialNetworks from '../../components/auth/SocialNetworks';
import LoginForm from '../../components/auth/LoginForm';
import HorizontalDivider from '../../components/HorizontalDivider';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 350,
    paddingTop: '32px',
    paddingBottom: '34px',
    paddingLeft: '34px',
    paddingRight: '34px',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '32px',
      paddingBottom: '34px',
      paddingLeft: '17px',
      paddingRight: '17px',
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

const Register = () => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.paper}>
      <LoginHeader
        classes={{ container: classes.titleWrapper }}
        title="Register"
      />

      <SocialNetworks />

      <HorizontalDivider className={classes.divider} text="or" />

      <LoginForm />
    </Paper>
  );
};

export default Register;
