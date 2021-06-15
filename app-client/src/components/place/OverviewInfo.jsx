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
import {
  AccessTimeOutlined,
  AccountCircleOutlined,
  AnnouncementOutlined,
  ClassOutlined,
  DescriptionOutlined,
  ExploreOutlined,
  LinkOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import Geocoder from '../mapbox/Geocoder';
import ReadonlyText from '../forms/ReadonlyText';
import AddHourDialog from './AddHourDialog';

export default function OverviewInfo({
  data,
  onChange,
  onBlur,
  categories,
  classes,
  errors = {},
  touched = {},
}) {
  const [hourDialog, setShowHourDialog] = useState(false);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AccountCircleOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Name *</div>
            <TextField
              fullWidth
              placeholder="Your Business Name here"
              value={data.name}
              name="overview.name"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.name && touched.name}
              helperText={errors.name && touched.name ? errors.name : null}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <DescriptionOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Bio</div>
            <TextField
              fullWidth
              placeholder="A little about this place"
              multiline
              value={data.bio}
              name="overview.bio"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.bio && touched.bio}
              helperText={errors.bio && touched.bio ? errors.bio : null}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <ClassOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Category *</div>
            <Select
              fullWidth
              value={data.category}
              name="overview.category"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.category && touched.category}
              // Show error message
              // helperText={
              //   errors.category && touched.category ? errors.category : null
              // }
            >
              {categories.map(category => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <ExploreOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Location *</div>
            <Geocoder
              name="overview.location"
              onChange={onChange}
              onBlur={onBlur}
              errors={errors.location && touched.location}
              helperText={
                errors.location && touched.location ? errors.location : null
              }
            />
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
            <AccessTimeOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Hours</div>
            <ReadonlyText
              fullWidth
              placeholder="Your Business Hours here"
              onOpen={() => setShowHourDialog(true)}
              value={
                data.hours.status ||
                data.hours.hours
                  .filter(item => item.start && item.end)
                  .map(
                    item =>
                      `${item.weekday[0].toUpperCase() +
                        item.weekday.substring(1)}: ${item.start}-${item.end}`
                  )
                  .join(',')
              }
              name="overview.hours"
              onBlur={onBlur}
            />
            {hourDialog && (
              <AddHourDialog
                open
                business="Your Business Name"
                onClose={() => setShowHourDialog(false)}
                hours={data.hours}
                onSubmit={hours => {
                  onChange({
                    target: { name: 'overview.hours', value: hours },
                  });
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
            <LinkOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Add events from a Facebook page</div>
            <TextField
              fullWidth
              placeholder="Connect Facebook"
              value={data.facebookUrl}
              name="overview.facebookUrl"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.facebookUrl && touched.facebookUrl}
              helperText={
                errors.facebookUrl && touched.facebookUrl
                  ? errors.facebookUrl
                  : null
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <ShoppingCartOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Place an order</div>
            <TextField
              fullWidth
              placeholder="Enter a URL"
              value={data.orderUrl}
              name="overview.orderUrl"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.orderUrl && touched.orderUrl}
              helperText={
                errors.orderUrl && touched.orderUrl ? errors.orderUrl : null
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <AnnouncementOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Claim ownership?</div>
            <Switch
              color="primary"
              value={data.ownership}
              name="overview.ownership"
              onChange={onChange}
              onBlur={onBlur}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
