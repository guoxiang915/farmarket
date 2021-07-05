import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  Button,
  IconButton,
  Typography,
  Grid,
  Chip,
  Box,
} from '@material-ui/core';
import {
  Check,
  Close,
  Directions,
  Favorite,
  Send,
  Share,
} from '@material-ui/icons';
import * as propertyIcons from '../icons/PropertyIcons';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 800,
    maxWidth: 'unset',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  wrapper: {
    width: '100%',
    display: 'grid',
    alignContent: 'start',
    gridTemplateColumns: '40% auto',
    [theme.breakpoints.down('xs')]: {
      // flexDirection: 'column',
      gridTemplateColumns: '100%',
    },
  },

  imgBox: {
    width: '100%',
    height: '100%',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #eee',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      borderBottom: '1px solid #eee',
    },
  },

  primaryImg: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    position: 'relative',
    marginBottom: 16,
  },

  imgItem: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    position: 'relative',
  },

  infoBox: {},

  header: {
    padding: '24px 16px',
    borderBottom: '1px solid #eee',
  },

  checks: {
    padding: '24px 16px',
    borderBottom: '1px solid #eee',
  },

  controls: {
    padding: '24px 16px',
    borderBottom: '1px solid #eee',

    '& .MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  title: {
    color: 'black',
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: 4,
    textAlign: 'start',
  },

  subtitle: {
    color: theme.colors.primary.mediumGrey,
    fontSize: '12px',
    textAlign: 'start',
    textTransform: 'capitalize',
    marginBottom: 16,
  },

  properties: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  propertyIcon: {
    width: 24,
    height: 24,
  },

  propertyName: {
    color: 'black',
  },

  buttonLabel: {
    marginTop: 8,
    color: theme.colors.primary.mediumGrey,
    fontSize: '12px',
    textAlign: 'center',
  },

  checkItem: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.primary.mediumGrey,
    fontSize: '14px',
  },

  actionButton: {
    width: '100%',
    borderRadius: 999,
    // color: '#27AE60',
    // borderColor: '#27AE60',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const PlaceDetailDialog = ({ groceryBox, place, onOrder, open, onClose }) => {
  const classes = useStyles();
  const [pos, setPos] = useState(0);

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.wrapper}>
        <div className={classes.imgBox}>
          <img
            className={classes.primaryImg}
            src={groceryBox.imgs?.[pos]}
            alt={groceryBox.nameP}
          />
          <Grid container spacing={2}>
            {groceryBox.imgs?.map((item, index) => (
              <Grid item key={index} xs={4} sm={3}>
                {/* eslint-disable-next-line */}
                <img
                  className={classes.imgItem}
                  src={item}
                  onClick={() => setPos(index)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.infoBox}>
          <div className={classes.header}>
            <Typography
              type="headline"
              component="h2"
              classes={{ root: classes.title }}
            >
              {groceryBox.name} from {place.name}
            </Typography>
            <Typography
              variant="subtitle1"
              classes={{ root: classes.subtitle }}
            >
              Now enrolling
            </Typography>
            <div className={classes.properties}>
              {groceryBox.properties.map((property, index) => (
                <Box key={index} pb={1} pr={1}>
                  <Chip
                    icon={
                      <img
                        src={propertyIcons[property.type]}
                        alt={property.type}
                        className={classes.propertyIcon}
                      />
                    }
                    label={
                      <span className={classes.propertyName}>
                        <Typography
                          variant="subtitle2"
                          component="span"
                          style={{ fontWeight: 'bold' }}
                        >
                          {property.value}
                        </Typography>{' '}
                        {property.type}
                      </span>
                    }
                  />
                </Box>
              ))}
            </div>
          </div>
          <div className={classes.checks}>
            <Typography variant="subtitle1" component="span">
              {groceryBox.description}
            </Typography>
            <Box pt={2} />
            <Grid container spacing={2}>
              {groceryBox.checks.map((check, index) => (
                <Grid item xs={6} key={index}>
                  <div className={classes.checkItem}>
                    {check.checked ? (
                      <Check color="primary" />
                    ) : (
                      <Close color="error" />
                    )}{' '}
                    <span style={{ marginLeft: 8 }}>{check.value}</span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className={classes.controls}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <IconButton>
                  <Directions color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Directions</div>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Favorite color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Favorite</div>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Send color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Send to your phone</div>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Share color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Share</div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.actionButton}
                  onClick={onOrder}
                >
                  Order Online
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PlaceDetailDialog;
