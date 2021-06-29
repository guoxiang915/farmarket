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
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  imgBox: {
    width: '40%',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #eee',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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

  infoBox: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

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
  },

  properties: {
    display: 'flex',
    flexWrap: 'wrap',
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
    color: '#27AE60',
    borderColor: '#27AE60',
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
          <div
            className={classes.primaryImg}
            style={{ backgroundImage: groceryBox.imgs?.[pos] || '' }}
          />
          <Grid container spacing={2}>
            {groceryBox.imgs?.map((item, index) => (
              <Grid item key={index}>
                {/* eslint-disable-next-line */}
                <div
                  className={classes.imgItem}
                  style={{ backgroundImage: item }}
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
              type="subtitle"
              component="span"
              classes={{ root: classes.subtitle }}
            >
              Now enrolling
            </Typography>
            <div className={classes.properties}>
              {groceryBox.properties.map((property, index) => (
                <Box key={index} pb={1} pr={1}>
                  <Chip
                    icon={propertyIcons[property.type]}
                    label={
                      <span>
                        <b>{property.value}</b> {property.type}
                      </span>
                    }
                  />
                </Box>
              ))}
            </div>
          </div>
          <div className={classes.checks}>
            <Typography type="subtitle" component="span">
              Our food is naturally processed and the strictest precautions are
              taken place to make sure you get the freshest foods
            </Typography>
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
              <Grid item xs={3} alignItems="center">
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
