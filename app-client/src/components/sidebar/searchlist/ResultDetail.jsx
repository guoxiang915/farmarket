import React, { useEffect, useState } from 'react';
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
import Carousel from 'react-material-ui-carousel';
import { getDataDetail } from '../../../api/search';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
  },

  loader: {
    marginTop: '40%',
  },

  blockContainer: {
    width: 'fit-content',
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
  },

  buttonLabel: {
    marginTop: 8,
    color: theme.colors.primary.mediumGrey,
    fontSize: '12px',
    textAlign: 'center',
  },

  bio: {
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
    fontWeight: 700,
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
  },

  suggestButton: {
    width: '70%',
    textTransform: 'none',
  },
}));

const CarouselItem = ({ data, item, classes }) => {
  return (
    <Paper
      className={classes.carouselItem}
      style={{
        backgroundImage: `url(${data.img})`,
        backgroundSize: 'cover',
      }}
    >
      <div className={classes.carouselName}>{item}</div>
    </Paper>
  );
};

const ResultDetail = ({ id }) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const checks = [
    'pickUp',
    'appointments',
    'enrollmentOpen',
    'organic',
    'delivery',
  ];

  useEffect(() => {
    const getData = async () => {
      const result = await getDataDetail(id);
      setData(result);
    };
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <div className={classes.container}>
      {!data ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          <div className={classes.blockContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} alignItems="flex-start">
                <img src={data.img} className={classes.img} alt={data.title} />
              </Grid>
              <Grid item xs={12} alignItems="flex-start">
                <div className={classes.title}>{data.title}</div>
                <div className={classes.subtitle}>Co-op</div>
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
                <div className={classes.bio}>{data.description}</div>
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
          <div className={classes.blockContainer} style={{ width: '100%' }}>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.title}>Grocery Boxes</div>
                <div className={classes.carouselWrapper}>
                  <Carousel
                    autoPlay={false}
                    indicators={false}
                    animation="slide"
                  >
                    {data.groceries.map((item, index) => (
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
          <div className={classes.blockContainer} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className={classes.addressItem}>
                  <Room />
                  <div className={classes.addressLabel}>{data.address}</div>
                </div>
                <div className={classes.addressItem}>
                  <Room />
                  <div className={classes.addressLabel}>
                    Open now: {data.start} - {data.end}
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
                <div className={classes.addressItem}>
                  <Room />
                  <div className={classes.addressLabel}>{data.phone}</div>
                </div>
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

export default ResultDetail;
