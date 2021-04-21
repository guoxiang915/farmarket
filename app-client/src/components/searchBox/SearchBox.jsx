import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { useDispatch } from 'react-redux';
import { toggleNavigation } from '../../store/actions/appActions';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const SearchBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleToggleNavigation = () => {
    dispatch(toggleNavigation(true));
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        onClick={() => handleToggleNavigation()}
      >
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Every Farm"
        inputProps={{ 'aria-label': 'search every farm' }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
