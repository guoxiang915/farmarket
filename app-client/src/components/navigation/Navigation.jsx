import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Drawer,
  IconButton,
} from '@material-ui/core';
import { Close as CloseIcon, Map as MapIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { openModal, toggleNavigation } from '../../store/actions/appActions';

const useStyles = makeStyles(theme => ({
  container: {
    width: 300,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  header: {
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: '20px',
    lineHeight: '25px',
  },
  close: {},
  menuList: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  menuItem: {
    fontSize: '14px',
    lineHeight: '18px',
    color: 'black',
    fontWeight: 500,
  },
  subMenuItem: {
    fontSize: '13px',
    lineHeight: '16px',
    color: 'black',
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const history = useHistory();

  const { isShowNavigation } = useSelector(state => state.appState);
  const { isLoggedIn } = useSelector(state => state.authState);
  const dispatch = useDispatch();

  const handleToggleNavigation = state => {
    dispatch(toggleNavigation(state));
  };

  const mainMenu = [
    {
      text: 'Map',
      to: '#',
    },
    {
      text: 'Find a plan',
      to: '#',
    },
    {
      text: 'Open now',
      to: '#',
    },
  ];

  const accountMenu = [
    {
      text: 'Orders & payments',
      to: '#',
    },
    {
      text: 'Your places',
      to: '#',
    },
    {
      text: 'Your contributions',
      to: '#',
    },
    {
      text: 'Share or embed map',
      to: '#',
    },
    {
      text: 'Print',
      to: '#',
    },
  ];

  const subMenu = [
    {
      text: 'Add a missing place',
      to: '#',
    },
    {
      text: 'Add your business',
      to: '#',
    },
    {
      text: 'Get help',
      to: '#',
    },
    {
      text: isLoggedIn ? 'Logout' : 'Login',
      onClick: () => {
        if (isLoggedIn) {
          localStorage.setItem('token', '');
          history.go(0);
        } else {
          dispatch(openModal('login-modal'));
        }
      },
    },
  ];

  return (
    <Drawer
      anchor="left"
      open={isShowNavigation}
      onClose={() => handleToggleNavigation(false)}
      classes={{ paper: classes.container }}
    >
      <div className={classes.header}>
        <div className={classes.title}>EveryFarm</div>
        <IconButton onClick={() => handleToggleNavigation(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.menuList}>
        {mainMenu.map(({ text }) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText
              primary={text}
              classes={{ primary: classes.menuItem }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className={classes.menuList}>
        {accountMenu.map(({ text }) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText
              primary={text}
              classes={{ primary: classes.menuItem }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className={classes.menuList}>
        {subMenu.map(({ text, to, onClick }) => (
          <ListItem button key={text}>
            <ListItemText
              primary={text}
              to={to}
              onClick={onClick}
              classes={{ primary: classes.subMenuItem }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigation;
