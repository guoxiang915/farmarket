import React, { useState } from 'react';
import {
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
  Button,
  makeStyles,
} from '@material-ui/core';

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
}));

const LoginForm = ({
  submitUrl,
  username,
  error,
  rememberPassword,
  description,
}) => {
  const classes = useStyles();
  const [state, setState] = useState({
    username: username || '',
    password: '',
    error: error,
    rememberPassword: rememberPassword,
    managePlace: false,
  });

  const toggleRememberPassword = () =>
    setState({ ...state, rememberPassword: !state.rememberPassword });

  const submitHandler = () => {};

  const loginInputChange = event =>
    setState({
      ...state,
      [event.target.name]: event.target.value,
      error: null,
    });

  const redirectOnForgetPasswordPage = () => {};

  return (
    <Grid container spacing={0}>
      <form action={submitUrl} method="POST" className={classes.form}>
        <Grid item xs={12} className={classes.managePlace}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.managePlace}
                onChange={() =>
                  setState({ ...state, managePlace: !state.managePlace })
                }
                value="managePlace"
                color="secondary"
              />
            }
            name="manage"
            label="I own/manage this place"
          />
        </Grid>

        <Grid item xs={12}>
          <div>{description}</div>
        </Grid>

        <Grid item xs={12} className={classes.inputWrapper}>
          <TextField
            onChange={loginInputChange}
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
            onChange={loginInputChange}
            name="password"
            type="password"
            label="Password"
            value={state.password}
            autoComplete="current-password"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} className={classes.rememberPassword}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.rememberPassword}
                onChange={toggleRememberPassword}
                value="rememberPassword"
                color="secondary"
              />
            }
            name="remember"
            label="Remember password"
          />
        </Grid>

        <Grid item xs={12} className={classes.formFooter}>
          <a
            href={redirectOnForgetPasswordPage()}
            className={classes.summaryLink}
          >
            Forgot your password?
          </a>

          <Button
            className={classes.nextButton}
            variant="contained"
            color="primary"
            onClick={submitHandler}
            disabled={!state.username || !state.password}
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default LoginForm;
