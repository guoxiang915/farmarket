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
import {
  AddLocationOutlined,
  Close as CloseIcon,
  CreditCardOutlined,
  ExitToAppOutlined,
  HelpOutlineOutlined,
  LockOpenOutlined,
  Map as MapIcon,
  CollectionsBookmarkOutlined,
  PrintOutlined,
  RoomOutlined,
  SearchOutlined,
  ShareOutlined,
  WhereToVoteOutlined,
} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { openModal, toggleNavigation } from '../../store/actions/appActions';
import useLogin from '../../utils/hooks/useLogin';

import logo from '../../assets/logo.png';

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
  logo: {
    height: 50,
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
  const { checkLogin } = useLogin();

  const handleToggleNavigation = state => {
    dispatch(toggleNavigation(state));
  };

  const mainMenu = [
    {
      icon: <MapIcon />,
      text: 'Map',
      to: '/',
      onClick: () => {
        history.push('/');
        handleToggleNavigation(false);
      },
    },
    {
      icon: <SearchOutlined />,
      text: 'Find a plan',
      to: '#',
    },
    {
      icon: <WhereToVoteOutlined />,
      text: 'Open now',
      to: '#',
    },
  ];

  const accountMenu = [
    {
      icon: <CreditCardOutlined />,
      text: 'Orders & payments',
      to: '#',
    },
    {
      icon: <RoomOutlined />,
      text: 'Your places',
      to: '#',
    },
    {
      icon: <CollectionsBookmarkOutlined />,
      text: 'Your contributions',
      to: '#',
    },
    {
      icon: <ShareOutlined />,
      text: 'Share or embed map',
      to: '#',
    },
    {
      icon: <PrintOutlined />,
      text: 'Print',
      to: '#',
    },
  ];

  const subMenu = [
    {
      icon: <AddLocationOutlined />,
      text: 'Add a missing place',
      onClick: () => {
        if (checkLogin()) {
          dispatch(openModal('add-place-modal', { category: 'groceries' }));
        }
        handleToggleNavigation(false);
      },
    },
    {
      icon: <AddLocationOutlined />,
      text: 'Add your business',
      onClick: () => {
        if (checkLogin()) {
          dispatch(openModal('add-place-modal', { category: 'farm' }));
        }
        handleToggleNavigation(false);
      },
    },
    {
      icon: <HelpOutlineOutlined />,
      text: 'Get help',
      to: '#',
    },
    {
      icon: isLoggedIn ? <ExitToAppOutlined /> : <LockOpenOutlined />,
      text: isLoggedIn ? 'Logout' : 'Login',
      onClick: () => {
        if (isLoggedIn) {
          localStorage.setItem('token', '');
          history.go(0);
        } else {
          dispatch(openModal('login-modal'));
        }
        handleToggleNavigation(false);
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
        <div className={classes.title}>
          <img src={logo} alt="EveryFarm" className={classes.logo} />
        </div>
        <IconButton onClick={() => handleToggleNavigation(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.menuList}>
        {mainMenu.map(({ icon, text, to, onClick }) => (
          <ListItem button key={text} to={to} onClick={onClick}>
            <ListItemIcon>{icon || <MapIcon />}</ListItemIcon>
            <ListItemText
              primary={text}
              classes={{ primary: classes.menuItem }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className={classes.menuList}>
        {accountMenu.map(({ icon, text, to, onClick }) => (
          <ListItem button key={text} to={to} onClick={onClick}>
            <ListItemIcon>{icon || <MapIcon />}</ListItemIcon>
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
          <ListItem button key={text} to={to} onClick={onClick}>
            <ListItemText
              primary={text}
              classes={{ primary: classes.subMenuItem }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigation;
