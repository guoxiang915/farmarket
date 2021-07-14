import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { getOpenedState } from '../../../utils/functions';
import CheckItem from './../../utils/CheckItem';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },
  itemContainer: {
    borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    padding: '16px 20px',
    color: theme.colors.primary.mediumGrey,
    background: theme.colors.primary.white,
    textAlign: 'start',
    fontSize: '14px',
    cursor: 'pointer',

    '&:hover': {
      background: '#1976d210',
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

  return (
    <div className={classes.container}>
      {items.map(item => {
        const img =
          'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80';
        return (
          // eslint-disable-next-line
          <div
            className={classes.itemContainer}
            key={item.place_id}
            onClick={() => onSelect(item.place_id)}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>
                  <div className={classes.title}>{item.name}</div>
                  <div className={classes.bio}>{item.bio}</div>
                  <div className={classes.properties}>
                    {getOpenedState(item.hours)}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} alignItems="flex-start">
                <img className={classes.img} src={img} alt={item.name} />
              </Grid>
              <Grid item xs={12} alignItems="flex-start">
                <Grid container wrap spacing={2}>
                  {item.services && Object.keys(item.services)?.length ? (
                    <Grid item xs={12} alignItems="flex-start">
                      <Grid container wrap spacing={2}>
                        {Object.keys(item.services)
                          .slice(0, 3)
                          .map(check => (
                            <Grid item key={check}>
                              <CheckItem values={item.services} check={check} />
                            </Grid>
                          ))}
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default ResultList;
