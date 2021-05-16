import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, Route, useLocation, useHistory } from 'react-router';
import SearchBox from '../searchBox/SearchBox';
import MainDrawer from './MainDrawer';
import SearchList from './searchlist';
import PlaceDetail from './placeDetail';

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
  const { push } = useHistory();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || '';
  const location = {
    latitude: searchParams.get('lat') || 0,
    longitude: searchParams.get('lng') || 0,
  };

  console.log(category, location, searchParams.toString());

  const handleSearch = params => {
    if (params) {
      const { q = query, cat = category } = params;
      const newSearchParams = new URLSearchParams();
      if (q) {
        newSearchParams.set('q', q);
      }
      if (cat) {
        newSearchParams.set('cat', cat);
      }

      if (newSearchParams.toString()) {
        push(`/search?${newSearchParams.toString()}`);
      }
      return;
    }
    push('/');
  };

  return (
    <div className={classes.container}>
      <div className={classes.blockWrapper}>
        <SearchBox query={query || category || ''} onSearch={handleSearch} />
      </div>

      <Switch>
        <Route path="/search" render={() => <SearchList query={query} />} />
        <Route
          path="/place/:id"
          render={({ match }) => <PlaceDetail id={match.params.id} />}
        />
        <Route
          render={() => (
            <MainDrawer location="Lakewood" onSearch={handleSearch} />
          )}
        />
      </Switch>
    </div>
  );
};

export default Sidebar;
