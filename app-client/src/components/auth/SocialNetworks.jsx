import React from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import GoogleIcon from '../../components/icons/Google';
import FacebookIcon from '../../components/icons/Facebook';
import LinkedinIcon from '../../components/icons/Linkedin';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    marginTop: 18,
    justifyContent: 'space-between',
  },

  button: {
    width: 104,
    height: 36,
    [theme.breakpoints.down('xs')]: {
      width: 80,
      height: 28,
    },
  },

  googleButton: {
    background: '#ef4538',
    '&:hover': {
      background: '#D62C1F',
    },
  },

  facebookButton: {
    background: '#4267b2',
    '&:hover': {
      background: '#294E99',
    },
  },

  linkedinkButton: {
    background: '#0078b7',
    '&:hover': {
      background: '#005F9E',
    },
  },

  icon: {
    height: 18,
    fill: '#ffffff',
  },
}));

const SocialNetworks = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.buttonsContainer}>
      <Button
        variant="contained"
        className={`${classes.googleButton} ${classes.button}`}
      >
        <GoogleIcon className={classes.icon} />
      </Button>

      <Button
        variant="contained"
        className={`${classes.facebookButton} ${classes.button}`}
      >
        <FacebookIcon className={classes.icon} />
      </Button>

      <Button
        variant="contained"
        className={`${classes.linkedinkButton} ${classes.button}`}
      >
        <LinkedinIcon className={classes.icon} />
      </Button>
    </Grid>
  );
};

export default SocialNetworks;
