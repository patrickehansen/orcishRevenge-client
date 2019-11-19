export default (theme) => ({
  // Text fields
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    backgroundColor: theme.palette.common.white,
    fontSize: theme.sizing.medium,
  },

  // filledTextField: {},
  // outlinedTextField : {},
  // multiTextField: {},

  // // Selects

  // select: {},
  // outlinedSelect: {},
  // filledSelect: {},

  // option: {},

  button : {
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: theme.shadow.boxShadow,
    margin: theme.spacing(1),
  },

  smallButton : {
    minWidth: theme.spacing(4),
    width: theme.spacing(4),
    boxShadow: theme.shadow.textShadow,
    marginBottom: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },


  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  textSelect: {
    backgroundColor: theme.palette.common.blueGray,
    color: theme.palette.common.white,
    minWidth: '11rem',
    marginTop: theme.spacing(1),

    '& label': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
    },

    '& div': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 2px black',
      fontSize: '1.2rem',
      borderColor: 'black',
      boxShadow: '2px 2px 2px black'
    }
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  error: {
    color: theme.palette.error.main,
  },

  centered: {
    margin: 'auto',
  }
});