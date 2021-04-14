import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import ChipInput from 'material-ui-chip-input';
import ReadonlyText from '../forms/ReadonlyText';

export default function Farm({ data, onUpdate, classes }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Associated pick-up locations</div>
            <TextField
              fullWidth
              placeholder="Add a location"
              value={data.location}
              onChange={e => onUpdate({ ...data, location: e.target.value })}
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
            <div className={classes.label}>Volunteer Hours</div>
            <ReadonlyText placeholder="Enter hour" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Volunteer URL</div>
            <TextField
              fullWidth
              placeholder="Enter URL"
              value={data.url}
              onChange={e => onUpdate({ ...data, url: e.target.value })}
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
            <div className={classes.label}>Specialities</div>
            <ChipInput
              value={data.specialities}
              onChange={chips => onUpdate({ ...data, specialities: chips })}
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
            <div className={classes.label}>Tags</div>
            <ChipInput
              value={data.tags}
              onChange={chips => onUpdate({ ...data, tags: chips })}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
