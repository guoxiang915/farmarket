import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';

import SearchFilter from './SearchFilter';
import ResultList from './ResultList';
import { SEARCH_PLACES_QUERY } from '../../../graphql/queries';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },

  loader: {
    marginTop: '40%',
  },
}));

const SearchList = ({ query, category, rating, hour, onSearch }) => {
  const classes = useStyles();
  const { push } = useHistory();

  const [searchPlaces, { loading, data: places }] = useLazyQuery(
    SEARCH_PLACES_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  useEffect(() => {
    const getData = async () => {
      try {
        searchPlaces({
          variables: {
            q: query,
            cat: category,
            rating,
            hour,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, [query, category, rating, hour]);

  return (
    <div className={classes.container}>
      <SearchFilter
        filters={{
          category,
          rating,
          hour,
        }}
        onUpdateFilters={newFilters => onSearch(newFilters)}
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
