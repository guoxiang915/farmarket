import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grid,
  TextField,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Close as CloseIcon, AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 650,
    maxWidth: 'unset',
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
  },

  title: {
    padding: 0,
  },

  subtitle: {
    color: '#00000080',
    fontSize: '12px',
    lineHeight: '16px',
  },

  close: {},

  sectionTitle: {
    color: 'black',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 400,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 24,
  },

  label: {
    color: '#00000080',
    fontSize: '13px',
    lineHeight: '15px',
    marginTop: 4,
    marginBottom: 4,
  },

  actions: {
    padding: '16px 24px',
  },
}));

const AddPlaceDialog = ({ open, onClose }) => {
  const classes = useStyles();

  const categories = ['Groceries'];

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.header}>
        <DialogTitle className={classes.title}>
          <div>Add a Place</div>
          <div className={classes.subtitle}>Co-op</div>
        </DialogTitle>
        <IconButton className={classes.close}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent>
        <div className={classes.sectionTitle}>Overview</div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item xs={1}>
                <AccountCircle />
              </Grid>
              <Grid item xs={11}>
                <div className={classes.label}>Name</div>
                <TextField fullWidth placeholder="Your Business Name here" />
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
                <Select fullWidth>
                  {categories.map(category => (
                    <MenuItem value={category}>{category}</MenuItem>
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
                <TextField fullWidth placeholder="Your Location here" />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={
                    <div className={classes.label}>
                      If this place is located within another, enter the
                      containing place
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
                <TextField fullWidth placeholder="Your Business Hours here" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item xs={1}>
                <AccountCircle />
              </Grid>
              <Grid item xs={11}>
                <div className={classes.label}>
                  Add events from a Facebook page
                </div>
                <TextField fullWidth placeholder="Connect Facebook" />
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
                <TextField fullWidth placeholder="Enter a URL" />
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
                <Switch color="primary" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.sectionTitle}>Category specific fields</div>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlaceDialog;
