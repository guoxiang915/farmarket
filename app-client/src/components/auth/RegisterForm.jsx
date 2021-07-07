import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Button,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../graphql/mutations';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    textAlign: 'start',
  },

  managePlace: {
    marginTop: 40,
    marginBottom: 4,
  },

  inputError: {
    '&:after': {
      background: theme.colors.primary.errorRed,
    },
  },

  inputLabel: {
    ...theme.typography.secondaryBody,
    '& > span': {
      color: theme.colors.login.link,
    },
  },

  inputLabelFocused: {
    transform: 'none',
    ...theme.typography.caption,
  },

  inputWrapper: {
    marginTop: '21px',
  },

  formFooter: {
    marginTop: '86px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttons: {
    marginTop: -36,
  },

  summaryLink: {
    ...theme.buttons.default,
    ...theme.buttons.thirdTextLink,
    lineHeight: '36px',
  },

  nextButton: {
    width: '100%',
    ...theme.buttons.default,
    ...theme.buttons.action,
    float: 'right',
    '&:hover': {
      ...theme.buttons.actionHover,
    },
    '&:focus, &:active': {
      ...theme.buttons.actionPressed,
    },
    '&[disabled]': {
      ...theme.buttons.action,
      ...theme.buttons.actionDisabled,
    },
  },

  helperError: {
    ...theme.typography.errorMessage,
  },

  progress: {
    color: 'white',
  },
}));

const RegisterForm = ({
  submitUrl,
  username,
  error,
  rememberPassword,
  description,
  onSuccess,
}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    username: username || '',
    password: '',
    error: error,
    rememberPassword: rememberPassword,
    managePlace: false,
  });
  const [
    submitRegister,
    { loading, data: registerData },
  ] = useMutation(REGISTER_MUTATION, { errorPolicy: 'all' });

  const submitHandler = () => {
    submitRegister({
      variables: {
        first_name: state.firstname,
        last_name: state.lastname,
        email: state.username,
        password: state.password,
      },
    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    if (registerData && registerData.registerUser) {
      localStorage.setItem('token', registerData.registerUser.token);
      onSuccess();
    }
  }, [registerData]);

  const handleInputChange = event =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
      error: null,
    });

  return (
    <Grid container spacing={0}>
      <form action={submitUrl} method="POST" className={classes.form}>
        <Grid item xs={12}>
          <div>{description}</div>
        </Grid>

        <Grid item xs={12} className={classes.inputWrapper}>
          <TextField
            onChange={handleInputChange}
            name="firstname"
            label="First Name"
            value={state.firstname}
            autoComplete="firstname"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} className={classes.inputWrapper}>
          <TextField
            onChange={handleInputChange}
            name="lastname"
            label="Last Name"
            value={state.lastname}
            autoComplete="lastname"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} className={classes.inputWrapper}>
          <TextField
            onChange={handleInputChange}
            name="username"
            label="Email"
            value={state.username}
            helperText={state.error || ''}
            error={!!state.error}
            autoComplete="username"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} className={classes.inputWrapper}>
          <TextField
            onChange={handleInputChange}
            name="password"
            type="password"
            label="Password"
            value={state.password}
            autoComplete="current-password"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} className={classes.formFooter}>
          <Button
            className={classes.nextButton}
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={!state.username || !state.password}
          >
            {loading ? (
              <CircularProgress size={16} className={classes.progress} />
            ) : (
              'Register'
            )}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default RegisterForm;
