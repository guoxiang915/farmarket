import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
} from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {
  AccountCircle,
  CloseOutlined,
  Edit,
  KeyboardBackspaceOutlined,
  Save,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 650,
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

  headerContent: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: -16,
  },

  backButton: {
    marginTop: -12,
    marginRight: 4,
  },

  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      boxSizing: 'border-box',
      paddingLeft: '12px',
    },
    flex: '1',
  },

  title: {
    ...(theme.typography.headline || {}),
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '-0.009em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
      letterSpacing: '0',
    },
  },

  subtitle: {
    ...theme.typography.secondaryBody,
    lineHeight: '28px',
  },

  content: {
    padding: 0,
  },

  sectionHeader: {
    background: '#F2F2F2',
    textTransform: 'uppercase',
    color: '#00000080',
    padding: '16px 24px',
    '&.MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 'unset',
    },
    '&>.MuiAccordionSummary-content': {
      margin: 0,
    },
  },

  sectionContent: {
    padding: '24px 24px 48px',
  },

  weekday: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#000',
  },

  weekdayTitle: {
    width: 120,
    textTransform: 'capitalize',
    fontSize: '16px',
  },

  weekdayContent: {
    flex: 1,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
  },

  divider: {
    marginLeft: 8,
    marginRight: 8,
  },

  weekdayAction: {
    marginLeft: 4,
  },

  actions: {
    padding: '16px 24px',
  },

  label: {
    color: '#00000080',
    fontSize: '13px',
    lineHeight: '15px',
    marginTop: 4,
    marginBottom: 4,
  },

  payMethodGroup: {
    width: '100%',
    marginTop: 8,
    '& .MuiToggleButton-label': {
      color: '#000000',
      fontSize: '16px',
      textTransform: 'none',
    },
  },
}));

const payPeriods = ['Pay all at once', 'Pay monthly', 'Free'];

const ContentItem = ({
  title,
  isEdit,
  start,
  end,
  unit,
  onUpdate,
  classes,
}) => {
  return (
    <div className={classes.weekday}>
      <div className={classes.weekdayTitle}>{title}</div>
      <div className={classes.weekdayContent}>
        {isEdit ? (
          <>
            <TextField
              label="From"
              type="number"
              value={start || 0}
              onChange={e => onUpdate({ start: e.target.value })}
              fullWidth
            />
            <div className={classes.divider} />
            <TextField
              label="To"
              type="number"
              value={end || 0}
              onChange={e => onUpdate({ end: e.target.value })}
              fullWidth
            />
          </>
        ) : (
          `${start || 0} - ${end || 0} ${unit}`
        )}
      </div>
      <IconButton
        className={classes.weekdayAction}
        onClick={() =>
          onUpdate({
            isEdit: !isEdit,
          })
        }
        size="small"
      >
        {// eslint-disable-next-line
        isEdit ? <Save color="primary" /> : <Edit />}
      </IconButton>
    </div>
  );
};

const AddFarmShareDialog = ({ open, onSubmit, onClose, business }) => {
  const classes = useStyles();
  const [data, setData] = useState({
    vegetables: { isEdit: false, title: 'Vegetables' },
    leafyGreens: { isEdit: false, title: 'Leafy Greens' },
    seasonalItems: { isEdit: false, title: 'Seasonal Items' },
    dairy: { isEdit: false, title: 'Dairy' },
  });

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <IconButton onClick={onClose} className={classes.backButton}>
            <KeyboardBackspaceOutlined />
          </IconButton>
          <div className={classes.titleWrapper}>
            <Typography
              type="headline"
              component="h1"
              classes={{ root: classes.title }}
            >
              Add a farm share
            </Typography>
            <Typography
              type="subtitle"
              component="span"
              classes={{ root: classes.subtitle }}
            >
              {business}
            </Typography>
          </div>
        </div>
        <IconButton className={classes.close} onClick={onClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent className={classes.content}>
        <div className={classes.sectionHeader}>Contents</div>
        <div className={classes.sectionContent}>
          <ContentItem
            {...data.vegetables}
            unit="pounds"
            onUpdate={updated =>
              setData({
                ...data,
                vegetables: { ...data.vegetables, ...updated },
              })
            }
            classes={classes}
          />
          <ContentItem
            {...data.leafyGreens}
            unit="oz"
            onUpdate={updated =>
              setData({
                ...data,
                leafyGreens: { ...data.leafyGreens, ...updated },
              })
            }
            classes={classes}
          />
          <ContentItem
            {...data.seasonalItems}
            unit="pounds"
            onUpdate={updated =>
              setData({
                ...data,
                seasonalItems: { ...data.seasonalItems, ...updated },
              })
            }
            classes={classes}
          />
          <ContentItem
            {...data.dairy}
            unit="qts"
            onUpdate={updated =>
              setData({
                ...data,
                dairy: { ...data.dairy, ...updated },
              })
            }
            classes={classes}
          />
        </div>

        <div className={classes.sectionHeader}>Pricing</div>
        <div className={classes.sectionContent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={2}>
                  <AccountCircle />
                </Grid>
                <Grid item xs={10}>
                  <div className={classes.label}>Payment period</div>
                  <Select
                    fullWidth
                    value={data.payPeriod}
                    onChange={e =>
                      setData({
                        ...data,
                        payPeriod: e.target.value,
                      })
                    }
                  >
                    {payPeriods.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={2}>
                  <AccountCircle />
                </Grid>
                <Grid item xs={10}>
                  <div className={classes.label}>Payment</div>
                  <TextField
                    fullWidth
                    placeholder="Your payment"
                    type="number"
                    value={data.payment}
                    onChange={e =>
                      setData({ ...data, payment: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={1} />
                <Grid item xs={11}>
                  <div className={classes.label}>
                    You can accept members directly from every.farm by
                    connecting your Square, Stripe, or allowing us to collect
                    payments directly (3% processing fee)
                  </div>
                  <ToggleButtonGroup
                    orientation="horizontal"
                    value={data.payMethod}
                    exclusive
                    onChange={(e, payMethod) => setData({ ...data, payMethod })}
                    classes={{ root: classes.payMethodGroup }}
                  >
                    <ToggleButton value="square">Connect Square</ToggleButton>
                    <ToggleButton value="stripe">Connect Stripe</ToggleButton>
                    <ToggleButton value="collect">
                      Collect payment for me
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit && onSubmit(data)}
          color="primary"
          variant="contained"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFarmShareDialog;
