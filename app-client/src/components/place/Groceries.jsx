import React from 'react';
import { Grid } from '@material-ui/core';
import { RoomOutlined } from '@material-ui/icons';
import Autocomplete from '../forms/Autocomplete';

export default function Groceries({
  onChange,
  farms,
  classes,
  errors,
  touched,
}) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <RoomOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Associated farms</div>
            <Autocomplete
              InputProps={{
                fullWidth: true,
                placeholder: 'Search for a farm',
                name: 'groceries.farm',
                errors: errors.farm && touched.farm,
                helperText: errors.farm && touched.farm ? errors.farm : null,
              }}
              options={farms}
              onChange={farm => {
                onChange({
                  target: {
                    value: farm.map(item => item.id),
                    name: 'groceries.farm',
                  },
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
