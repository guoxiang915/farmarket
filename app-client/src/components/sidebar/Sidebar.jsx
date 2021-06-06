import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, makeStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Switch, Route, useLocation, useHistory } from 'react-router';
import SearchBox from '../searchBox/SearchBox';
import MainDrawer from './MainDrawer';
import SearchList from './searchlist';
import PlaceDetail from './placeDetail';
import { categoryOptions } from '../../utils/options';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'fixed',
    zIndex: 10,
    top: 0,
    left: 0,
    width: 400,
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'visible',
    background: '#F2F2F2',
    boxShadow: '3px 0px 16px 8px #00000020',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    '&.hidden': {
      boxShadow: 'none',
      background: 'transparent',
      height: 'fit-content',
      top: 16,
      left: 20,
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      boxShadow: 'none',

      '&.hidden': {
        width: 'calc(100% - 40px)',
      },
    },
  },

  header: {
    padding: '16px 20px',
    background: 'white',
    width: '100%',
    boxShadow: '0px 4px 12px 4px #00000040',
    zIndex: 1,

    '&.hidden': {
      background: 'transparent',
      padding: 0,
      boxShadow: 'none',
    },
  },

  content: {
    width: '100%',
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',

    '&.hidden': {
      display: 'none',
    },
  },

  footer: {
    width: '100%',
    padding: '8px 20px',
    background: 'white',
    zIndex: 1,
    boxShadow: '0px -4px 12px 4px #00000040',

    '&.hidden': {
      boxShadow: 'none',
      padding: 0,
      background: 'transparent',
    },
  },

  actionButton: {
    width: '50%',
    borderRadius: 999,
    marginLeft: 'auto',
    marginRight: 'auto',
    textTransform: 'none',
    color: 'gray',

    '&.hidden': {
      marginTop: 4,
      borderRadius: 8,
      width: '100%',
      background: 'white',
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [expanded, setExpanded] = useState(true);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('cat') || '';
  // const location = {
  //   latitude: searchParams.get('lat') || 0,
  //   longitude: searchParams.get('lng') || 0,
  // };

  const handleSearch = params => {
    if (params?.id) {
      history.go(-1);
    } else if (params) {
      const { q = query, cat = category } = params;
      const newSearchParams = new URLSearchParams();
      if (q) {
        newSearchParams.set('q', q);
      }
      if (cat) {
        newSearchParams.set('cat', cat);
      }

      if (newSearchParams.toString()) {
        history.push(`/search?${newSearchParams.toString()}`);
      }
    } else {
      history.push('/');
    }
  };

  return (
    <div className={classNames(classes.container, !expanded && 'hidden')}>
      <div className={classNames(classes.header, !expanded && 'hidden')}>
        <Switch>
          <Route
            path="/search"
            render={() => (
              <SearchBox
                query={
                  query ||
                  categoryOptions.find(item => item.value === category)
                    ?.label ||
                  ''
                }
                onSearch={handleSearch}
              />
            )}
          />
          <Route
            path="/place/:id"
            render={({ match }) => (
              <SearchBox onSearch={handleSearch} id={match.params.id} />
            )}
          />
          <Route render={() => <SearchBox onSearch={handleSearch} />} />
        </Switch>
      </div>

      <div className={classNames(classes.content, !expanded && 'hidden')}>
        <Switch>
          <Route
            path="/search"
            render={() => <SearchList query={query} cat={category} />}
          />
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

      <div className={classNames(classes.footer, !expanded && 'hidden')}>
        <Button
          variant="outlined"
          className={classNames(classes.actionButton, !expanded && 'hidden')}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ExpandLess /> Hide details
            </>
          ) : (
            <>
              <ExpandMore /> Show details
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
