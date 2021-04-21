import React from 'react';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

export default function FoodCoOp({ data, onUpdate, classes }) {
  const sizes = ['100-200', '200-500', '500-1000', '1000+'];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Operating structure</div>
            <TextField
              fullWidth
              placeholder="Enter structure"
              value={data.structure}
              onChange={e => onUpdate({ ...data, structure: e.target.value })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Associated farms</div>
            <TextField
              fullWidth
              placeholder="Search for a farm"
              value={data.farm}
              onChange={e => onUpdate({ ...data, farm: e.target.value })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Membership cost</div>
            <TextField
              fullWidth
              placeholder="Enter cost"
              value={data.cost}
              onChange={e => onUpdate({ ...data, cost: e.target.value })}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Membership size</div>
            <Select
              fullWidth
              value={data.size}
              onChange={e =>
                onUpdate({
                  ...data,
                  size: e.target.value,
                })
              }
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
