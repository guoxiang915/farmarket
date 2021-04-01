import React from 'react';
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
import SearchBox from '../searchBox/SearchBox';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 400,
    height: '100vh',
    overflowY: 'auto',
    background: '#F2F2F2',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  actionButton: {
    width: '100%',
    borderRadius: 999,
    color: '#27AE60',
    borderColor: '#27AE60',
  },
}));

const Sidebar = () => {
  const classes = useStyles();

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

  const lakewoods = [
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

  return (
    <div className={classes.container}>
      <div className={classes.blockWrapper}>
        <SearchBox />
      </div>

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
          Lakewood
        </Typography>
        <div className={classes.blockContent}>
          <Grid container spacing={3}>
            {lakewoods.map(item => (
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
      <Grid container spacing={2} className={classes.actions}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.actionButton}
          >
            Add a place
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.actionButton}
          >
            Add a farm
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Sidebar;
