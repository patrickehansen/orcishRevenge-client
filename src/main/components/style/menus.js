export default (theme) => ({
  gameRoot: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },

  characterSelect: {
    padding: '0',
    width: '85%',
    height: '85%',
    margin: 'auto',
    marginTop: '5%',

    backgroundColor: '$lightGray',
    borderRadius: '4px',
  },
  characterContainer: {
    width: '97.5%',
    position: 'relative',
    right: '1rem',
    order: 0,

    margin: theme.spacing(8),
    marginBottom: 0,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadow.boxShadow,
    padding: theme.spacing(8),
    backgroundColor: theme.palette.background.transparentGray,
  },
  styleUpdater: {
    width: '80%',
    height: '80%',
    margin: 'auto',
    backgroundColor: theme.palette.background.menu,
  },
  rightPane: {

  },
  menuColumn: {
    float: 'right',
    maxWidth: '2.5rem',
    position: 'sticky',
    right: '11.5rem',
    transition: 'all ease-in-out 500ms',
    '&:hover': {
      transition:'all ease 300ms',
      maxWidth: '4rem',
    }
  },

  middleMenuColumn: {
    float: 'right',
    width: '2.5rem',
    marginTop: '15rem',
    marginRight: '0rem',
    right: '11.5rem',
    position: 'sticky',
  },

  statButtonContainer: {
    width: '5rem',
    position: 'relative',
    left: '2rem',

    transition: 'all ease-in-out 500ms',
    '&:hover': {
      transition:'all ease 300ms',
      left: '0.5rem'
    }
  },

  statButton: {
    margin: '2px',
    borderRadius: '100%',
    minWidth: '2rem',
    maxWidth: '2rem',
    left: '1.5rem',
    padding: '6px 0px',
    backgroundColor: theme.palette.background.solidGray,

  },

  menuColumnContainer: {

  },
  cardActive: {
    backgroundColor: theme.palette.secondary.main,
  },
  cardInactive: {
    backgroundColor: theme.palette.background.card,
  },
});
