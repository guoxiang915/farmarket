import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';

import SearchFilter from './SearchFilter';
import ResultList from './ResultList';
import { SEARCH_PLACES_QUERY } from '../../../graphql/query';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },

  loader: {
    marginTop: '40%',
  },
}));

const SearchList = ({ query }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const [filters, setFilters] = useState({
    type: null,
    rating: null,
    category: null,
    hour: null,
    price: null,
  });

  const [searchPlaces, { loading, data: places }] = useLazyQuery(
    SEARCH_PLACES_QUERY
  );

  useEffect(() => {
    const getData = async () => {
      try {
        searchPlaces({
          variables: {
            q: query,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [query, filters]);

  return (
    <div className={classes.container}>
      <SearchFilter
        filters={filters}
        onUpdateFilters={newFilters =>
          setFilters({ ...filters, ...newFilters })
        }
      />
      {loading && (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      )}
      {!loading && places?.searchPlaces ? (
        <ResultList
          items={places?.searchPlaces}
          onSelect={id => {
            push(`/place/${id}`);
          }}
        />
      ) : null}
    </div>
  );
};

export default SearchList;
