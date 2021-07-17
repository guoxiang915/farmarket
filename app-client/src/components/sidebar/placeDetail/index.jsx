import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  CircularProgress,
  IconButton,
  makeStyles,
  Grid,
  Button,
  Paper,
  Box,
} from '@material-ui/core';
import {
  Directions,
  Favorite,
  KeyboardArrowRight,
  Room,
  Send,
  Share,
} from '@material-ui/icons';
import { useLazyQuery } from '@apollo/client';
import {
  getAddressFromCoordinates,
  getOpenedState,
} from '../../../utils/functions';
import { PLACE_DETAIL_QUERY } from '../../../graphql/queries';
import PlaceDetailDialog from '../../place/PlaceDetailDialog';
import {
  defaultGroceryBoxes,
  defaultPlacePhotos,
} from '../../../utils/constants';
import CarouselWrapper from '../../utils/CarouselWrapper';
import CheckItem from '../../utils/CheckItem';
import ServiceDetails from './ServiceDetails';
import useLogin from './../../../utils/hooks/useLogin';
import {
  openModal,
  selectPlace,
  showSnackbar,
} from '../../../store/actions/appActions';

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
    overflow: 'hidden',
  },

  carouselName: {
    background:
      'linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0.15) 40%,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.6) 80%,rgba(0,0,0,0.7) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '0 16px 20px',
    overflow: 'hidden',
    fontSize: '16px',
    fontWeight: 100,
    color: 'white',
    display: 'flex',
    alignItems: 'flex-end',
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

const CarouselItem = ({ name, img, classes, onOpen }) => {
  return (
    <Paper
      className={classes.carouselItem}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
      }}
      onClick={onOpen}
    >
      <div className={classes.carouselName}>{name}</div>
    </Paper>
  );
};

const PlaceDetail = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [address, setAddress] = useState(null);

  const { checkLogin } = useLogin();
  const { user } = useSelector(state => state.authState);

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
  if (data && !data.photos?.length) {
    data.photos = defaultPlacePhotos;
  }
  if (data && data.services) {
    data.services = JSON.parse(data.services);
  }

  useEffect(() => {
    if (place?.placeDetail?.location) {
      getAddressFromCoordinates(place?.placeDetail?.location).then(response => {
        response.json().then(location => setAddress(location));
      });
    }
  }, [place?.placeDetail?.location]);

  const groceryFarms = defaultGroceryBoxes;
  const [opened, setOpened] = useState(-1);

  const [openServices, setOpenServices] = useState(false);

  const handleEdit = () => {
    if (checkLogin()) {
      if (data) {
        console.log(data, user);
        if (data.owner_id && data.owner_id !== user.id) {
          dispatch(
            showSnackbar({
              open: true,
              severity: 'error',
              message:
                'This place is already owned by other user. You cannot edit this place!',
            })
          );
        } else {
          dispatch(
            openModal('add-place-modal', {
              category: 'groceries',
              place: {
                ...data,
                ownership: data.owner_id && data.owner_id === user.id,
              },
            })
          );
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      {openServices && (
        <ServiceDetails
          place={data}
          onClose={() => history.push('/')}
          onBack={() => setOpenServices(false)}
        />
      )}
      {loading || !data ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} alignItems="flex-start">
                <CarouselWrapper>
                  {data.photos.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      className={classes.img}
                      alt={data.name}
                    />
                  ))}
                </CarouselWrapper>
              </Grid>
              <Grid item xs={12} alignItems="flex-start">
                <div className={classes.title}>{data.name}</div>
                <div className={classes.subtitle}>{data.category}</div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
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
            <Box
              display="flex"
              alignItems="center"
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenServices(true)}
            >
              <Grid container spacing={2} style={{ flex: 1, marginRight: 8 }}>
                <Grid item xs={12} alignItems="flex-start">
                  <div className={classes.bio}>{data.bio}</div>
                </Grid>
                {data.services && Object.keys(data.services)?.length ? (
                  <Grid item xs={12} alignItems="flex-start">
                    <Grid container wrap spacing={2}>
                      {Object.keys(data.services)
                        .slice(0, 3)
                        .map(check => (
                          <Grid item key={check}>
                            <CheckItem values={data.services} check={check} />
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
              <KeyboardArrowRight />
            </Box>
          </div>
          <div className={classes.blockContainer}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.title}>Grocery Boxes</div>
                <div className={classes.carouselWrapper}>
                  <CarouselWrapper itemWidth={130} offset={16}>
                    {groceryFarms.map((item, index) => (
                      <CarouselItem
                        key={index}
                        name={item.name}
                        img={
                          (item.imgs?.length
                            ? item.imgs
                            : defaultPlacePhotos)[0]
                        }
                        classes={classes}
                        onOpen={() => setOpened(index)}
                      />
                    ))}
                  </CarouselWrapper>
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
                  onClick={handleEdit}
                >
                  Suggest an edit
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      )}

      {opened !== -1 && (
        <PlaceDetailDialog
          open
          onClose={() => setOpened(-1)}
          onOrder={() => {}}
          groceryBox={groceryFarms[opened]}
          place={data}
        />
      )}
    </div>
  );
};

export default PlaceDetail;
