import React from 'react';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import { KeyboardBackspaceOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  container: {
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
  icon: {
    alignSelf: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const LoginHeader = ({ title, subtitle, welcomeMessage, onBack, ...props }) => {
  const classes = useStyles();

  let headerIcon = null;

  const renderHeaderIcon = icon => {
    if (icon) {
      headerIcon = {
        ...props.headerIcon,
        props: {
          ...props.headerIcon.props,
          className: classes.icon,
          onClick: props.onHeaderIconClick,
        },
      };
    }
    return headerIcon;
  };

  return (
    <div className={classes.container}>
      {onBack && (
        <IconButton onClick={onBack} className={classes.backButton}>
          <KeyboardBackspaceOutlined />
        </IconButton>
      )}
      <div className={classes.titleWrapper}>
        {props && welcomeMessage ? (
          <Typography
            type="headline"
            component="span"
            classes={{ root: classes.title }}
          >
            {welcomeMessage}
          </Typography>
        ) : null}
        <Typography
          type="headline"
          component="h1"
          classes={{ root: classes.title }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            type="subtitle"
            component="span"
            classes={{ root: classes.subtitle }}
          >
            {subtitle}
          </Typography>
        )}
      </div>
      {renderHeaderIcon(props.headerIcon)}
    </div>
  );
};

export default LoginHeader;
