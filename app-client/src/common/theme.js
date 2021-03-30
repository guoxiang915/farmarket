import { createMuiTheme } from '@material-ui/core/styles';

const colors = {
  // primary pallete
  primary: {
    mainBlue: '#3F51B5',
    secondaryBlue: '#2196F3',
    darkBlue: '#23263C',
    paleBlue: '#E9F4FD',
    actionGreen: '#27AE60',
    black: '#000000',
    darkGrey: '#595959',
    mediumGrey: '#919191',
    lightGrey: '#D8D8D8',
    backgroundGrey: '#F2F2F2',
    white: '#ffffff',
    successGreen: '#00C853',
    errorRed: '#D32F2F',
    inherit: 'inherit',
  },
  // secondary pallete
  secondary: {
    pink: '#E91E63',
    lightPurple: '#9C27B0',
    darkPurple: '#673AB7',
    lightBlue: '#03A9F4',
    cyan: '#00BCD4',
    teal: '#009688',
    darkGreen: '#4CAF50',
    lightGreen: '#8BC34A',
    lime: '#CDDC39',
    yellow: '#FFC107',
    lightOrange: '#FF9800',
    darkOrange: '#FF5722',
    brown: '#795548',
    darkAmber: '#ff8503',
    lighterBlue: '#81d4f9',
    lightestBlue: '#daf3ff',
    almostWhiteGray: '#fafafa',
  },
  sequence: ['#04a9f4', '#E91E63', '#673ab7', '#8bc34a', '#FF9800'],
  sequenceDarken: ['#1976d2', '#c2185b', '#512da8', '#689f38', '#FF5722'],
  stroke: '#262626',
  pink: '#E91E63',
  darkPink: '#c2185b',
  purple: '#673ab7',
  darkPurple: '#512da8',
  blue: '#04a9f4',
  darkBlue: '#1976d2',
  lime: '#8bc34a',
  darkLime: '#689f38',
  orange: '#FF9800',
  darkOrange: '#FF5722',
  white: 'white',
  darkWhite: '#c8c8c8',
  gray: '#474747',
  darkGray: '#2c2c2c',
  // old ones to delete
  background: '#2196F3',
  login: {
    link: '#2196F3',
  },
};

