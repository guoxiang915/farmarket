import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { advancedSearchData } from '../../../api/search';

import SearchFilter from './SearchFilter';
import ResultList from './ResultList';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },
}));

const SearchList = ({ query }) => {
  const classes = useStyles();
  const [filters, setFilters] = useState({
    type: null,
    rating: null,
    category: null,
    hour: null,
    price: null,
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await advancedSearchData(query, filters);
        setItems(result);
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
      <ResultList items={items} />
    </div>
  );
};

export default SearchList;
