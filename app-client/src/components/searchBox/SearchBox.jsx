import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
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
      borderRadius: 8,
      border: '1px solid #DADCE0',
      boxShadow: 'none',

      '&.focus': {
        boxShadow: '0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)',
        borderColor: 'transparent',
      },
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

const SearchBox = ({ query: defaultQuery, onSearch, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleToggleNavigation = () => {
    dispatch(toggleNavigation(true));
  };

  useEffect(() => {
    setQuery(defaultQuery || '');
  }, [defaultQuery]);

  return (
    <Paper
      component="div"
      className={classNames(classes.root, focused && 'focus')}
    >
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
            onSearch({ q: query });
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => onSearch({ q: query })}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color={!defaultQuery && !id ? 'primary' : undefined}
        className={classes.iconButton}
        aria-label="directions"
        onClick={() => onSearch(id ? { id } : undefined)}
      >
        {!defaultQuery && !id ? <DirectionsIcon /> : <CloseIcon />}
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