const theme = {
  colors: colors,
  palette: {
    primary: {
      main: colors.primary.mainBlue,
    },
    secondary: {
      main: colors.primary.secondaryBlue,
    },
  },
  layoutSizes: {
    drawerWidth: 267,
    contentMaxWidth: 1200,
  },
  tooltip: {
    target: {
      borderBottom: `1px dotted ${colors.primary.lightGrey}`,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      maxWidth: 300,
      marginBottom: 4,
    },
    text: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'white',
      maxWidth: 300,
      textAlign: 'justify',
    },
  },
  typography: {
    useNextVariants: true,

    mainFont: 'Roboto',
    headline: {
      fontWeight: 500,
      fontSize: '24px',
      color: colors.primary.black,
    },
    notificationHeadline: {
      fontWeight: 'normal',
      fontSize: '16px',
      color: colors.primary.black,
    },
    subtitle: {
      fontWeight: 'normal',
      fontSize: '16px',
      color: colors.primary.black,
    },
    sectionHeaders: {
      textTransform: 'uppercase',
      fontWeight: 'normal',
      fontSize: '12px',
      color: colors.primary.mediumGrey,
    },
    primaryBody: {
      fontWeight: 'normal',
      fontSize: '14px',
      color: colors.primary.darkGrey,
    },
    secondaryBody: {
      fontWeight: 'normal',
      fontSize: '16px',
      color: colors.primary.mediumGrey,
    },
    third: {
      fontWeight: 'normal',
      fontSize: '16px',
      color: colors.primary.secondaryBlue,
    },
    primarySmallBody: {
      fontWeight: 'normal',
      fontSize: '14px',
      color: colors.primary.darkGrey,
    },
    secondarySmallBody: {
      fontWeight: 'normal',
      fontSize: '14px',
      color: colors.primary.mediumGrey,
    },
    thirdSmall: {
      fontWeight: 'normal',
      fontSize: '14px',
      color: colors.primary.secondaryBlue,
    },
    caption: {
      fontWeight: 'normal',
      fontSize: '12px',
      color: colors.primary.mediumGrey,
    },
    errorMessage: {
      fontWeight: 'normal',
      fontSize: '12px',
      color: colors.primary.errorRed,
    },
  },
  buttons: {
    default: {
      fontSize: '14px',
      fontWeight: '500',
    },
    disabled: {
      opacity: '0.45',
    },
    primary: {
      color: colors.primary.mediumGrey,
      background: colors.primary.white,
    },
    secondary: {
      fontSize: '14px',
      fontWeight: '500',
      height: '38px',
    },
    secondaryActive: {
      color: colors.primary.darkGrey,
      borderColor: colors.primary.darkGrey,
    },
    secondaryHover: {
      color: colors.primary.black,
      borderColor: colors.primary.black,
    },
    addButton: {
      color: colors.primary.white,
      backgroundColor: colors.primary.actionGreen,
      boxShadow: 'none',
      filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.16))',
    },
    addButtonHover: {
      backgroundColor: colors.primary.actionGreen,
      opacity: '1 !important',
      filter: 'drop-shadow(0px 6px 7px rgba(0, 0, 0, 0.22))',
    },
    addButtonPressed: {
      backgroundColor: '#00D864',
      boxShadow: 'none',
    },
    addButtonDisabled: {
      color: 'white !important',
      backgroundColor: '#00E676 !important',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.17) !important',
      opacity: 0.45,
    },
    refreshButton: {
      color: colors.primary.white,
      backgroundColor: colors.primary.actionGreen,
      boxShadow: 'none',
      filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.16))',
    },
    refreshButtonHover: {
      backgroundColor: colors.primary.actionGreen,
      opacity: '1 !important',
      filter: 'drop-shadow(0px 6px 7px rgba(0, 0, 0, 0.22))',
    },
    refreshButtonPressed: {
      backgroundColor: '#00D864',
      boxShadow: 'none',
    },
    refreshButtonDisabled: {
      color: 'white !important',
      backgroundColor: '#00E676 !important',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.17) !important',
      opacity: 0.45,
    },
    fabButton: {
      color: colors.primary.white,
      backgroundColor: colors.primary.actionGreen,
      boxShadow: 'none',
      filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.16))',
    },
    fabButtonHover: {
      backgroundColor: colors.primary.actionGreen,
      opacity: '1 !important',
      filter: 'drop-shadow(0px 6px 7px rgba(0, 0, 0, 0.22))',
    },
    fabButtonPressed: {
      backgroundColor: '#00D864',
      boxShadow: 'none',
    },
    fabButtonDisabled: {
      color: 'white !important',
      backgroundColor: '#00E676 !important',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.17) !important',
      opacity: 0.45,
    },
    primaryButtonDisabled: {
      color: 'white !important',
      backgroundColor: '#00E676 !important',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.17) !important',
      opacity: 0.45,
    },
    secondaryButtonDisabled: {
      color: '#595959 !important',
      borderColor: '#595959 !important',
      opacity: 0.45,
    },
    action: {
      color: colors.primary.white,
      height: '38px',
      background: colors.primary.actionGreen,
      borderWidth: '0',
      outline: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
    },
    actionHover: {
      background: colors.primary.actionGreen,
      opacity: '0.85',
    },
    actionDisabled: {
      height: '38px',
      opacity: '0.45',
      backgroundColor: '#00E676',
      borderWidth: '0',
      outline: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
    },
    actionPressed: {
      background: colors.primary.successGreen,
    },
    primaryTextLink: {
      textTransform: 'uppercase',
      color: colors.primary.secondaryBlue,
      fontSize: '14px',
      height: '38px',
    },
    secondaryTextLink: {
      textTransform: 'uppercase',
      color: colors.primary.darkGrey,
      fontSize: '14px',
      height: '38px',
    },
    thirdTextLink: {
      color: colors.primary.secondaryBlue,
      fontSize: '14px',
      textDecoration: 'none',
      textTransform: 'none',
      height: '38px',
    },
  },
  overrides: {
    MuiChip: {
      root: {
        color: colors.primary.mediumGrey,
        height: '32px',
        backgrounColor: colors.primary.backgroundGrey,
      },
      deleteIcon: {
        color: colors.primary.darkGrey,
      },
    },
    MuiMenu: {
      paper: {
        marginTop: '-12px',
      },
    },
    MuiStepper: {
      root: {
        border: 'none',
        paddingRight: '3',
      },
    },
    MuiStepContent: {
      root: {
        paddingBottom: '3px',
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: 'normal',
        fontSize: '16px',
        color: colors.primary.darkGrey,
      },
      secondary: {
        fontWeight: 'normal',
        fontSize: '14px',
        color: colors.primary.mediumGrey,
      },
    },
    MuiFormControlLabel: {
      label: {
        fontWeight: 'normal',
        fontSize: '16px',
        color: colors.primary.darkGrey,
      },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: colors.primary.secondaryBlue,
      },
    },
    MuiExpansionPanelSummary: {
      content: {
        '&$content': {
          margin: 0,
          marginTop: 1,
        },
      },
    },
  },
};

export default createMuiTheme(theme);
