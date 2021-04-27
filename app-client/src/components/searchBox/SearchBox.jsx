import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CloseIcon from '@material-ui/icons/Close';
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

const SearchBox = ({ query: defaultQuery, onSearch }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleToggleNavigation = () => {
    dispatch(toggleNavigation(true));
  };

  useEffect(() => {
    setQuery(defaultQuery || '');
  }, [defaultQuery]);

  return (
    <Paper component="div" className={classes.root}>
      <IconButton
        className={classes.iconButton}
        onClick={() => handleToggleNavigation()}
      >
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Every Farm"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            onSearch(query);
          }
        }}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => onSearch(query)}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color={!query ? 'primary' : undefined}
        className={classes.iconButton}
        aria-label="directions"
        onClick={() => onSearch('')}
      >
        {!query ? <DirectionsIcon /> : <CloseIcon />}
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
