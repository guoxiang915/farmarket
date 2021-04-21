import React, { useState } from 'react';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { Close as CloseIcon, ExpandMore } from '@material-ui/icons';
import OverviewInfo from './OverviewInfo';
import Groceries from './Groceries';
import FarmShares from './FarmShares';
import Farm from './Farm';
import FoodCoOp from './FoodCoOp';
import FarmerMarket from './FarmerMarket';

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

  content: {
    padding: 0,
  },

  section: {
    boxShadow: 'none',
    borderTop: '1px solid #ddd',
    '&.MuiAccordion-root.Mui-expanded': {
      margin: 0,
    },
  },

  sectionHeader: {
    background: '#F2F2F2',
    '&.MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 'unset',
    },
    '&>.MuiAccordionSummary-content': {
      margin: 0,
    },
  },

  sectionTitle: {
    color: 'black',
    fontSize: '14px',
    lineHeight: '22px',
    fontWeight: 400,
    textTransform: 'uppercase',
  },

  sectionContent: {
    padding: '24px 16px',
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

const AddPlaceDialog = ({ open, onClose, category = 'Groceries' }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState('overview');
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    bio: '',
    category,
    location: '',
    containing: '',
    facebookUrl: '',
    orderUrl: '',
    ownership: false,
    hours: {},
  });
  const [groceryData, setGroceryData] = useState({ farm: '' });
  const [farmSharesData, setFarmSharesData] = useState({ farmShare: '' });
  const [farmData, setFarmData] = useState({
    location: '',
    hours: '',
    url: '',
    specialities: ['Eggs', 'Lamb', 'Wool', 'Compost'],
    tags: ['USDA Organic', 'Biodynamic', 'Regenerative'],
  });
  const [foodCoOpData, setFoodCoOpData] = useState({
    structure: '',
    farm: '',
    cost: '',
    size: '100-200',
  });
  const [farmerMarketData, setFarmerMarketData] = useState({
    marketType: 'Open-air',
    farm: '',
    structure: 'For-profit',
  });

  const categories = [
    'Farm Shares',
    'Farm',
    'Food Co-op',
    'Groceries',
    'Farm-Stand',
    "Farmer's Market",
  ];

  const farms = [];

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.header}>
        <DialogTitle className={classes.title}>
          <div>Add a Place</div>
          <div className={classes.subtitle}>Co-op</div>
        </DialogTitle>
        <IconButton className={classes.close} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent className={classes.content}>
        {/* Overview fields */}
        <Accordion
          expanded={expanded === 'overview'}
          onChange={() => setExpanded('overview')}
          className={classes.section}
        >
          <AccordionSummary
            className={classes.sectionHeader}
            expandIcon={<ExpandMore />}
          >
            <div className={classes.sectionTitle}>Overview</div>
          </AccordionSummary>
          <AccordionDetails className={classes.sectionContent}>
            <OverviewInfo
              categories={categories}
              data={generalInfo}
              onUpdate={setGeneralInfo}
              classes={classes}
            />
          </AccordionDetails>
        </Accordion>

        {/* Category specific fields */}
        {(generalInfo.category === 'Groceries' ||
          generalInfo.category === 'Farm-Stand') && (
          <Accordion
            expanded={expanded === 'groceries'}
            onChange={() => setExpanded('groceries')}
            className={classes.section}
          >
            <AccordionSummary
              className={classes.sectionHeader}
              expandIcon={<ExpandMore />}
            >
              <div className={classes.sectionTitle}>{generalInfo.category}</div>
            </AccordionSummary>
            <AccordionDetails className={classes.sectionContent}>
              <Groceries
                data={groceryData}
                onUpdate={setGroceryData}
                classes={classes}
                farms={farms}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Farm Shares fields */}
        {generalInfo.category === 'Farm Shares' && (
          <Accordion
            expanded={expanded === 'groceries'}
            onChange={() => setExpanded('groceries')}
            className={classes.section}
          >
            <AccordionSummary
              className={classes.sectionHeader}
              expandIcon={<ExpandMore />}
            >
              <div className={classes.sectionTitle}>{generalInfo.category}</div>
            </AccordionSummary>
            <AccordionDetails className={classes.sectionContent}>
              <FarmShares
                data={farmSharesData}
                onUpdate={setFarmSharesData}
                classes={classes}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Farm Shares fields */}
        {generalInfo.category === 'Farm' && (
          <Accordion
            expanded={expanded === 'groceries'}
            onChange={() => setExpanded('groceries')}
            className={classes.section}
          >
            <AccordionSummary
              className={classes.sectionHeader}
              expandIcon={<ExpandMore />}
            >
              <div className={classes.sectionTitle}>{generalInfo.category}</div>
            </AccordionSummary>
            <AccordionDetails className={classes.sectionContent}>
              <Farm data={farmData} onUpdate={setFarmData} classes={classes} />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Food Co-op fields */}
        {generalInfo.category === 'Food Co-op' && (
          <Accordion
            expanded={expanded === 'groceries'}
            onChange={() => setExpanded('groceries')}
            className={classes.section}
          >
            <AccordionSummary
              className={classes.sectionHeader}
              expandIcon={<ExpandMore />}
            >
              <div className={classes.sectionTitle}>{generalInfo.category}</div>
            </AccordionSummary>
            <AccordionDetails className={classes.sectionContent}>
              <FoodCoOp
                data={foodCoOpData}
                onUpdate={setFoodCoOpData}
                classes={classes}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {/* Farmer's Market fields */}
        {generalInfo.category === "Farmer's Market" && (
          <Accordion
            expanded={expanded === 'groceries'}
            onChange={() => setExpanded('groceries')}
            className={classes.section}
          >
            <AccordionSummary
              className={classes.sectionHeader}
              expandIcon={<ExpandMore />}
            >
              <div className={classes.sectionTitle}>{generalInfo.category}</div>
            </AccordionSummary>
            <AccordionDetails className={classes.sectionContent}>
              <FarmerMarket
                data={farmerMarketData}
                onUpdate={setFarmerMarketData}
                classes={classes}
              />
            </AccordionDetails>
          </Accordion>
        )}
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
