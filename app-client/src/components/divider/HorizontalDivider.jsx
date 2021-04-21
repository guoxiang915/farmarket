import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    height: '15px',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    overflow: 'hidden',
  },

  text: {
    fontSize: '14px',
    lineHeight: '15px',
    fontWeight: 'normal',
    color: '#A3A3A3',
    '&::before, &::after': {
      content: "''",
      display: 'block',
      width: '50%',
      height: '1px',
      background: '#A3A3A3',
      position: 'absolute',
      top: '50%',
      left: '0',
      borderBox: 'box-sizing',
      marginRight: '-14px',
      marginLeft: '-14px',
    },
    '&::before': {},
    '&::after': {
      left: 'auto',
      right: '0',
    },
  },
}));

const HorizontalDivider = ({ className, text }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={className}>
      <div className={classes.container}>
        <Typography type="display1" component="span" className={classes.text}>
          {text}
        </Typography>
      </div>
    </Grid>
  );
};

export default HorizontalDivider;
