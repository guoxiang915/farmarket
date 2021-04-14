import React from 'react';
import { Grid } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import ReadonlyText from '../forms/ReadonlyText';

export default function FarmShares({ data, onUpdate, classes }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Farm Share</div>
            <ReadonlyText value={data.farmShare} onChange={() => onUpdate()} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
