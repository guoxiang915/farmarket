import React from 'react';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import {
  LoyaltyOutlined,
  MonetizationOnOutlined,
  RoomOutlined,
  SupervisorAccountOutlined,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

export default function FoodCoOp({
  data,
  onChange,
  classes,
  errors,
  touched,
  farms,
}) {
  const sizes = ['100-200', '200-500', '500-1000', '1000+'];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <MonetizationOnOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Operating structure</div>
            <TextField
              fullWidth
              placeholder="Enter structure"
              value={data.structure}
              name="foodCoOp.structure"
              onChange={onChange}
              errors={errors.structure && touched.structure}
              helperText={
                errors.structure && touched.structure ? errors.structure : null
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <RoomOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Associated farms</div>
            <Autocomplete
              multiple
              id="foodCoOp.farm"
              options={farms}
              getOptionLabel={option => option.title}
              defaultValue={data.farm || []}
              renderInput={params => (
                <TextField
                  {...params}
                  fullWidth
                  placeholder="Search for a farm"
                  name="foodCoOp.farm"
                  errors={errors.farm && touched.farm}
                  helperText={errors.farm && touched.farm ? errors.farm : null}
                />
              )}
              onChange={(event, value) => {
                const result = !Array.isArray(value) ? [value] : value;
                onChange({
                  target: {
                    value: result.map(item => item.id),
                    name: 'foodCoOp.farm',
                  },
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <LoyaltyOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Membership cost</div>
            <TextField
              fullWidth
              placeholder="Enter cost"
              name="foodCoOp.cost"
              value={data.cost}
              onChange={onChange}
              errors={errors.farm && touched.farm}
              helperText={errors.farm && touched.farm ? errors.farm : null}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <SupervisorAccountOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Membership size</div>
            <Select
              fullWidth
              value={data.size}
              name="foodCoOp.size"
              onChange={onChange}
              errors={errors.size && touched.size}
              // TODO: add error text
              // helperText={errors.size && touched.size ? errors.size : null}
            >
              {sizes.map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
