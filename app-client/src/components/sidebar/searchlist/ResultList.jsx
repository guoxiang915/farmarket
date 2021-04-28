import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  itemContainer: {
    width: 'fit-content',
    borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    padding: '16px 20px',
    color: theme.colors.primary.mediumGrey,
    background: theme.colors.primary.white,
    textAlign: 'start',
    fontSize: '14px',
    cursor: 'pointer',

    '&:hover': {
      background: 'none',
    },
  },
  title: {
    color: 'black',
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: 12,
  },
  bio: {
    marginBottom: 8,
  },
  img: {
    borderRadius: 12,
    width: '100%',
    height: 100,
  },
  checkItem: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
  },
}));

const ResultList = ({ items, onSelect }) => {
  const classes = useStyles();
  const checks = [
    'pickUp',
    'appointments',
    'enrollmentOpen',
    'organic',
    'delivery',
  ];

  return (
    <div className={classes.container}>
      {items.map(item => (
        // eslint-disable-next-line
        <div
          className={classes.itemContainer}
          key={item.id}
          onClick={() => onSelect(item.id)}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <div className={classes.title}>{item.title}</div>
                <div className={classes.bio}>{item.description}</div>
                <div className={classes.properties}>Open until {item.end}</div>
              </div>
            </Grid>
            <Grid item xs={6} alignItems="flex-start">
              <img className={classes.img} src={item.img} alt={item.title} />
            </Grid>
            <Grid item xs={12} alignItems="flex-start">
              <Grid container wrap spacing={2}>
                {checks.map(check => (
                  <>
                    {item[check] === undefined ? null : (
                      <Grid item key={check}>
                        <div className={classes.checkItem}>
                          {item[check] ? (
                            <Check color="primary" />
                          ) : (
                            <Close color="error" />
                          )}{' '}
                          <span style={{ marginLeft: 8 }}>{check}</span>
                        </div>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
