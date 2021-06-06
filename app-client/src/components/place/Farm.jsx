import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import {
  AccessTimeOutlined,
  LinkOutlined,
  LocalOfferOutlined,
  MoreOutlined,
  StorefrontOutlined,
} from '@material-ui/icons';
import ChipInput from 'material-ui-chip-input';
import ReadonlyText from '../forms/ReadonlyText';
import FarmSharesDialog from './FarmSharesDialog';
import AddHourDialog from './AddHourDialog';

export default function Farm({ data, onChange, classes }) {
  const [hourDialog, setShowHourDialog] = useState(false);
  const [showFarmShareDialog, setShowFarmShareDialog] = useState(false);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <StorefrontOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Associated pick-up locations</div>
            <TextField
              fullWidth
              placeholder="Add a location"
              value={data.location}
              name="farm.location"
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccessTimeOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Volunteer Hours</div>
            <ReadonlyText
              fullWidth
              placeholder="Volunteer Hours here"
              onOpen={() => setShowHourDialog(true)}
              value={data.hours
                .filter(item => item.start && item.end)
                .map(
                  item =>
                    `${item.weekday[0].toUpperCase() +
                      item.weekday.substring(1)}: ${item.start}-${item.end}`
                )
                .join(',')}
              name="farm.hours"
            />
            {hourDialog && (
              <AddHourDialog
                open
                business="Your Business Name"
                onClose={() => setShowHourDialog(false)}
                hours={data.hours}
                onSubmit={hours => {
                  onChange({
                    target: { name: 'farm.hours', value: hours },
                  });
                  setShowHourDialog(false);
                }}
              />
            )}
            <ReadonlyText placeholder="Enter hour" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <LinkOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Volunteer URL</div>
            <TextField
              fullWidth
              placeholder="Enter URL"
              value={data.url}
              name="farm.url"
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <MoreOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Specialities</div>
            <ChipInput
              value={data.specialities}
              name="farm.specialities"
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <LocalOfferOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Tags</div>
            <ChipInput value={data.tags} name="farm.tags" onChange={onChange} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <StorefrontOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Farm Share</div>
            <ReadonlyText
              value={data.farmShare.map(item => item.type).join(',')}
              onOpen={() => setShowFarmShareDialog(true)}
              name="farm.farmShare"
            />

            {showFarmShareDialog && (
              <FarmSharesDialog
                open
                business="Your Business Name"
                onClose={() => setShowFarmShareDialog(false)}
                onSubmit={farmShare => {
                  onChange({
                    target: { name: 'farm.farmShare', value: farmShare },
                  });
                  setShowFarmShareDialog(false);
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
