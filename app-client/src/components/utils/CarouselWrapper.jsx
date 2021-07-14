import React, { useEffect, useRef, useState } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import { Fab } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',

    '& > .actions': {
      display: 'none',
    },

    '&:hover > .actions': {
      display: 'block',
    },
  },

  navButton: {
    position: 'absolute',
    top: 'calc(50% - 24px)',
    zIndex: 1,
    width: 36,
    height: 36,
    background: 'white',
  },

  left: {
    left: 16,
  },

  right: {
    right: 16,
  },
}));

const CarouselWrapper = ({ children, ...props }) => {
  const classes = useStyles();
  const [pos, setPos] = useState(0);
  const [pageSize, setPageSize] = useState(1);

  const rootRef = useRef();

  useEffect(() => {
    if (rootRef.current && props.itemWidth) {
      const rootWidth = rootRef.current.clientWidth;
      setPageSize(
        (rootWidth + (props.offset || 0)) /
          (props.itemWidth + (props.offset || 0))
      );
    }
  }, [props.itemWidth, props.offset, rootRef.current]);

  const count = props.slides
    ? props.slides?.length / pageSize
    : children?.length / pageSize;

  return (
    <div className={classes.root} ref={rootRef}>
      <div className="actions">
        {pos > 0 && (
          <Fab
            onClick={() => setPos(pos - Number(1 / pageSize))}
            className={classNames(classes.navButton, classes.left)}
          >
            <KeyboardArrowLeft />
          </Fab>
        )}
        {pos < count - 1 && (
          <Fab
            onClick={() => setPos(pos + Number(1 / pageSize))}
            className={classNames(classes.navButton, classes.right)}
          >
            <KeyboardArrowRight />
          </Fab>
        )}
      </div>

      <Carousel
        draggable
        value={pos}
        onChange={value => setPos(value)}
        {...props}
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CarouselWrapper;
