import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core';
import { CloseOutlined, KeyboardBackspaceOutlined } from '@material-ui/icons';

import veggieIcon from '../../assets/veggie.png';
import familyFriendlyIcon from '../../assets/family-friendly.png';
import AddFarmShareDialog from './AddFarmShareDialog';

const useStyles = makeStyles(theme => ({
  paper: {
    width: 500,
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

  description: {
    padding: '16px 24px',
    background: '#F2F2F2',
  },

  templates: {},

  item: {
    padding: '12px 24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #f2f2f2',

    '&:hover': {
      background: '#F2F2F2',
    },
  },

  img: {
    width: 30,
    height: 30,
    marginRight: 16,
  },

  label: {},
}));

const templates = [
  {
    icon: veggieIcon,
    label: 'Veggie',
  },
  {
    icon: familyFriendlyIcon,
    label: 'Family Friendly',
  },
  {
    icon: veggieIcon,
    label: 'Veggie',
  },
  {
    icon: familyFriendlyIcon,
    label: 'Family Friendly',
  },
  {
    icon: veggieIcon,
    label: 'Veggie',
  },
  {
    icon: familyFriendlyIcon,
    label: 'Family Friendly',
  },
];

const FarmSharesDialog = ({ open, onSubmit, onClose, business }) => {
  const classes = useStyles();
  const [template, setTemplate] = useState(null);

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
              Farm Shares
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

      <div className={classes.description}>
        Tip: Create multiples types of farm shares to attract more patrons.
        Choose a template to help you get started:
      </div>

      <Grid container className={classes.templates}>
        {templates.map(item => (
          <Grid
            item
            key={item.label}
            xs={12}
            sm={6}
            className={classes.item}
            onClick={() => setTemplate(item.label)}
          >
            <img src={item.icon} className={classes.img} alt={item.label} />
            <div className={classes.label}>{item.label}</div>
          </Grid>
        ))}
      </Grid>

      {template && (
        <AddFarmShareDialog
          open
          onClose={() => setTemplate(null)}
          business={business}
          onSubmit={data => onSubmit(data)}
        />
      )}
    </Dialog>
  );
};

export default FarmSharesDialog;
