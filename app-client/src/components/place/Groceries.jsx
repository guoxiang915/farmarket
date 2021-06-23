import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { RoomOutlined } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

export default function Groceries({
  data,
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
              multiple
              id="groceries.farm"
              options={farms}
              getOptionLabel={option => option.title}
              defaultValue={data.farm || []}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Search for a farm"
                  name="groceries.farm"
                  errors={errors.farm && touched.farm}
                  helperText={errors.farm && touched.farm ? errors.farm : null}
                />
              )}
              onChange={(event, value) => {
                console.log(event, value);
                const result = !Array.isArray(value) ? [value] : value;
                onChange({
                  target: {
                    value: result.map(item => item.id),
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
