import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Home as HomeIcon, Work as WorkIcon } from '@material-ui/icons';
import AddPlaceDialog from '../place/AddPlaceDialog';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 400,
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    background: '#F2F2F2',
    boxShadow: '3px 0px 16px 8px #00000020',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      boxShadow: 'none',
    },
  },

  blockWrapper: {
    padding: '16px 20px',
    background: 'white',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'left',
  },

  blockContent: {
    marginTop: 16,
    marginBottom: 16,
  },

  groceryItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  typeItem: {
    width: '100%',
    borderRadius: 8,
    padding: '16px 8px',
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      textTransform: 'none',
    },
  },

  avatar: {
    marginBottom: 8,
  },

  description: {
    fontSize: '12px',
    color: '#888',
  },

  listPlace: {
    marginLeft: -20,
    marginRight: -20,
  },

  marketContent: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },

  marketItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: '#c4c4c4',
    borderRadius: 16,
    width: 60,
    height: 60,
  },

  actions: {
    marginTop: 16,
    marginBottom: 16,
  },

  actionButton: {
    width: '70%',
    borderRadius: 999,
    color: '#27AE60',
    borderColor: '#27AE60',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const groceries = [
  {
    color: '#6FCF97',
    title: 'Veggie',
  },
  {
    color: '#27AE60',
    title: 'Family Friendly',
  },
  {
    color: '#219653',
    title: 'Meat',
  },
  {
    color: '#27AE60',
    title: 'Quick & Easy',
  },
  {
    color: '#27AE60',
    title: 'Fish',
  },
  {
    color: '#6FCF97',
    title: 'Vegan',
  },
];

const categories = [
  {
    color: '#6FCF97',
    title: 'Groceries',
  },
  {
    color: '#2F80ED',
    title: 'Farms',
  },
  {
    color: '#56CCF2',
    title: 'Markets',
  },
  {
    color: '#F2994A',
    title: 'Restaraunts',
  },
];

const MainDrawer = ({ location, onSearch }) => {
  const classes = useStyles();
  const [addPlaceDialog, setAddPlaceDialog] = useState(null);

  return (
    <>
      <div className={classes.blockWrapper}>
        <Typography className={classes.subtitle} component="div">
          Find a grocery plan
        </Typography>
        <div className={classes.blockContent}>
          <Grid container spacing={3}>
            {groceries.map(item => (
              <Grid
                item
                key={item.title}
                xs={3}
                className={classes.groceryItem}
              >
                <Avatar
                  className={classes.avatar}
                  style={{ background: item.color }}
                />
                <div className={classes.description}>{item.title}</div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div className={classes.blockWrapper}>
        <Typography className={classes.subtitle} component="div">
          Upcoming market in your area
        </Typography>
        <div className={classes.blockContent}>
          <div className={classes.marketContent}>
            <Chip label="See Amy’s Market" color="primary" />
            <div className={classes.marketItem} />
          </div>
        </div>
      </div>

      <div className={classes.blockWrapper}>
        <List className={classes.listPlace}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <HomeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Home" secondary="Set location" />
          </ListItem>
          <Divider variant="middle" />
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Set location" />
          </ListItem>
        </List>
      </div>

      <div className={classes.blockWrapper}>
        <Typography className={classes.subtitle} component="div">
          {location || 'Search your area'}
        </Typography>
        <div className={classes.blockContent}>
          <Grid container>
            {categories.map(item => (
              <Grid item key={item.title} xs={3}>
                <Button
                  className={classes.typeItem}
                  onClick={() => onSearch(item.title)}
                >
                  <Avatar
                    className={classes.avatar}
                    style={{ background: item.color }}
                  />
                  <div className={classes.description}>{item.title}</div>
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Grid container spacing={2} classes={{ root: classes.actions }}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            classes={{ root: classes.actionButton }}
            onClick={() => setAddPlaceDialog('Groceries')}
          >
            Add a place
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.actionButton}
            onClick={() => setAddPlaceDialog('Farm')}
          >
            Add a farm
          </Button>
        </Grid>
      </Grid>
      {addPlaceDialog !== null && (
        <AddPlaceDialog
          open
          onClose={() => setAddPlaceDialog(null)}
          category={addPlaceDialog}
        />
      )}
    </>
  );
};

export default MainDrawer;
