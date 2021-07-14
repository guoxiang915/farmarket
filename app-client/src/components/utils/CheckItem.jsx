import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Check, Close } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  checkItem: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.primary.mediumGrey,
    fontSize: '14px',
  },
}));

export default function CheckItem({ values, check }) {
  const classes = useStyles();

  return (
    <div className={classes.checkItem}>
      {values[check] === false || values[check] === 'false' ? (
        <Close color="error" />
      ) : (
        <Check color="primary" />
      )}{' '}
      <span style={{ marginLeft: 8 }}>{check}</span>
    </div>
  );
}
