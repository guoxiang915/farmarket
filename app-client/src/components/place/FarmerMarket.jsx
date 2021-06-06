import React from 'react';
import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import {
  LocalPizzaOutlined,
  MonetizationOnOutlined,
  RoomOutlined,
} from '@material-ui/icons';

export default function FarmerMarket({ data, onChange, classes }) {
  const marketTypes = ['Open-air'];
  const structures = ['For-profit', 'Non-profit', 'Regional gov'];

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <LocalPizzaOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Type of market</div>
            <Select
              fullWidth
              value={data.marketType}
              name="farmerMarket.marketType"
              onChange={onChange}
            >
              {marketTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
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
            <TextField
              fullWidth
              placeholder="Search for a farm"
              value={data.farm}
              name="farmerMarket.farm"
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <MonetizationOnOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Operating structure</div>
            <Select
              fullWidth
              value={data.structure}
              name="farmerMarket.structure"
              onChange={onChange}
            >
              {structures.map(structure => (
                <MenuItem key={structure} value={structure}>
                  {structure}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
