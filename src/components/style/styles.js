import primitives from './primitives';
import menus from './menus';
import character from './character';
import layout from './layout';

export default (theme) => ({
  ...primitives(theme),
  ...menus(theme),
  ...character(theme),
  ...layout(theme),
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  avatar: {
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.main,
  },

  invertColors: {
    backgroundColor: theme.palette.common.blueGray,
    color: theme.palette.common.white,

    '& label': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
    },

    '& legend': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
    },

    '& input': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
    },

    '& textarea': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
    },
  },
  textSelect: {
    backgroundColor: theme.palette.common.blueGray,
    color: theme.palette.common.white,
    minWidth: '11rem',
    marginTop: theme.spacing(1),

    '& label': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
    },

    '& div': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
      fontSize: '1.2rem',
      borderColor: 'black',
      boxShadow: theme.shadow.boxShadow,
    },
  },
  numberSelect: {
    backgroundColor: theme.palette.common.transparentGray,
    color: theme.palette.common.white,
    minWidth: '11rem',
    width: '11rem',
    marginTop: theme.spacing(1),

    '& label': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
    },

    '& input': {
      color: theme.palette.common.white,
      textShadow: theme.shadow.textShadow,
      fontSize: '1.2rem',
      borderColor: 'black',
      boxShadow: theme.shadow.boxShadow,
    },

    '& div': {
      mindWidth: '11rem',
    },
  },

  horizontalTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    flexGrow: 1,
    order: 0,
  },

  tinyMargin: {
    marginBottom: '0.2rem',
  },

  noPadding: {
    padding: 0,
  },

  link: {
    color: theme.palette.secondary.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },

  noteTab: {

  },

  popoutIcon: {
    padding: 0,
    maxWidth: '3rem',

    '& svg': {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
  noteTabActive: {
    backgroundColor: theme.palette.common.white,
  },
  rightFloat: {
    float: 'right',
  },
  confirm: {
    backgroundColor: theme.palette.common.white,
    width: '25%',
    marginTop: '20rem',
    textAlign: 'center',
    fontSize: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between'
  }
});
