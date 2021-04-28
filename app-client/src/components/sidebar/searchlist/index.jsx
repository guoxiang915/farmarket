import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { advancedSearchData } from '../../../api/search';

import SearchFilter from './SearchFilter';
import ResultList from './ResultList';
import ResultDetail from './ResultDetail';

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
  const [selectedId, setSelectedId] = useState(null);

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
      {selectedId ? (
        <ResultDetail id={selectedId} />
      ) : (
        <ResultList items={items} onSelect={setSelectedId} />
      )}
    </div>
  );
};

export default SearchList;
