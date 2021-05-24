import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { StorefrontOutlined } from '@material-ui/icons';
import ReadonlyText from '../forms/ReadonlyText';
import FarmSharesDialog from './FarmSharesDialog';

export default function FarmShares({ data, onUpdate, classes }) {
  const [showFarmShareDialog, setShowFarmShareDialog] = useState(false);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={1}>
            <StorefrontOutlined />
          </Grid>
          <Grid item xs={11}>
            <div className={classes.label}>Farm Share</div>
            <ReadonlyText
              value={data.farmShare}
              onChange={() => onUpdate()}
              onOpen={() => setShowFarmShareDialog(true)}
            />

            {showFarmShareDialog && (
              <FarmSharesDialog
                open
                business="Your Business Name"
                onClose={() => setShowFarmShareDialog(false)}
                onSubmit={res => {
                  console.log(res);
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
