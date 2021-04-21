import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Geocoder from '../mapbox/Geocoder';
import ReadonlyText from '../forms/ReadonlyText';
import AddHourDialog from './AddHourDialog';

export default function OverviewInfo({ data, onUpdate, categories, classes }) {
  const [hourDialog, setShowHourDialog] = useState(false);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Name</div>
            <TextField
              fullWidth
              placeholder="Your Business Name here"
              value={data.name}
              onChange={e => onUpdate({ ...data, name: e.target.value })}
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
            <div className={classes.label}>Bio</div>
            <TextField
              fullWidth
              placeholder="A little about this place"
              multiline
              value={data.bio}
              onChange={e => onUpdate({ ...data, bio: e.target.value })}
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
            <div className={classes.label}>Category</div>
            <Select
              fullWidth
              value={data.category}
              onChange={e =>
                onUpdate({
                  ...data,
                  category: e.target.value,
                })
              }
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Location</div>
            {/* <TextField fullWidth placeholder="Your Location here" /> */}
            <Geocoder />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={
                <div className={classes.label}>
                  If this place is located within another, enter the containing
                  place
                </div>
              }
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
            <div className={classes.label}>Hours</div>
            <ReadonlyText
              fullWidth
              placeholder="Your Business Hours here"
              onOpen={() => setShowHourDialog(true)}
              value={Object.entries(data.hours)
                .filter(([, weekday]) => weekday.start && weekday.end)
                .map(
                  ([label, weekday]) =>
                    `${label[0].toUpperCase() + label.substring(1)}: ${
                      weekday.start
                    }-${weekday.end}`
                )
                .join(',')}
            />
            {hourDialog && (
              <AddHourDialog
                open
                business="Your Business Name"
                onClose={() => setShowHourDialog(false)}
                hours={data.hours}
                onSubmit={hours => {
                  onUpdate({ ...data, hours });
                  setShowHourDialog(false);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Add events from a Facebook page</div>
            <TextField
              fullWidth
              placeholder="Connect Facebook"
              value={data.facebookUrl}
              onChange={e => onUpdate({ ...data, facebookUrl: e.target.value })}
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
            <div className={classes.label}>Place an order</div>
            <TextField
              fullWidth
              placeholder="Enter a URL"
              value={data.orderUrl}
              onChange={e => onUpdate({ ...data, orderUrl: e.target.value })}
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
            <div className={classes.label}>Claim ownership?</div>
            <Switch
              color="primary"
              value={data.ownership}
              onChange={(e, checked) =>
                onUpdate({ ...data, ownership: checked })
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
