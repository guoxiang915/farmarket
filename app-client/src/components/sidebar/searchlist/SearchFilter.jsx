import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import {
  // typeOptions,
  // priceOptions,
  categoryOptions,
  hourOptions,
  ratingOptions,
} from '../../../utils/options';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    padding: '16px',
    borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    background: theme.colors.primary.white,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: -8,
  },

  filter: {
    marginRight: 12,
    marginBottom: 8,
    borderRadius: 99,
    textTransform: 'capitalize',
  },
}));

const SelectButton = ({ title, value, options, onSelect, classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color={value ? 'primary' : undefined}
        variant="outlined"
        className={classNames(classes.filter, value && 'selected')}
        onClick={handleClick}
        size="small"
      >
        {value || title} <ArrowDropDown style={{ marginLeft: 8 }} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map(option => (
          <MenuItem
            onClick={() => {
              onSelect(option.value);
              handleClose();
            }}
            key={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const SearchFilter = ({ filters, onUpdateFilters }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {/* <div className={classes.filterItem}>
        <SelectButton
          title="In-person"
          value={filters.type}
          onSelect={type => onUpdateFilters({ type })}
          options={typeOptions}
          classes={classes}
        />
      </div> */}
      {/* <div className={classes.filterItem}>
        <SelectButton
          title="Price"
          value={filters.price}
          onSelect={price => onUpdateFilters({ price })}
          options={priceOptions}
          classes={classes}
        />
      </div> */}
      <div className={classes.filterItem}>
        <SelectButton
          title="Rating"
          value={filters.rating}
          onSelect={rating => onUpdateFilters({ rating })}
          options={ratingOptions}
          classes={classes}
        />
      </div>
      <div className={classes.filterItem}>
        <SelectButton
          title="Category"
          value={filters.category}
          onSelect={category => onUpdateFilters({ category })}
          options={categoryOptions}
          classes={classes}
        />
      </div>
      <div className={classes.filterItem}>
        <SelectButton
          title="Hours"
          value={filters.hour}
          onSelect={hour => onUpdateFilters({ hour })}
          options={hourOptions}
          classes={classes}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
