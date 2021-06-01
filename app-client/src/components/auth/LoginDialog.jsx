import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Dialog, Paper, Typography } from '@material-ui/core';
import LoginHeader from './LoginHeader';
import SocialNetworks from './SocialNetworks';
import LoginForm from './LoginForm';
import HorizontalDivider from '../divider/HorizontalDivider';
import { openModal } from '../../store/actions/appActions';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 450,
    padding: '24px 27px 27px',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 16px)',
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
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper elevation={2} className={classes.paper}>
        <LoginHeader
          classes={{ container: classes.titleWrapper }}
          title="Saving Your Farm"
          subtitle=""
          onBack={onClose}
        />

        <LoginForm
          description={
            <>
              To submit your contribution, please{' '}
              <Typography
                color="primary"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  dispatch(openModal('register-modal'));
                }}
                component="span"
              >
                create an account
              </Typography>{' '}
              or login below
            </>
          }
          onSuccess={() => onClose()}
        />

        <HorizontalDivider className={classes.divider} text="or" />

        <SocialNetworks onSuccess={() => onClose()} />
      </Paper>
    </Dialog>
  );
};

export default LoginDialog;
