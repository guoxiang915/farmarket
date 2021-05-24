import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
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
import { useMutation } from '@apollo/client';
import OverviewInfo from './OverviewInfo';
import Groceries from './Groceries';
import FarmShares from './FarmShares';
import Farm from './Farm';
import FoodCoOp from './FoodCoOp';
import FarmerMarket from './FarmerMarket';
import { showSnackbar } from '../../store/actions/appActions';
import { ADD_PLACE_MUTATION } from '../../graphql/mutation';
import { SEARCH_PLACES_QUERY } from '../../graphql/query';

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
    marginRight: 16,
  },
}));

const PlaceSchema = Yup.object().shape({
  overview: Yup.object().shape({
    name: Yup.string().required('Required'),
    bio: Yup.string(),
    category: Yup.string().required('Required'),
    location: Yup.object()
      .required('Required')
      .shape({
        latitude: Yup.number(),
        longitude: Yup.number(),
      })
      .nullable(),
    containing: Yup.boolean(),
    otherLocation: Yup.object()
      .shape({
        latitude: Yup.number(),
        longitude: Yup.number(),
      })
      .nullable(),
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
  }),
  farmShares: Yup.object().shape({
    farmShare: Yup.array().of(
      Yup.object().shape({
        type: Yup.string(),
        contents: Yup.array().of(
          Yup.object().shape({
            item: Yup.string(),
            start: Yup.number(),
            end: Yup.number(),
          })
        ),
        payPeriod: Yup.string(),
        payment: Yup.number(),
        payMethod: Yup.string(),
      })
    ),
  }),
  farm: Yup.object().shape({
    location: Yup.object()
      .shape({
        latitude: Yup.number(),
        longitude: Yup.number(),
      })
      .nullable(),
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
    farm: Yup.array().of(Yup.string()),
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
    farm: Yup.array().of(Yup.string()),
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
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [expanded, setExpanded] = useState('overview');
  const initialValues = {
    overview: {
      name: '',
      bio: '',
      category: initialCategory,
      location: null,
      containing: false,
      facebookUrl: '',
      orderUrl: '',
      ownership: false,
      hours: [],
    },
    farmShares: {
      farmShare: [],
    },
    farm: {
      location: null,
      hours: [],
      url: '',
      specialities: ['Eggs', 'Lamb', 'Wool', 'Compost'],
      tags: ['USDA Organic', 'Biodynamic', 'Regenerative'],
    },
    foodCoOp: { structure: '', farm: [], cost: 0, size: '100-200' },
    groceries: { farm: [] },
    farmStand: { farm: [] },
    farmerMarket: {
      marketType: 'Open-air',
      farm: [],
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

  const farms = [
    {
      id: '1',
      title: 'AAA',
    },
    {
      id: '2',
      title: 'iiocsxdddw',
    },
    {
      id: '3',
      title: '23llkkkx',
    },
    {
      id: '4',
      title: 'copx',
    },
    {
      id: '5',
      title: 'ssdfwe',
    },
    {
      id: '6',
      title: 'Audddsd',
    },
  ];

  const [submitAddPlace, { loading, error, data: resultPlace }] = useMutation(
    ADD_PLACE_MUTATION,
    {
      errorPolicy: 'all',
      refetchQueries: [
        {
          query: SEARCH_PLACES_QUERY,
        },
      ],
    }
  );

  const onSubmit = async values => {
    console.log(values);
    if (values.overview.location) {
      values.overview.location = {
        latitude: values.overview.location.latitude,
        longitude: values.overview.location.longitude,
      };
    }
    if (values.overview.otherLocation) {
      values.overview.otherLocation = {
        latitude: values.overview.otherLocation.latitude,
        longitude: values.overview.otherLocation.longitude,
      };
    }
    if (values.farm.location) {
      values.farm.location = {
        latitude: values.farm.location.latitude,
        longitude: values.farm.location.longitude,
      };
    }
    await submitAddPlace({
      variables: {
        place: values,
      },
    });
  };

  useEffect(() => {
    if (error?.message) {
      dispatch(
        showSnackbar({
          open: true,
          severity: 'error',
          message: error.message,
        })
      );
    }
  }, [error?.message]);

  useEffect(() => {
    if (!loading && resultPlace?.addPlace?.id) {
      onClose();
      dispatch(
        showSnackbar({
          open: true,
          severity: 'success',
          message: `${resultPlace.addPlace.name} has been successfully created`,
        })
      );
      push(`/place/${resultPlace?.addPlace?.id}`);
    }
  }, [loading, resultPlace?.addPlace]);

  console.log(loading, resultPlace);

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
        }) => {
          const selectedCategory = values.overview.category;
          const category = categories.find(
            item => item.value === selectedCategory
          );
          console.log(values);
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
                      data={values.overview}
                      errors={errors.overview || {}}
                      touched={touched.overview || {}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      classes={classes}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* Category specific fields */}
                <Accordion
                  expanded={expanded === selectedCategory}
                  onChange={() => setExpanded(selectedCategory)}
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
                      category={selectedCategory}
                      data={values[selectedCategory]}
                      errors={errors[selectedCategory] || {}}
                      touched={touched[selectedCategory] || {}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      classes={classes}
                      farms={farms}
                    />
                  </AccordionDetails>
                </Accordion>
              </DialogContent>

              <DialogActions className={classes.actions}>
                <Button onClick={onClose} color="primary" disabled={loading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={(errors && !!Object.keys(errors).length) || loading}
                >
                  {loading && (
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
