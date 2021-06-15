import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  CloseOutlined,
  Edit,
  KeyboardArrowRightOutlined,
  KeyboardBackspaceOutlined,
  Save,
} from '@material-ui/icons';

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

  markButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.colors.primary.mediumGrey,
    marginBottom: 20,
    textTransform: 'none',
    width: '100%',
    padding: '12px 20px',

    '&.selected': {
      color: theme.colors.primary.white,
    },
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

    '&.disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
  },

  weekdayTitle: {
    width: 80,
    textTransform: 'capitalize',
  },

  weekdayContent: {
    flex: 1,
    textAlign: 'right',
    textTransform: 'uppercase',
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
}));

const AddHourDialog = ({ open, onSubmit, onClose, business, hours }) => {
  const classes = useStyles();
  const [markFull, setMarkFull] = useState(false);
  const [markClosed, setMarkClosed] = useState(false);
  const [weekdays, setWeekdays] = useState({
    sunday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
    monday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
    tuesday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
    wednesday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
    thursday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
    friday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
    saturday: {
      isClosed: true,
      start: null,
      end: null,
      isEdit: false,
    },
  });

  useEffect(() => {
    hours.forEach(item => {
      const label = item.weekday;
      weekdays[label].start = item.start;
      weekdays[label].end = item.end;
      weekdays[label].isClosed = false;
    });
    setWeekdays({ ...weekdays });
  }, [hours]);

  const handleUpdateWeekday = (name, weekday) => {
    weekdays[name] = { ...weekdays[name], ...weekday };
    setWeekdays({ ...weekdays });
  };

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
              Hours
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
        <Button
          className={classnames(classes.markButton, markFull && 'selected')}
          onClick={() => setMarkFull(!markFull)}
          variant={markFull ? 'contained' : 'outlined'}
          color={markFull ? 'primary' : undefined}
          disabled={markClosed}
        >
          <div>Mark as fully opened</div>
          <KeyboardArrowRightOutlined />
        </Button>
        <Button
          className={classnames(classes.markButton, markClosed && 'selected')}
          onClick={() => setMarkClosed(!markClosed)}
          variant={markClosed ? 'contained' : 'outlined'}
          color={markClosed ? 'secondary' : undefined}
          disabled={markFull}
        >
          <div>Mark as temporarily or permantently closed</div>
          <KeyboardArrowRightOutlined />
        </Button>
        {Object.entries(weekdays).map(([name, weekday]) => (
          <div
            className={classnames(
              classes.weekday,
              (markFull || markClosed) && 'disabled'
            )}
            key={name}
          >
            <div className={classes.weekdayTitle}>{name}</div>
            <div className={classes.weekdayContent}>
              {weekday.isEdit && (
                <>
                  <TextField
                    label="From"
                    type="time"
                    value={weekday.start}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={e =>
                      handleUpdateWeekday(name, { start: e.target.value })
                    }
                    fullWidth
                  />
                  <div className={classes.divider} />
                  <TextField
                    label="To"
                    type="time"
                    value={weekday.end}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={e =>
                      handleUpdateWeekday(name, { end: e.target.value })
                    }
                    fullWidth
                  />
                </>
              )}
              {!weekday.isEdit && weekday.isClosed && 'CLOSED'}
              {!weekday.isEdit &&
                !weekday.isClosed &&
                `${weekday.start ? weekday.start : ''} - ${
                  weekday.end ? weekday.end : ''
                }`}
            </div>
            <IconButton
              className={classes.weekdayAction}
              onClick={() =>
                handleUpdateWeekday(name, {
                  isEdit: !weekday.isEdit,
                  isClosed: !weekday.start || !weekday.end,
                })
              }
              size="small"
            >
              {weekday.isEdit ? <Save color="primary" /> : <Edit />}
            </IconButton>
          </div>
        ))}
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (onSubmit) {
              if (markFull) {
                onSubmit('full');
              } else if (markClosed) {
                onSubmit('close');
              } else {
                onSubmit(
                  Object.entries(weekdays)
                    .filter(
                      ([, weekday]) =>
                        weekday.start &&
                        weekday.end &&
                        !weekday.isClosed &&
                        !weekday.isEdit
                    )
                    .map(([label, weekday]) => ({
                      start: weekday.start,
                      end: weekday.end,
                      weekday: label,
                    }))
                );
              }
            }
          }}
          color="primary"
          variant="contained"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHourDialog;
