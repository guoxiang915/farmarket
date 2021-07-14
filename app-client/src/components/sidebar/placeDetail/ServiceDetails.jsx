import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, IconButton } from '@material-ui/core';
import { ArrowBack, Close } from '@material-ui/icons';
import CheckItem from '../../utils/CheckItem';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 400,
    height: '100vh',
    zIndex: 1201,
    background: 'white',
  },

  header: {
    background: theme.colors.primary.main,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    fontSize: '20px',
    textAlign: 'left',
    paddingLeft: 16,
    paddingRight: 16,
  },

  content: {
    height: 'calc(100vh - 65px)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  blockContainer: {
    width: '100%',
    padding: '24px 24px',
    textAlign: 'left',
    '&:not(last-child)': {
      borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    },
  },

  blockTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'left',
    marginBottom: theme.spacing(1.5),
  },

  empty: {
    width: '100%',
    textAlign: 'center',
    color: 'gray',
    fontStyle: 'italic',
    padding: 40,
  },
}));

export default function ServiceDetails({ place, onBack, onClose }) {
  const classes = useStyles();
  const options = [
    {
      title: 'Service options',
      values: place.services,
    },
  ];

  if (place.category === 'groceries' && place.groceries) {
    // No options yet for groceries
  } else if (place.category === 'farm' && place.farm) {
    options.push({
      title: 'Specialities',
      values: Object.fromEntries(
        place.farm.specialities.map(item => [item, true])
      ),
    });
    options.push({
      title: 'Tags',
      values: Object.fromEntries(place.farm.tags.map(item => [item, true])),
    });
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <IconButton onClick={onBack} color="inherit">
          <ArrowBack color="inherit" />
        </IconButton>
        <Typography variant="h1" className={classes.title}>
          About {place.name}
        </Typography>
        <IconButton onClick={onClose} color="inherit">
          <Close color="inherit" />
        </IconButton>
      </div>

      <div className={classes.content}>
        {place.bio && <div className={classes.blockContainer}>{place.bio}</div>}

        {options.map(service => (
          <div className={classes.blockContainer} key={service.title}>
            <Typography variant="h6" className={classes.blockTitle}>
              {service.title}
            </Typography>
            {service.values && Object.keys(service.values).length ? (
              <Grid container spacing={2}>
                {Object.keys(service.values)?.map((option, index) => (
                  <Grid item xs={6} key={index}>
                    <CheckItem values={service.values} check={option} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div className={classes.empty}>No services available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
