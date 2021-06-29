import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  CircularProgress,
  IconButton,
  makeStyles,
  Grid,
  Button,
  Paper,
} from '@material-ui/core';
import {
  Check,
  Close,
  Directions,
  Favorite,
  Room,
  Send,
  Share,
} from '@material-ui/icons';
import Carousel from '@brainhubeu/react-carousel';
import { useLazyQuery } from '@apollo/client';
import {
  getAddressFromCoordinates,
  getOpenedState,
} from '../../../utils/functions';
import { PLACE_DETAIL_QUERY } from '../../../graphql/query';
import { selectPlace } from '../../../store/actions/appActions';
import PlaceDetailDialog from '../../place/PlaceDetailDialog';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },

  loader: {
    marginTop: '40%',
  },

  blockContainer: {
    width: '100%',
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.colors.primary.lightGrey}`,
    background: theme.colors.primary.white,
  },

  img: {
    width: '100%',
    height: '175px',
    borderRadius: 10,
  },

  title: {
    color: 'black',
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: 4,
    textAlign: 'start',
  },

  subtitle: {
    color: theme.colors.primary.mediumGrey,
    fontSize: '12px',
    textAlign: 'start',
    textTransform: 'capitalize',
  },

  buttonLabel: {
    marginTop: 8,
    color: theme.colors.primary.mediumGrey,
    fontSize: '12px',
    textAlign: 'center',
  },

  bio: {
    width: '100%',
    textAlign: 'start',
  },

  actionButton: {
    width: '100%',
    borderRadius: 999,
    color: '#27AE60',
    borderColor: '#27AE60',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  checkItem: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.primary.mediumGrey,
    fontSize: '14px',
  },

  carouselWrapper: {
    width: '100%',
    marginTop: 16,
    marginLeft: -8,
  },

  carouselItem: {
    width: 130,
    height: 150,
    borderRadius: 10,
    position: 'relative',
  },

  carouselName: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    fontSize: '16px',
    fontWeight: 100,
    color: 'white',
    mixBlendMode: 'difference',
  },

  addressItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '32px',
  },

  addressLabel: {
    marginLeft: 16,
    textAlign: 'left',
  },

  suggestButton: {
    width: '70%',
    textTransform: 'none',
  },
}));

const CarouselItem = ({ data, item, classes }) => {
  const [opened, setOpened] = useState(false);
  const groceryData = {
    name: item,
    imgs: [
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
    ],
    properties: [
      { type: 'egg', value: 24 },
      { type: 'vegetables', value: 15 },
      { type: 'fruits', value: 13 },
    ],
    checks: [
      { checked: true, value: 'Vegetarian' },
      { checked: false, value: 'Delivery' },
      { checked: true, value: 'Enrolling untill June 1st' },
      { checked: true, value: 'Weekly pickup' },
      { checked: true, value: 'Organic' },
    ],
  };

  return (
    <Paper
      className={classes.carouselItem}
      style={{
        backgroundImage: `url(${data.img})`,
        backgroundSize: 'cover',
      }}
    >
      {/* eslint-disable-next-line */}
      <div className={classes.carouselName} onClick={() => setOpened(true)}>
        {item}
      </div>
      {opened && (
        <PlaceDetailDialog
          open
          onClose={() => setOpened(false)}
          onOrder={() => {}}
          groceryBox={groceryData}
          place={data}
        />
      )}
    </Paper>
  );
};

const PlaceDetail = ({ id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const checks = [
    'pickUp',
    'appointments',
    'enrollmentOpen',
    'organic',
    'delivery',
  ];
  const [address, setAddress] = useState(null);

  const [placeDetail, { loading, data: place }] = useLazyQuery(
    PLACE_DETAIL_QUERY
  );

  useEffect(() => {
    const getData = async () => {
      placeDetail({
        variables: {
          id,
        },
      });
    };
    if (id) {
      dispatch(selectPlace(id));
      getData();
    }
  }, [id]);

  const data = place?.placeDetail && { ...place.placeDetail };
  if (data) {
    data.img =
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80';
  }

  const groceryFarms = ['Veggie', 'Meat Lover', 'Other Box'];

  useEffect(() => {
    if (place?.placeDetail?.location) {
      getAddressFromCoordinates(place?.placeDetail?.location).then(response => {
        response.json().then(location => setAddress(location));
      });
    }
  }, [place?.placeDetail?.location]);

  return (
    <div className={classes.container}>
      {loading || !data ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} alignItems="flex-start">
                <img src={data.img} className={classes.img} alt={data.name} />
              </Grid>
              <Grid item xs={12} alignItems="flex-start">
                <div className={classes.title}>{data.name}</div>
                <div className={classes.subtitle}>{data.category}</div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={3} alignItems="center">
                <IconButton>
                  <Directions color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Directions</div>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Favorite color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Favorite</div>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Send color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Send to your phone</div>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Share color="primary" />
                </IconButton>
                <div className={classes.buttonLabel}>Share</div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.actionButton}
                >
                  Order Online
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} alignItems="flex-start">
                <div className={classes.bio}>{data.bio}</div>
              </Grid>
              <Grid item xs={12} alignItems="flex-start">
                <Grid container wrap spacing={2}>
                  {checks.map(check => (
                    <>
                      {data[check] === undefined ? null : (
                        <Grid item key={check}>
                          <div className={classes.checkItem}>
                            {data[check] ? (
                              <Check color="primary" />
                            ) : (
                              <Close color="error" />
                            )}{' '}
                            <span style={{ marginLeft: 8 }}>{check}</span>
                          </div>
                        </Grid>
                      )}
                    </>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className={classes.blockContainer}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.title}>Grocery Boxes</div>
                <div className={classes.carouselWrapper}>
                  <Carousel
                    itemWidth={130}
                    offset={16}
                    keepDirectionWhenDragging
                  >
                    {groceryFarms.map((item, index) => (
                      <CarouselItem
                        key={index}
                        item={item}
                        data={data}
                        classes={classes}
                      />
                    ))}
                  </Carousel>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {address?.features?.length && (
                  <div className={classes.addressItem}>
                    <Room />
                    <div className={classes.addressLabel}>
                      {address.features[0].place_name}
                    </div>
                  </div>
                )}
                <div className={classes.addressItem}>
                  <Room />
                  <div className={classes.addressLabel}>
                    {getOpenedState(data?.hours)}
                  </div>
                </div>
                <div className={classes.addressItem}>
                  <Room />
                  <div className={classes.addressLabel}>Place an order</div>
                </div>
                <div className={classes.addressItem}>
                  <Room />
                  <div className={classes.addressLabel}>Menu</div>
                </div>
                {data.user && data.user.phone && (
                  <div className={classes.addressItem}>
                    <Room />
                    <div className={classes.addressLabel}>{data.phone}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classNames(
                    classes.actionButton,
                    classes.suggestButton
                  )}
                >
                  Suggest an edit
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceDetail;
