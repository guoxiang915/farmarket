import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

export default function Groceries({ data, onUpdate, farms, classes }) {
  console.log(farms);
  return (
    <Grid container spacing={4}>
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
    </Grid>
  );
}
