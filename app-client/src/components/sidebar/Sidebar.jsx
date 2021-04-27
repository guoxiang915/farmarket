import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import SearchBox from '../searchBox/SearchBox';
import MainDrawer from './MainDrawer';
import SearchList from './searchlist';

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
}));

const Sidebar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');

  const handleSearch = q => {
    setQuery(q);
  };

  return (
    <div className={classes.container}>
      <div className={classes.blockWrapper}>
        <SearchBox query={query} onSearch={handleSearch} />
      </div>

      {!query && <MainDrawer location="Lakewood" onSearch={handleSearch} />}

      {query && <SearchList query={query} />}
    </div>
  );
};

export default Sidebar;
