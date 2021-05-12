import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
  CircularProgress,
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

  progress: {
    color: 'white',
  },
}));

const PlaceSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  bio: Yup.string(),
  category: Yup.string().required('Required'),
  location: Yup.object()
    .required('Required')
    .shape({
      latitude: Yup.number(),
      longitude: Yup.number(),
    }),
  containing: Yup.boolean(),
  otherLocation: Yup.object().shape({
    latitude: Yup.number(),
    longitude: Yup.number(),
  }),
  hours: Yup.array().of(
    Yup.object().shape({
      start: Yup.string(),
      end: Yup.string(),
      weekday: Yup.string(),
    })
  ),
  facebookUrl: Yup.string().url('Should match URL format'),
  orderUrl: Yup.string().url('Should match URL format'),
  ownership: Yup.boolean(),

  farmShares: Yup.object().shape({
    farmShare: Yup.string(),
  }),
  farm: Yup.object().shape({
    location: Yup.object().shape({
      latitude: Yup.number(),
      longitude: Yup.number(),
    }),
    hours: Yup.array().of(
      Yup.object().shape({
        start: Yup.string(),
        end: Yup.string(),
        weekday: Yup.string(),
      })
    ),
    url: Yup.string().url('Should match URL format'),
    specialities: Yup.array().of(Yup.string()),
    tags: Yup.array().of(Yup.string()),
  }),
  foodCoOp: Yup.object().shape({
    structure: Yup.string(),
    farm: Yup.string(),
    cost: Yup.number(),
    size: Yup.string(),
  }),
  groceries: Yup.object().shape({
    farm: Yup.array().of(Yup.string()),
  }),
  farmStand: Yup.object().shape({
    farm: Yup.array().of(Yup.string()),
  }),
  farmerMarket: Yup.object().shape({
    marketType: Yup.string(),
    farm: Yup.string(),
    structure: Yup.string(),
  }),
});

const CategoryComponent = ({ category, ...props }) => {
  switch (category) {
    case 'farmShares':
      return <FarmShares {...props} />;
    case 'farm':
      return <Farm {...props} />;
    case 'foodCoOp':
      return <FoodCoOp {...props} />;
    case 'groceries':
      return <Groceries {...props} />;
    case 'farmStand':
      return <Groceries {...props} />;
    case 'farmerMarket':
      return <FarmerMarket {...props} />;
    default:
      return null;
  }
};

const AddPlaceDialog = ({
  open,
  onClose,
  category: initialCategory = 'groceries',
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState('overview');
  const initialValues = {
    name: '',
    bio: '',
    category: initialCategory,
    location: '',
    containing: '',
    facebookUrl: '',
    orderUrl: '',
    ownership: false,
    hours: {},

    farmShares: {
      farmShare: '',
    },
    farm: {
      location: '',
      hours: '',
      url: '',
      specialities: ['Eggs', 'Lamb', 'Wool', 'Compost'],
      tags: ['USDA Organic', 'Biodynamic', 'Regenerative'],
    },
    foodCoOp: { structure: '', farm: '', cost: '', size: '100-200' },
    groceries: { farm: [] },
    farmStand: { farm: [] },
    farmerMarket: {
      marketType: 'Open-air',
      farm: '',
      structure: 'For-profit',
    },
  };

  const categories = [
    { value: 'farmShares', label: 'Farm Shares' },
    { value: 'farm', label: 'Farm' },
    { value: 'foodCoOp', label: 'Food Co-op' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'farmStand', label: 'Farm-Stand' },
    { value: 'farmerMarket', label: "Farmer's Market" },
  ];

  const farms = [];

  const onSubmit = () => {};

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <Formik
        initialValues={initialValues}
        validationSchema={PlaceSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          const category = categories.find(
            item => item.value === values.category
          );
          return (
            <form onSubmit={handleSubmit}>
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
                      data={values}
                      errors={errors}
                      touched={touched}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      classes={classes}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* Category specific fields */}
                <Accordion
                  expanded={expanded === values.category}
                  onChange={() => setExpanded(values.category)}
                  className={classes.section}
                >
                  <AccordionSummary
                    className={classes.sectionHeader}
                    expandIcon={<ExpandMore />}
                  >
                    <div className={classes.sectionTitle}>
                      {(category && category.label) || ''}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className={classes.sectionContent}>
                    <CategoryComponent
                      category={values.category}
                      data={values[values.category]}
                      errors={errors[values.category] || {}}
                      touched={touched[values.category] || {}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      classes={classes}
                      farms={farms}
                    />
                  </AccordionDetails>
                </Accordion>
              </DialogContent>

              <DialogActions className={classes.actions}>
                <Button
                  onClick={onClose}
                  color="primary"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={errors || isSubmitting}
                >
                  {isSubmitting && (
                    <CircularProgress size={16} className={classes.progress} />
                  )}{' '}
                  Submit
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddPlaceDialog;
