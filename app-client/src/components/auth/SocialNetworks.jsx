import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import GoogleIcon from '../../components/icons/Google';
import FacebookIcon from '../../components/icons/Facebook';
import {
  LOGIN_BY_FACEBOOK_MUTATION,
  LOGIN_BY_GOOGLE_MUTATION,
  REGISTER_BY_FACEBOOK_MUTATION,
  REGISTER_BY_GOOGLE_MUTATION,
} from '../../graphql/mutation';

const useStyles = makeStyles(theme => ({
  buttonsContainer: {
    marginTop: 18,
    justifyContent: 'space-between',
  },

  button: {
    width: '100%',
    height: 36,
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    marginRight: 8,
  },

  progress: {
    color: 'white',
    marginRight: 8,
  },
}));

const SocialNetworks = ({ isRegister, onSuccess }) => {
  const classes = useStyles();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [registerByGoogle] = useMutation(REGISTER_BY_GOOGLE_MUTATION, {
    errorPolicy: 'all',
  });
  const [registerByFacebook] = useMutation(REGISTER_BY_FACEBOOK_MUTATION, {
    errorPolicy: 'all',
  });
  const [loginByGoogle] = useMutation(LOGIN_BY_GOOGLE_MUTATION, {
    errorPolicy: 'all',
  });
  const [loginByFacebook] = useMutation(LOGIN_BY_FACEBOOK_MUTATION, {
    errorPolicy: 'all',
  });

  const handleGoogleSubmit = async data => {
    if (data.profileObj) {
      setGoogleLoading(true);
      if (isRegister) {
        registerByGoogle({
          variables: {
            email: data.profileObj.email,
            google_id: data.profileObj.googleId,
            token_id: data.tokenId,
            first_name: data.profileObj.givenName,
            last_name: data.profileObj.familyName,
          },
        })
          .then(result => {
            const registerData = result.data;
            if (registerData && registerData.registerUser) {
              localStorage.setItem('token', registerData.registerUser.token);
              onSuccess?.();
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setGoogleLoading(false);
          });
      } else {
        loginByGoogle({
          variables: {
            email: data.profileObj.email,
            google_id: data.profileObj.googleId,
            token_id: data.tokenId,
          },
        })
          .then(result => {
            const loginData = result.data;
            if (loginData && loginData.login) {
              localStorage.setItem('token', loginData.login);
              onSuccess?.();
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setGoogleLoading(false);
          });
      }
    }
  };

  const handleFacebookSubmit = async data => {
    if (data.email) {
      setFacebookLoading(true);
      if (isRegister) {
        registerByFacebook({
          variables: {
            email: data.email,
            facebook_id: data.userID,
            first_name: data.first_name,
            last_name: data.last_name,
          },
        })
          .then(result => {
            const registerData = result.data;
            if (registerData && registerData.registerUser) {
              localStorage.setItem('token', registerData.registerUser.token);
              onSuccess?.();
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setFacebookLoading(false);
          });
      } else {
        loginByFacebook({
          variables: {
            email: data.email,
            facebook_id: data.userID,
          },
        })
          .then(result => {
            const loginData = result.data;
            if (loginData && loginData.login) {
              localStorage.setItem('token', loginData.login);
              onSuccess?.();
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setFacebookLoading(false);
          });
      }
    }
  };

  return (
    <Grid container spacing={3} className={classes.buttonsContainer}>
      <Grid item xs={12}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <Button
              variant="contained"
              className={`${classes.googleButton} ${classes.button}`}
              onClick={renderProps.onClick}
              disabled={
                renderProps.disabled || googleLoading || facebookLoading
              }
            >
              {!googleLoading ? (
                <GoogleIcon className={classes.icon} />
              ) : (
                <CircularProgress size={16} className={classes.progress} />
              )}{' '}
              {isRegister ? 'Register' : 'Login'} With Google
            </Button>
          )}
          onSuccess={handleGoogleSubmit}
          onFailure={handleGoogleSubmit}
        />
      </Grid>

      <Grid item xs={12}>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          fields="name,email"
          render={renderProps => (
            <Button
              variant="contained"
              className={`${classes.facebookButton} ${classes.button}`}
              onClick={renderProps.onClick}
              disabled={googleLoading || facebookLoading}
            >
              {!facebookLoading ? (
                <FacebookIcon className={classes.icon} />
              ) : (
                <CircularProgress size={16} className={classes.progress} />
              )}{' '}
              {isRegister ? 'Register' : 'Login'} With Facebook
            </Button>
          )}
          callback={handleFacebookSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default SocialNetworks;
